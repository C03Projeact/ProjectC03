<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json; charset=utf-8');

include 'DbConnect.php';
$dbConnect = new DbConnect();
$conn = $dbConnect->connect();
try {
    // Create a new instance of DbConnect


    // Establish database connection
    $file = $_POST['file'];
    $lab_id = $_POST['lab_id'];
    $account_id = $_POST['user_id'];

    // unique file name

    $file_name = time() . '-' . $_FILES['file']['name'];
    // upload file
    move_uploaded_file($_FILES['file']['tmp_name'], 'submit/' . $file_name);

    // SQL query to fetch all labs


    $sql = "INSERT INTO lab_submit (lab_id, account_id, file) VALUES (:lab_id, :account_id, :file)";
    $result = $conn->prepare($sql);
    $result->bindParam(':lab_id', $lab_id);
    $result->bindParam(':account_id', $account_id);
    $result->bindParam(':file', $file_name);
    $result->execute();

    echo json_encode([
        'message' => 'File uploaded successfully'
    ]);
} catch (Exception $e) {
    // If an error occurs during database connection or query execution, return error message
    echo "Error: " . $e->getMessage();
}

// Close the database connection
$conn = null;
