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
    $sql = "
    SELECT 
        lab_allow.lab_id, 
        lab_allow.account_id, 
        lab_allow.id,
        account.user_id,
        account.first_name, 
        account.last_name, 
        account.section,
        lab_submit.id AS submission_id -- ดึง id ของ lab_submit เพื่อใช้ในการตรวจสอบสถานะ
    FROM 
        lab_allow 
    JOIN 
        account ON lab_allow.account_id = account.id
    LEFT JOIN 
        lab_submit ON lab_allow.lab_id = lab_submit.lab_id AND lab_allow.account_id = lab_submit.account_id
    WHERE 
        lab_allow.lab_id = :lab_id
";

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
