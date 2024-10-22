<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include 'DbConnect.php';  // Include the database connection file

$objDb = new DbConnect;
$conn = $objDb->connect();

try {
    // ตรวจสอบการรับค่า scores
    if (!isset($_POST['scores'])) {
        echo json_encode(['error' => 'No scores provided']);
        exit();
    }

    $scores = json_decode($_POST['scores'], true);

    // ตรวจสอบว่า $scores เป็น array หรือไม่
    if (!is_array($scores)) {
        echo json_encode(['error' => 'Invalid data format']);
        exit();
    }

    $sql = "UPDATE lab_submit SET score = :score, submission_status = :submission_status WHERE id = :id AND lab_id = :lab_id AND account_id = :account_id";
    $stmt = $conn->prepare($sql);

    $updatedCount = 0; // เพื่อเก็บจำนวนที่อัปเดต

    foreach ($scores as $scoreData) {
        $stmt->bindParam(':id', $scoreData['id'], PDO::PARAM_INT);
        $stmt->bindParam(':lab_id', $scoreData['lab_id'], PDO::PARAM_INT);
        $stmt->bindParam(':account_id', $scoreData['account_id'], PDO::PARAM_INT);
        $stmt->bindParam(':score', $scoreData['score'], PDO::PARAM_INT);
        $stmt->bindParam(':submission_status', $scoreData['submission_status'], PDO::PARAM_INT);

        // Execute the statement
        if ($stmt->execute()) {
            $updatedCount++;
        }
    }

    if ($updatedCount > 0) {
        echo json_encode(['message' => "$updatedCount scores updated successfully"]);
    } else {
        echo json_encode(['message' => 'No scores were updated']);
    }
} catch (Exception $e) {
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
} finally {
    $conn = null;
}
