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
    $lesson_id = $_POST['lesson_id'];

    $lesson_id = (int)$lesson_id;

    // SQL query to fetch all lessons
    $sql = "SELECT lesson_allow.lesson_id, lesson_allow.account_id, lesson_allow.id, account.first_name, account.last_name FROM lesson_allow, account WHERE lesson_allow.lesson_id = :lesson_id AND lesson_allow.account_id = account.id";
    $result = $conn->prepare($sql);
    $result->bindParam(':lesson_id', $lesson_id);
    $result->execute();

    $fetch = $result->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($fetch);

} catch (Exception $e) {
    // If an error occurs during database connection or query execution, return error message
    echo "Error: " . $e->getMessage();
}

// Close the database connection
$conn = null;
?>
