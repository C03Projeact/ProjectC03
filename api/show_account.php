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

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $query = "SELECT * FROM account";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[4]) && is_numeric($path[4])) { // Correct position of path[4]
            $query .= " WHERE id = :id";
            $stmt = $conn->prepare($query); // Corrected query usage
            $stmt->bindParam(':id', $path[4]); // Corrected to use path[4] to get id
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($query);
            $stmt->execute();
            $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($user);
        break;

    case "PUT":
    $account = json_decode(file_get_contents('php://input'), true);
    $path = explode('/', $_SERVER['REQUEST_URI']);
    
    // Hash the password before saving
    if (isset($account['password'])) {
        $account['password'] = password_hash($account['password'], PASSWORD_DEFAULT);
    }

    $sql = "UPDATE account SET user_id = :user_id, password = :password, prefix = :prefix, first_name = :first_name, last_name = :last_name, faculty = :faculty, department = :department, section = :section, day = :day, start_time = :start_time, end_time = :end_time, position = :position WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $path[4]); // Corrected ID binding
    $stmt->bindParam(':user_id', $account['user_id']);
    $stmt->bindParam(':password', $account['password']);
    $stmt->bindParam(':prefix', $account['prefix']);
    $stmt->bindParam(':first_name', $account['first_name']);
    $stmt->bindParam(':last_name', $account['last_name']);
    $stmt->bindParam(':faculty', $account['faculty']);
    $stmt->bindParam(':department', $account['department']);
    $stmt->bindParam(':section', $account['section']);
    $stmt->bindParam(':day', $account['day']);
    $stmt->bindParam(':start_time', $account['start_time']);
    $stmt->bindParam(':end_time', $account['end_time']);
    $stmt->bindParam(':position', $account['position']);

    if ($stmt->execute()) {
        $response = ['status' => 1, 'message' => 'Record updated successfully'];
    } else {
        $response = ['status' => 0, 'message' => 'Failed to update record'];
    }
    echo json_encode($response);
    break;
        case "DELETE":
            $sql = "DELETE FROM account WHERE id = :id"; // Make sure this matches your primary key
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[4]); // Ensure path[4] is correct
            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record'];
            }
            echo json_encode($response);
            break;
        
}
