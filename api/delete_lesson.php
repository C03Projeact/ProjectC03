<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: DELETE");
header("Content-Type: application/json");
include 'DbConnect.php';

$objDb = new DbConnect;
$conn = $objDb->connect();
// Check if lesson_id is set in the URL
if(isset($_GET['id'])) {
    $lessonId = $_GET['id'];

    try {
        // Connect to the database
        $dbConnect = new DbConnect();
        $conn = $dbConnect->connect();

        // Prepare and execute the SQL statement to delete the lesson
        $stmt = $conn->prepare("DELETE FROM lesson WHERE id = :lesson_id");
        $stmt->bindParam(':lesson_id', $lessonId);
        $stmt->execute();

        // Send success message back to the client
        echo json_encode(array("message" => "Lesson deleted successfully"));
    } catch (PDOException $e) {
        // If an error occurs, send error message back to the client
        echo json_encode(array("error" => $e->getMessage()));
    }
} else {
    // If lesson_id is not set in the URL, send error message back to the client
    echo json_encode(array("error" => "Lesson ID is required"));
}
?>
