<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *"); // Allow all domains
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include 'DbConnect.php';

try {
    $objDb = new DbConnect;
    $conn = $objDb->connect();
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Get account_id from the request
$account_id = isset($_GET['account_id']) ? intval($_GET['account_id']) : 0;

$sql = "
    SELECT ls.file, ls.score, l.lab_name 
    FROM lab_submit ls
    JOIN lab l ON ls.lab_id = l.lab_id
    WHERE ls.account_id = :account_id
    ORDER BY l.lab_id ASC
";


$stmt = $conn->prepare($sql);
$stmt->bindParam(':account_id', $account_id, PDO::PARAM_INT);
$stmt->execute();

$scores = array();

if ($stmt->rowCount() > 0) {
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $scores[] = $row;
    }
} else {
    $scores = []; // Return an empty array if no data
}

header('Content-Type: application/json');
echo json_encode($scores);
