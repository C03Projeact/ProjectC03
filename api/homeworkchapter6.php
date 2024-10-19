<?php
require_once 'DbConnect.php'; // Assuming the DbConnect class is in the same directory

try {
    $db = new DbConnect();
    $conn = $db->connect();

    // Fetch data from the lesson table where lesson_name is 'chapter6'
    $lessonName = 'chapter6';
    $stmt = $conn->prepare("SELECT lesson_name, homework_file FROM lesson WHERE lesson_name = :lesson_name");
    $stmt->bindParam(':lesson_name', $lessonName);
    $stmt->execute();

    // Fetch data as an associative array
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        // Display data
        echo "Lesson Name: " . $result['lesson_name'] . "<br>";
        echo "Homework File: " . $result['homework_file'] . "<br>";
    } else {
        echo "No data found for lesson_name 'chapter6'";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
