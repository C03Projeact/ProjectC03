<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

// Include database connection file

include 'DbConnect.php';

$objDb = new DbConnect;
$conn = $objDb->connect();
try {
    // Create a new instance of DbConnect


    // Establish database connection
    $lab_id = $_POST['lab_id'];

    $lab_id = (int)$lab_id;

    // SQL query to fetch all labs
    $sql = "SELECT account.user_id, account.first_name, account.last_name, lab_submit.lab_id, lab_submit.account_id, lab_submit.score, lab_submit.file, lab_submit.id, lab.lab_name 
    FROM lab_submit 
    INNER JOIN account ON lab_submit.account_id = account.id
    INNER JOIN lab ON lab_submit.lab_id = lab.lab_id
    WHERE lab_submit.lab_id = :lab_id";

    $result = $conn->prepare($sql);
    $result->bindParam(':lab_id', $lab_id);
    $result->execute();

    $fetch = $result->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($fetch);
} catch (Exception $e) {
    // If an error occurs during database connection or query execution, return error message
    echo "Error: " . $e->getMessage();
}

// Close the database connection
$conn = null;
