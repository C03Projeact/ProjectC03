<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'DbConnect.php';
$dbConnect = new DbConnect();
$conn = $dbConnect->connect();

if (!$conn) {
    http_response_code(500);
    echo json_encode(["status" => "Error", "message" => "Failed to connect to the database."]);
    exit();
}

class CourseContent {
    private $db;

    public function __construct() {
        $this->db = new DbConnect();
    }

    public function saveContent($content1, $content2, $goals) {
        try {
            $conn = $this->db->connect();
            $query = "UPDATE course_content SET content1 = :content1, content2 = :content2, goals = :goals WHERE id = 1";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':content1', $content1);
            $stmt->bindParam(':content2', $content2);
            $stmt->bindParam(':goals', $goals);
            $stmt->execute();

            echo json_encode(["status" => "Success"]);
        } catch (Exception $e) {
            error_log("Error in saveContent: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(["status" => "Error", "message" => $e->getMessage()]);
        }
    }

    public function getContent() {
        try {
            $conn = $this->db->connect();
            $query = "SELECT content1, content2, goals FROM course_content LIMIT 1";
            $stmt = $conn->query($query);
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($data) {
                echo json_encode($data);
            } else {
                echo json_encode(["status" => "No content found"]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["status" => "Error", "message" => $e->getMessage()]);
        }
    }

    public function deleteGoal($goalIndex) {
        try {
            $conn = $this->db->connect();
            $query = "SELECT goals FROM course_content WHERE id = 1"; // แก้ไขที่นี่
            $stmt = $conn->query($query);
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
            $goals = json_decode($data['goals'], true);
    
            if (isset($goals[$goalIndex])) {
                array_splice($goals, $goalIndex, 1);
                $updatedGoals = json_encode($goals);
    
                $updateQuery = "UPDATE course_content SET goals = :goals WHERE id = 1"; // แก้ไขที่นี่
                $updateStmt = $conn->prepare($updateQuery);
                $updateStmt->bindParam(':goals', $updatedGoals);
                $updateStmt->execute();
    
                echo json_encode(["status" => "Success", "message" => "Goal deleted successfully."]);
            } else {
                echo json_encode(["status" => "Error", "message" => "Invalid index"]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["status" => "Error", "message" => $e->getMessage()]);
        }
    }
}    

$method = $_SERVER['REQUEST_METHOD'];
$courseContent = new CourseContent();

if ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data['content1']) && isset($data['content2']) && isset($data['goals'])) {
        $content1 = $data['content1'];
        $content2 = $data['content2'];
        $goals = json_encode($data['goals']);
        $courseContent->saveContent($content1, $content2, $goals);
    } else {
        echo json_encode(["status" => "Error", "message" => "Invalid input data"]);
    }
} elseif ($method === 'GET') {
    $courseContent->getContent();
} elseif ($method === 'DELETE') {
    $goalIndex = intval($_GET['id']);
    $courseContent->deleteGoal($goalIndex);
}
?>
