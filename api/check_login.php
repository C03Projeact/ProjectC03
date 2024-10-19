<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");


include 'DbConnect.php';

$objDb = new DbConnect;
$conn = $objDb->connect();


// Check connection
if (!$conn) {
    $response = array('status' => 'error', 'message' => 'Connection failed');
    echo json_encode($response);
    exit;
}



if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = $_POST['user_id'];
    $password = $_POST['password'];

    $query = "SELECT * FROM account WHERE user_id = :user_id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result && password_verify($password, $result['password'])) {
        session_start();

        // ส่งข้อมูลผู้ใช้กลับไป
        echo json_encode([
            "status" => "Success",
            "user" => [
                "id" => $result['id'],
                "user_id" => $result['user_id'],
                "prefix" => $result['prefix'],
                "first_name" => $result['first_name'],
                "last_name" => $result['last_name'],
                "faculty" => $result['faculty'],
                "department" => $result['department'],
                "section" => $result['section'],
                "day" => $result['day'],
                "start_time" => $result['start_time'],
                "end_time" => $result['end_time'],
                "role" => $result['role'], // ตรวจสอบว่า role ถูกส่งไปด้วย
                "position" => $result['position'], 
            ],
        ]);
    } else {
        echo json_encode(["status" => "Invalid credentials"]);
    }
}

?>