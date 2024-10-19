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

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // Get data from the request
    $data = json_decode(file_get_contents("php://input"), true);

    // Sanitize the data (you may need to improve this based on your requirements)
    $user_id = htmlspecialchars($data['user_id']);
    $password = password_hash($data['password'], PASSWORD_DEFAULT);
    $prefix = htmlspecialchars($data['prefix']);
    $first_name = htmlspecialchars($data['first_name']);
    $last_name = htmlspecialchars($data['last_name']);
    $faculty = htmlspecialchars($data['faculty']);
    $department = htmlspecialchars($data['department']);
    $section = htmlspecialchars($data['section']);
    $role = htmlspecialchars($data['role']);
    $day = htmlspecialchars($data['day']);
    $start_time = htmlspecialchars($data['start_time']);
    $end_time = htmlspecialchars($data['end_time']);
    $position = htmlspecialchars($data['position']);

    // Insert data into the database
    $sql = "INSERT INTO account (user_id, password, prefix, first_name, last_name, faculty, department, section, role, day, start_time, end_time, position)
            VALUES (:user_id, :password, :prefix, :first_name, :last_name, :faculty, :department, :section, :role, :day, :start_time, :end_time, :position)";

    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':password', $password); // ใช้รหัสผ่านที่เข้ารหัส
    $stmt->bindParam(':prefix', $prefix);
    $stmt->bindParam(':first_name', $first_name);
    $stmt->bindParam(':last_name', $last_name);
    $stmt->bindParam(':faculty', $faculty);
    $stmt->bindParam(':department', $department);
    $stmt->bindParam(':section', $section);
    $stmt->bindParam(':role', $role);
    $stmt->bindParam(':day', $day);  // Bind new field
    $stmt->bindParam(':start_time', $start_time);  // Bind new field
    $stmt->bindParam(':end_time', $end_time);
    $stmt->bindParam(':position', $position);

    try {
        $stmt->execute();
        $response = array('status' => 'success', 'message' => 'Data inserted successfully');
        echo json_encode($response);
    } catch (\Exception $e) {
        $response = array('status' => 'error', 'message' => 'Error inserting data: ' . $e->getMessage());
        echo json_encode($response);
    }
} else {
    $response = array('status' => 'error', 'message' => 'Invalid request method');
    echo json_encode($response);
}

$conn = null;
