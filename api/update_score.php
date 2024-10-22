<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include 'DbConnect.php';  // Include the database connection file

$objDb = new DbConnect;
$conn = $objDb->connect();

try {
    // ตรวจสอบการรับค่า id, lab_id, account_id, score และ submission_status
    if (!isset($_POST['id']) || !isset($_POST['lab_id']) || !isset($_POST['account_id']) || !isset($_POST['score']) || !isset($_POST['submission_status'])) {
        echo json_encode(['error' => 'ID, Lab ID, Account ID, Score, and Submission Status must be provided']);
        exit();
    }

    $id = (int)$_POST['id'];
    $lab_id = (int)$_POST['lab_id'];
    $account_id = (int)$_POST['account_id'];
    $score = (int)$_POST['score'];
    $submission_status = (int)$_POST['submission_status'];

    // Debugging output
    error_log("Updating score for lab_submit ID: $id, Lab ID: $lab_id, Account ID: $account_id with score: $score and submission_status: $submission_status");

    // Prepare and execute the SQL statement
    $sql = "UPDATE lab_submit SET score = :score, submission_status = :submission_status WHERE id = :id AND lab_id = :lab_id AND account_id = :account_id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->bindParam(':lab_id', $lab_id, PDO::PARAM_INT);
    $stmt->bindParam(':account_id', $account_id, PDO::PARAM_INT);
    $stmt->bindParam(':score', $score, PDO::PARAM_INT);
    $stmt->bindParam(':submission_status', $submission_status, PDO::PARAM_INT); // ผูกค่า submission_status

    // Execute the statement
    $stmt->execute();

    // Check how many rows were affected
    $rowCount = $stmt->rowCount();
    if ($rowCount > 0) {
        echo json_encode(['message' => 'Score and submission status updated successfully']);
    } else {
        echo json_encode(['message' => 'No record found or score/submission status unchanged']);
    }
} catch (Exception $e) {
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
} finally {
    $conn = null;
}
