<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

// Include database connection file

include 'DbConnect.php';

$objDb = new DbConnect;
$conn = $objDb->connect();

try {
    // Create a new instance of DbConnect



    // SQL query to fetch all account
    $sql = "SELECT * FROM account WHERE role = '3'";
    $result = $conn->prepare($sql);
    $result->execute();
    

    // Check if there are any rows returned
    if ($result->rowCount() > 0) {
        // Array to store all labs
        $account = array();

        // Fetch rows one by one
        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            // Add each row's data to the labs array
            $account[] = $row;
        }

        // Convert the labs array to JSON and send it back to the client
        echo json_encode($account);
    } else {
        // If there are no rows, send back a message indicating zero results
        echo "0 results";
    }
} catch (Exception $e) {
    // If an error occurs during database connection or query execution, return error message
    echo "Error: " . $e->getMessage();
}

// Close the database connection
$conn = null;
?>
