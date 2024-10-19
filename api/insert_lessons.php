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
            $lessonName = $_POST['lesson_name'];
            $contentFile = $_FILES['content_file'];
            $status = $_POST['status'];

            // Check for file attachment
            if (isset($contentFile) && $contentFile['error'] === UPLOAD_ERR_OK) {
                $uploadDir = 'lesson_storage/';
                $filename = uniqid() . '-' . basename($contentFile['name']);
                $uploadFile = $uploadDir . $filename;

                if (move_uploaded_file($contentFile['tmp_name'], $uploadFile)) {
                    $uploadTime = date('Y-m-d H:i:s');

                    $stmt = $conn->prepare("INSERT INTO lesson (lesson_name, content_file, status, upload_time) VALUES (:lesson_name, :content_file, :status, :upload_time)");
                    $stmt->bindParam(':lesson_name', $lessonName);
                    $stmt->bindParam(':content_file', $filename);
                    $stmt->bindParam(':status', $status);
                    $stmt->bindParam(':upload_time', $uploadTime);
                    $stmt->execute();

                    echo json_encode(array("message" => "Lesson inserted successfully"));
                } else {
                    echo json_encode(array("error" => "Failed to upload file. Error: " . $contentFile['error']));
                }
            } else {
                echo json_encode(array("error" => "No file uploaded or upload error. Error Code: " . $contentFile['error']));
            }
            break;

        case 'GET':
            if (isset($_GET['lesson_id'])) {
                $lesson_id = $_GET['lesson_id'];
                $stmt = $conn->prepare("SELECT * FROM lesson WHERE lesson_id = :lesson_id");
                $stmt->bindParam(':lesson_id', $lesson_id);
                $stmt->execute();
                $lesson = $stmt->fetch(PDO::FETCH_ASSOC);
                echo json_encode($lesson);
            } else {
                $stmt = $conn->prepare("SELECT * FROM lesson");
                $stmt->execute();
                $lessons = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($lessons);
            }
            break;

        case 'PUT':
            // ดึงข้อมูล JSON จากคำขอ
            $lesson = json_decode(file_get_contents('php://input'), true);
            $path = explode('/', $_SERVER['REQUEST_URI']);

            // ตรวจสอบให้แน่ใจว่าเก็บค่าถูกต้อง
            $lesson_id = $path[4] ?? null; // ใช้ lesson_id จาก URL
            $lesson_name = $lesson['lesson_name'] ?? null;
            $status = $lesson['status'] ?? null;
            $content_file = $_FILES['content_file'] ?? null; // ตรวจสอบการอัปโหลดไฟล์

            // Debugging
            error_log("Lesson ID: " . $lesson_id);
            error_log("Lesson Name: " . $lesson_name);
            error_log("Status: " . $status);
            error_log("Content File: " . json_encode($content_file));

            // ตรวจสอบค่าที่จำเป็น
            if ($lesson_id === null) {
                echo json_encode(array("error" => "Missing required ID"));
                exit;
            } elseif ($lesson_name === null) {
                echo json_encode(array("error" => "Missing required name"));
                exit;
            } elseif ($status === null) {
                echo json_encode(array("error" => "Missing required status"));
                exit;
            } elseif ($content_file === null) {
                echo json_encode(array("error" => "Missing content file"));
                exit;
            } elseif ($lesson_id === null && $lesson_name === null && $status === null && $content_file === null) {
                echo json_encode(array("error" => "Missing required ALL"));
                exit;
            }

            if ($lesson_id) {
                $stmt = $conn->prepare("SELECT content_file FROM lesson WHERE lesson_id = :lesson_id");
                $stmt->bindParam(':lesson_id', $$path[4]);
                $stmt->execute();
                $lessonData = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($lessonData) {
                    $oldFile = 'lesson_storage/' . $lessonData['content_file'];

                    // Delete old file if exists
                    if (file_exists($oldFile)) {
                        unlink($oldFile);
                    }

                    // Upload new file
                    if (isset($content_file) && $content_file['error'] === UPLOAD_ERR_OK) {
                        $uploadDir = 'lesson_storage/';
                        $newFilename = uniqid() . '-' . basename($content_file['name']);
                        $uploadFile = $uploadDir . $newFilename;

                        if (move_uploaded_file($content_file['tmp_name'], $uploadFile)) {
                            $stmt = $conn->prepare("UPDATE lesson SET lesson_name = :lesson_name, content_file = :content_file, status = :status, upload_time = NOW() WHERE lesson_id = :lesson_id");
                            $stmt->bindParam(':lesson_name', $lesson_name);
                            $stmt->bindParam(':content_file', $newFilename);
                            $stmt->bindParam(':status', $status);
                            $stmt->bindParam(':lesson_id', $$path[4]);

                            if ($stmt->execute()) {
                                echo json_encode(array("message" => "Lesson updated successfully with new file"));
                            } else {
                                echo json_encode(array("error" => "Failed to update lesson with new file"));
                            }
                        } else {
                            echo json_encode(array("error" => "Failed to upload new file"));
                        }
                    } else {
                        // Update without new file
                        $stmt = $conn->prepare("UPDATE lesson SET lesson_name = :lesson_name, status = :status, upload_time = NOW() WHERE lesson_id = :lesson_id");
                        $stmt->bindParam(':lesson_name', $lesson_name);
                        $stmt->bindParam(':status', $status);
                        $stmt->bindParam(':lesson_id', $$path[4]);

                        if ($stmt->execute()) {
                            echo json_encode(array("message" => "Lesson updated successfully without new file"));
                        } else {
                            echo json_encode(array("error" => "Failed to update lesson without new file"));
                        }
                    }
                } else {
                    echo json_encode(array("error" => "Lesson not found"));
                }
            } else {
                echo json_encode(array("error" => "Missing lesson ID"));
            }
            break;


        case 'DELETE':
            if (isset($_GET['lesson_name'])) {
                $lesson_name = $_GET['lesson_name'];
                $stmt = $conn->prepare("SELECT content_file FROM lesson WHERE lesson_name = :lesson_name");
                $stmt->bindParam(':lesson_name', $lesson_name);
                $stmt->execute();
                $lesson = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($lesson) {
                    $fileToDelete = 'lesson_storage/' . $lesson['content_file'];

                    if (file_exists($fileToDelete)) {
                        unlink($fileToDelete);
                    }

                    $stmt = $conn->prepare("DELETE FROM lesson WHERE lesson_name = :lesson_name");
                    $stmt->bindParam(':lesson_name', $lesson_name);

                    if ($stmt->execute()) {
                        echo json_encode(array("message" => "Lesson deleted successfully"));
                    } else {
                        echo json_encode(array("error" => "Failed to delete lesson"));
                    }
                } else {
                    echo json_encode(array("error" => "Lesson not found"));
                }
            } else {
                echo json_encode(array("error" => "Missing lesson name"));
            }
            break;

        default:
            echo json_encode(array("error" => "Invalid request method"));
            break;
    }
} catch (Exception $e) {
    echo json_encode(array("error" => $e->getMessage()));
}
