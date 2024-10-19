<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include 'DbConnect.php';  // Include the database connection file

$objDb = new DbConnect;
$conn = $objDb->connect();

try {
    // ตรวจสอบการรับค่า id, lab_id, account_id และ score
    if (!isset($_POST['id']) || !isset($_POST['lab_id']) || !isset($_POST['account_id']) || !isset($_POST['score'])) {
        echo json_encode(['error' => 'ID, Lab ID, Account ID, and Score must be provided']);
        exit();
    }

    $id = (int)$_POST['id'];
    $lab_id = (int)$_POST['lab_id'];
    $account_id = (int)$_POST['account_id'];
    $score = (int)$_POST['score'];

    // Debugging output
    error_log("Updating score for lab_submit ID: $id, Lab ID: $lab_id, Account ID: $account_id with score: $score");

    // Prepare and execute the SQL statement
    $sql = "UPDATE lab_submit SET score = :score WHERE id = :id AND lab_id = :lab_id AND account_id = :account_id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->bindParam(':lab_id', $lab_id, PDO::PARAM_INT);
    $stmt->bindParam(':account_id', $account_id, PDO::PARAM_INT);
    $stmt->bindParam(':score', $score, PDO::PARAM_INT);

    // Execute the statement
    $stmt->execute();

    // Check how many rows were affected
    $rowCount = $stmt->rowCount();
    if ($rowCount > 0) {
        echo json_encode(['message' => 'Score updated successfully']);
    } else {
        echo json_encode(['message' => 'No record found or score unchanged']);
    }
} catch (Exception $e) {
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
} finally {
    $conn = null;
}
