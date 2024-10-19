<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: DELETE");
header("Content-Type: application/json");

include 'DbConnect.php';

$objDb = new DbConnect;
$conn = $objDb->connect();

// Check if lab_id is set in the URL
if(isset($_POST['id'])) {
    $labId = $_POST['id'];

    try {

        // Prepare and execute the SQL statement to delete the lab
        $stmt = $conn->prepare("DELETE FROM lab_allow WHERE id = :lab_id");
        $stmt->bindParam(':lab_id', $labId);
        $stmt->execute();

        // Send success message back to the client
        echo json_encode(array("message" => "Lab deleted successfully"));
    } catch (PDOException $e) {
        // If an error occurs, send error message back to the client
        echo json_encode(array("error" => $e->getMessage()));
    }
} else {
    // If lab_id is not set in the URL, send error message back to the client
    echo json_encode(array("error" => "Lab ID is required"));
}
?>
