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



    $id = $_POST['id'];



    // Establish database connection
    $sql = "SELECT * FROM lab";
    $result = $conn->prepare($sql);
    $result->execute();


    $fetch = $result->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($fetch);
} catch (Exception $e) {
    // If an error occurs during database connection or query execution, return error message
    echo "Error: " . $e->getMessage();
}

// Close the database connection
$conn = null;
