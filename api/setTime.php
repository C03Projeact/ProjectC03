<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json; charset=utf-8');

include 'DbConnect.php';
$dbConnect = new DbConnect();
$conn = $dbConnect->connect();

if (!$conn) {
    echo json_encode(["message" => "ไม่สามารถเชื่อมต่อฐานข้อมูลได้"]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $lab_number = $data['lab_number'];
    $start_time = $data['start_time'];
    $end_time = $data['end_time'];
    $section = $data['section'];

    if ($lab_number && $start_time && $end_time && $section) {
        $query = "INSERT INTO lab_schedule (lab_number, start_time, end_time, section) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($query);

        if ($stmt === false) {
            echo json_encode(["message" => "Query preparation failed", "error" => $conn->error]);
            exit();
        }

        $stmt->bind_param("ssss", $lab_number, $start_time, $end_time, $section);

        if ($stmt->execute()) {
            echo json_encode(["message" => "บันทึกข้อมูลสำเร็จ"]);
        } else {
            echo json_encode(["message" => "ไม่สามารถบันทึกข้อมูลได้", "error" => $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["message" => "ข้อมูลไม่ครบถ้วน"]);
    }
} else {
    echo json_encode(["message" => "ไม่รองรับ method นี้"]);
}

$conn->close();
?>
