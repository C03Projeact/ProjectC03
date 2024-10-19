<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include 'DbConnect.php';

$objDb = new DbConnect;
$conn = $objDb->connect();

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $section = $_POST['section'];

        // SQL query to fetch all students in the selected section with role = 3
        $sql = "SELECT * FROM account WHERE section = :section AND role = '3'";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':section', $section);
        $stmt->execute();

        $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($students);
    } else {
        echo json_encode(array("error" => "Invalid request method"));
    }
} catch (Exception $e) {
    echo json_encode(array("error" => $e->getMessage()));
}
