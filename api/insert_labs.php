<?php
error_reporting(E_ALL);
error_log(print_r($_POST, true));
error_log(print_r($_FILES, true));
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json; charset=utf-8;');

require_once 'DbConnect.php';

try {
    $dbConnect = new DbConnect();
    $conn = $dbConnect->connect();

    $requestMethod = $_SERVER['REQUEST_METHOD'];
    switch ($requestMethod) {
        case 'POST':
            $labName = $_POST['lab_name'];
            $contentFile = $_FILES['content_file'];
            $status = $_POST['status'];

            // Check for file attachment
            if (isset($contentFile) && $contentFile['error'] === UPLOAD_ERR_OK) {
                $uploadDir = 'lab_storage/';
                $filename = uniqid() . '-' . basename($contentFile['name']);
                $uploadFile = $uploadDir . $filename;

                if (move_uploaded_file($contentFile['tmp_name'], $uploadFile)) {
                    $uploadTime = date('Y-m-d H:i:s');

                    $stmt = $conn->prepare("INSERT INTO lab (lab_name, content_file, status, upload_time) VALUES (:lab_name, :content_file, :status, :upload_time)");
                    $stmt->bindParam(':lab_name', $labName);
                    $stmt->bindParam(':content_file', $filename);
                    $stmt->bindParam(':status', $status);
                    $stmt->bindParam(':upload_time', $uploadTime);
                    $stmt->execute();

                    echo json_encode(array("message" => "Lab inserted successfully"));
                } else {
                    echo json_encode(array("error" => "Failed to upload file. Error: " . $contentFile['error']));
                }
            } else {
                echo json_encode(array("error" => "No file uploaded or upload error. Error Code: " . $contentFile['error']));
            }
            break;

        case 'GET':
            if (isset($_GET['lab_id'])) {
                $lab_id = $_GET['lab_id'];
                $stmt = $conn->prepare("SELECT * FROM lab WHERE lab_id = :lab_id");
                $stmt->bindParam(':lab_id', $lab_id);
                $stmt->execute();
                $lab = $stmt->fetch(PDO::FETCH_ASSOC);
                echo json_encode($lab);
            } else {
                $stmt = $conn->prepare("SELECT * FROM lab");
                $stmt->execute();
                $labs = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($labs);
            }
            break;

        case 'PUT':
            // ดึงข้อมูล JSON จากคำขอ
            $lab = json_decode(file_get_contents('php://input'), true);
            $path = explode('/', $_SERVER['REQUEST_URI']);

            // ตรวจสอบให้แน่ใจว่าเก็บค่าถูกต้อง
            $lab_id = $path[4] ?? null; // ใช้ lab_id จาก URL
            $lab_name = $lab['lab_name'] ?? null;
            $status = $lab['status'] ?? null;
            $content_file = $_FILES['content_file'] ?? null; // ตรวจสอบการอัปโหลดไฟล์

            // Debugging
            error_log("Lab ID: " . $lab_id);
            error_log("Lab Name: " . $lab_name);
            error_log("Status: " . $status);
            error_log("Content File: " . json_encode($content_file));

            // ตรวจสอบค่าที่จำเป็น
            if ($lab_id === null) {
                echo json_encode(array("error" => "Missing required ID"));
                exit;
            } elseif ($lab_name === null) {
                echo json_encode(array("error" => "Missing required name"));
                exit;
            } elseif ($status === null) {
                echo json_encode(array("error" => "Missing required status"));
                exit;
            } elseif ($content_file === null) {
                echo json_encode(array("error" => "Missing content file"));
                exit;
            } elseif ($lab_id === null && $lab_name === null && $status === null && $content_file === null) {
                echo json_encode(array("error" => "Missing required ALL"));
                exit;
            }

            if ($lab_id) {
                $stmt = $conn->prepare("SELECT content_file FROM lab WHERE lab_id = :lab_id");
                $stmt->bindParam(':lab_id', $$path[4]);
                $stmt->execute();
                $labData = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($labData) {
                    $oldFile = 'lab_storage/' . $labData['content_file'];

                    // Delete old file if exists
                    if (file_exists($oldFile)) {
                        unlink($oldFile);
                    }

                    // Upload new file
                    if (isset($content_file) && $content_file['error'] === UPLOAD_ERR_OK) {
                        $uploadDir = 'lab_storage/';
                        $newFilename = uniqid() . '-' . basename($content_file['name']);
                        $uploadFile = $uploadDir . $newFilename;

                        if (move_uploaded_file($content_file['tmp_name'], $uploadFile)) {
                            $stmt = $conn->prepare("UPDATE lab SET lab_name = :lab_name, content_file = :content_file, status = :status, upload_time = NOW() WHERE lab_id = :lab_id");
                            $stmt->bindParam(':lab_name', $lab_name);
                            $stmt->bindParam(':content_file', $newFilename);
                            $stmt->bindParam(':status', $status);
                            $stmt->bindParam(':lab_id', $$path[4]);

                            if ($stmt->execute()) {
                                echo json_encode(array("message" => "Lab updated successfully with new file"));
                            } else {
                                echo json_encode(array("error" => "Failed to update lab with new file"));
                            }
                        } else {
                            echo json_encode(array("error" => "Failed to upload new file"));
                        }
                    } else {
                        // Update without new file
                        $stmt = $conn->prepare("UPDATE lab SET lab_name = :lab_name, status = :status, upload_time = NOW() WHERE lab_id = :lab_id");
                        $stmt->bindParam(':lab_name', $lab_name);
                        $stmt->bindParam(':status', $status);
                        $stmt->bindParam(':lab_id', $$path[4]);

                        if ($stmt->execute()) {
                            echo json_encode(array("message" => "Lab updated successfully without new file"));
                        } else {
                            echo json_encode(array("error" => "Failed to update lab without new file"));
                        }
                    }
                } else {
                    echo json_encode(array("error" => "Lab not found"));
                }
            } else {
                echo json_encode(array("error" => "Missing lab ID"));
            }
            break;


        case 'DELETE':
            if (isset($_GET['lab_name'])) {
                $lab_name = $_GET['lab_name'];
                $stmt = $conn->prepare("SELECT content_file FROM lab WHERE lab_name = :lab_name");
                $stmt->bindParam(':lab_name', $lab_name);
                $stmt->execute();
                $lab = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($lab) {
                    $fileToDelete = 'lab_storage/' . $lab['content_file'];

                    if (file_exists($fileToDelete)) {
                        unlink($fileToDelete);
                    }

                    $stmt = $conn->prepare("DELETE FROM lab WHERE lab_name = :lab_name");
                    $stmt->bindParam(':lab_name', $lab_name);

                    if ($stmt->execute()) {
                        echo json_encode(array("message" => "Lab deleted successfully"));
                    } else {
                        echo json_encode(array("error" => "Failed to delete lab"));
                    }
                } else {
                    echo json_encode(array("error" => "Lab not found"));
                }
            } else {
                echo json_encode(array("error" => "Missing lab name"));
            }
            break;

        default:
            echo json_encode(array("error" => "Invalid request method"));
            break;
    }
} catch (Exception $e) {
    echo json_encode(array("error" => $e->getMessage()));
}
