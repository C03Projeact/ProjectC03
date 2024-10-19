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
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // รับข้อมูล JSON ที่ส่งมาจากฝั่ง client
    $data = json_decode(file_get_contents("php://input"), true);
    $section = $data['section'];

    // ตรวจสอบว่ามีข้อมูล section หรือไม่
    if ($section) {
        // Query เพื่อดึงข้อมูลจากตาราง lab_schedule ที่ตรงกับ section และเวลาปัจจุบัน
        $query = "SELECT lab_number, start_time, end_time FROM lab_schedule WHERE section = ? AND start_time <= NOW() AND end_time >= NOW()";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $section);

        if ($stmt->execute()) {
            $result = $stmt->get_result();
            $links = [];

            // วนลูปเก็บข้อมูลลิงก์ที่สามารถเข้าถึงได้
            while ($row = $result->fetch_assoc()) {
                $links[] = $row;
            }

            echo json_encode(["links" => $links]);
        } else {
            echo json_encode(["message" => "ไม่สามารถดึงข้อมูลได้"]);
        }

        $stmt->close();
    } else {
        echo json_encode(["message" => "ข้อมูลไม่ครบถ้วน"]);
    }
} else {
    echo json_encode(["message" => "ไม่รองรับ method นี้"]);
}

$conn->close();
