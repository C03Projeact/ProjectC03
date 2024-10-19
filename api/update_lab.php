<?php
error_reporting(E_ALL);
error_log(print_r($_PUT, true));
error_log(print_r($_FILES, true));
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json; charset=utf-8;');

include 'DbConnect.php';

$dbConnect = new DbConnect();
$conn = $dbConnect->connect();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['lab_id']) || !isset($_POST['lab_name'])) {
        echo json_encode(['success' => false, 'error' => 'Required fields are missing.']);
        exit;
    }

    $lab_id = $_POST['lab_id'];
    $lab_name = $_POST['lab_name'];
    $status = 1; // Status is always 1
    $upload_time = date("Y-m-d H:i:s"); // Set current timestamp as upload time

    try {
        // Retrieve the current content_file name to delete the old file later if a new one is provided
        $query = "SELECT content_file FROM lab WHERE lab_id = :lab_id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':lab_id', $lab_id);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$result) {
            echo json_encode(['success' => false, 'error' => 'Lab not found.']);
            exit;
        }

        $old_file_name = $result['content_file'];

        // Check if a new file is uploaded
        $updateContentFile = isset($_FILES['content_file']) && $_FILES['content_file']['error'] === 0;
        
        if ($updateContentFile) {
            $file_tmp = $_FILES['content_file']['tmp_name'];
            $file_name = time() . '_' . $_FILES['content_file']['name']; // Add a timestamp to avoid overwriting files
            $upload_dir = 'lab_storage/';
            $upload_path = $upload_dir . basename($file_name);

            // Move the uploaded file to the lab_storage directory
            if (move_uploaded_file($file_tmp, $upload_path)) {
                // Delete the old file if it exists
                $old_file_path = $upload_dir . $old_file_name;
                if (file_exists($old_file_path)) {
                    unlink($old_file_path); // Delete the old file
                }
            } else {
                echo json_encode(['success' => false, 'error' => 'Failed to move uploaded file.']);
                exit;
            }
        }

        // Update query based on whether content_file is updated or not
        if ($updateContentFile) {
            $query = "UPDATE lab SET lab_name = :lab_name, content_file = :content_file, upload_time = :upload_time, status = :status WHERE lab_id = :lab_id";
        } else {
            $query = "UPDATE lab SET lab_name = :lab_name, upload_time = :upload_time, status = :status WHERE lab_id = :lab_id";
        }
        
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':lab_name', $lab_name);
        $stmt->bindParam(':upload_time', $upload_time);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':lab_id', $lab_id);

        if ($updateContentFile) {
            $stmt->bindParam(':content_file', $file_name);
        }

        // Execute the query
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Database execution error']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Database preparation error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
}
