
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET");
header("Content-Type: application/json");


try {
    include 'DbConnect.php';
    $objDb = new DbConnect;
    $conn = $objDb->connect();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $lab_id = $_POST['lab_id'];
        $status = $_POST['status'];
        $open_time = $_POST['open_time'];
        $close_time = $_POST['close_time'];


        $stmt = $conn->prepare("UPDATE lab SET status = :status, open_time = :open_time, close_time = :close_time WHERE lab_id = :lab_id");

        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':open_time', $open_time);
        $stmt->bindParam(':close_time', $close_time);
        $stmt->bindParam(':lab_id', $lab_id);

        $stmt->execute();

        echo json_encode(array("success" => "lab time updated successfully"));


    }


} catch (Exception $e) {
    echo json_encode(array("error" => $e->getMessage()));
}
