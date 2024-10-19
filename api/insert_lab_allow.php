<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET");
header("Content-Type: application/json");

try {
    include 'DbConnect.php';
    $objDb = new DbConnect;
    $conn = $objDb->connect();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $lab_id = $_POST['lab_id'];
        $student_section = $_POST['student_section'];

        // to integer type
        $lab_id = (int)$lab_id;
        $student_section = (int)$student_section;

        // Select accounts with role = 3 in the specified section
        $sql = "SELECT account.id FROM account WHERE account.section = :student_section AND account.role = 3";
        $result = $conn->prepare($sql);
        $result->bindParam(':student_section', $student_section);
        $result->execute();

        $fetch = $result->fetchAll(PDO::FETCH_ASSOC);

        if (empty($fetch)) {
            echo json_encode(array("error" => "No students with role 3 found in the section."));
            exit();
        }

        foreach ($fetch as $value) {
            $stmt = $conn->prepare("INSERT INTO lab_allow (lab_id, account_id) VALUES (:lab_id, :account_id)");
            $stmt->bindParam(':lab_id', $lab_id);
            $stmt->bindParam(':account_id', $value['id']);
            $stmt->execute();
        }

        echo json_encode(array("message" => "Lab allow inserted successfully"));

    } else {
        echo json_encode(array("error" => "Invalid request method"));
    }
} catch (Exception $e) {
    echo json_encode(array("error" => $e->getMessage()));
}
