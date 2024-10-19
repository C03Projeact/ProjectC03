<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Include DbConnect class
    require_once 'DbConnect.php';

    // Check if files are uploaded successfully
    if (!isset($_FILES['pdf_file']['error']) || $_FILES['pdf_file']['error'] !== UPLOAD_ERR_OK || !isset($_FILES['text_file']['error']) || $_FILES['text_file']['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(array('success' => false, 'message' => 'Error uploading files'));
        exit;
    }

    // Check file types
    $pdfFileType = 'application/pdf';
    $textFileType = 'text/plain';

    $pdfFileMimeType = mime_content_type($_FILES['pdf_file']['tmp_name']);
    $textFileMimeType = mime_content_type($_FILES['text_file']['tmp_name']);

    if ($pdfFileMimeType !== $pdfFileType || $textFileMimeType !== $textFileType) {
        echo json_encode(array('success' => false, 'message' => 'Invalid file type. Only PDF and text files are allowed.'));
        exit;
    }

    // Check file sizes
    $maxFileSize = 5242880; // 5 MB (in bytes)

    if ($_FILES['pdf_file']['size'] > $maxFileSize || $_FILES['text_file']['size'] > $maxFileSize) {
        echo json_encode(array('success' => false, 'message' => 'File size exceeds maximum allowed size.'));
        exit;
    }

    // Database connection
    $db = new DbConnect();
    $conn = $db->connect();

    // Prepare and execute SQL query to insert files into the database
    $query = "INSERT INTO homework (homework_name, pdf_file, text_file) VALUES (:homework_name, :pdf_file, :text_file)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':homework_name', $homeworkName); // You need to set $homeworkName with appropriate value
    $stmt->bindParam(':pdf_file', $_FILES['pdf_file']['name']);
    $stmt->bindParam(':text_file', $_FILES['text_file']['name']);

    // Move uploaded files to desired directory
    $uploadDirectory = 'uploads/';
    if (!move_uploaded_file($_FILES['pdf_file']['tmp_name'], $uploadDirectory . $_FILES['pdf_file']['name']) || !move_uploaded_file($_FILES['text_file']['tmp_name'], $uploadDirectory . $_FILES['text_file']['name'])) {
        echo json_encode(array('success' => false, 'message' => 'Error moving uploaded files'));
        exit;
    }

    // Execute the query
    if ($stmt->execute()) {
        echo json_encode(array('success' => true, 'message' => 'Homework saved successfully'));
    } else {
        echo json_encode(array('success' => false, 'message' => 'Failed to save homework'));
    }
} else {
    echo json_encode(array('success' => false, 'message' => 'Invalid request method'));
}
?>
