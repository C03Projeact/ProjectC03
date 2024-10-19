<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once 'DbConnect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $lessonId = $_POST['lesson_id'];
    $lessonName = $_POST['lesson_name'];
    $contentFile = $_POST['content_file'];
    $status = $_POST['status'];
    
    // เพิ่มเวลาปัจจุบัน
    $uploadTime = date('Y-m-d H:i:s');

    try {
        $dbConnect = new DbConnect();
        $conn = $dbConnect->connect();

        $stmt = $conn->prepare("UPDATE lesson SET lesson_name = :lesson_name, content_file = :content_file, status = :status, upload_time = :upload_time WHERE id = :id");

        $stmt->bindParam(':id', $lessonId);
        $stmt->bindParam(':lesson_name', $lessonName);
        $stmt->bindParam(':content_file', $contentFile);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':upload_time', $uploadTime); // ผูกค่า upload_time

        $stmt->execute();

        // ส่งข้อมูล JSON กลับไปยัง client แสดงว่าอัปเดตข้อมูลสำเร็จ
        echo json_encode(array("message" => "Lesson updated successfully"));
    } catch (Exception $e) {
        // หากเกิดข้อผิดพลาด ส่งข้อความข้อผิดพลาดกลับไปยัง client
        echo json_encode(array("error" => $e->getMessage()));
    }
} else {
    // หากไม่ใช่การส่งคำร้องขอแบบ POST ส่งข้อความข้อผิดพลาดกลับไปยัง client
    echo json_encode(array("error" => "Invalid request method"));
}
?>
