<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, withcredentials");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
include 'DbConnect.php';

class Login
{
    private $db;

    public function __construct()
    {
        $this->db = new DbConnect();
    }

    public function authenticate($user_id, $password)
    {
        try {
            $conn = $this->db->connect();

            $query = "SELECT * FROM account WHERE user_id = :user_id";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result && password_verify($password, $result['password'])) {
                session_start();

                // เก็บข้อมูลในเซสชัน
                $_SESSION['user_id'] = $result['user_id'];
                $_SESSION['prefix'] = $result['prefix'];
                $_SESSION['first_name'] = $result['first_name'];
                $_SESSION['last_name'] = $result['last_name'];
                $_SESSION['faculty'] = $result['faculty'];
                $_SESSION['department'] = $result['department'];
                $_SESSION['section'] = $result['section'];
                $_SESSION['day'] = $result['day'];
                $_SESSION['start_time'] = $result['start_time'];
                $_SESSION['end_time'] = $result['end_time'];
                $_SESSION['role'] = $result['role'];
                $_SESSION['position'] = $result['position'];

                // ส่งข้อมูลผู้ใช้กลับไป
                echo json_encode([
                    "status" => "Success",
                    "user" => [
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
        } catch (\Exception $e) {
            echo json_encode(["status" => "Database Error: " . $e->getMessage()]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $user_id = $data['user_id'];
    $password = $data['password'];

    $login = new Login();
    $login->authenticate($user_id, $password);
}
