<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

// Include database connection file and PHPWord autoload file
require_once 'config/db.php';
require_once 'vendor/autoload.php'; // Autoload PHPWord

use PhpOffice\PhpWord\IOFactory;

try {
    // Get lesson ID from query parameter
    $lesson_id = $_GET['id'];

    // Establish database connection
    // SQL query to fetch the lesson
    $sql = "SELECT * FROM lesson WHERE lesson_id = :lesson_id";
    $result = $conn->prepare($sql);
    $result->bindParam(':lesson_id', $lesson_id);
    $result->execute();

    $fetch = $result->fetchAll(PDO::FETCH_ASSOC);

    // Path to the DOCX file (you can dynamically set this if the file is stored in your DB)
    $file = 'lesson_storage/' . $fetch[0]['content_file'];

    // Read the DOCX file
    $phpWord = IOFactory::load($file);
    $text = '';

    foreach ($phpWord->getSections() as $section) {
        foreach ($section->getElements() as $element) {
            if (method_exists($element, 'getText')) {
                $text .= $element->getText() . "\n";
            }
        }
    }

    // Return the lesson data and DOCX content as JSON
    echo json_encode([
        'lesson' => $fetch,
        'docx_content' => $text
    ]);

} catch (Exception $e) {
    // If an error occurs during database connection or file reading, return an error message
    echo json_encode([
        'error' => "Error: " . $e->getMessage()
    ]);
}

// Close the database connection
$conn = null;
?>
