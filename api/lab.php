<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

// Include database connection file and PHPWord autoload file
include 'DbConnect.php';
$dbConnect = new DbConnect();
$conn = $dbConnect->connect();
require_once 'vendor/autoload.php'; // Autoload PHPWord

use PhpOffice\PhpWord\IOFactory;

try {
    // Get lab ID from query parameter
    $lab_id = $_GET['id'];

    // Establish database connection
    // SQL query to fetch the lab
    $sql = "SELECT * FROM lab WHERE lab_id = :lab_id";
    $result = $conn->prepare($sql);
    $result->bindParam(':lab_id', $lab_id);
    $result->execute();

    $fetch = $result->fetchAll(PDO::FETCH_ASSOC);

    // Path to the DOCX file (you can dynamically set this if the file is stored in your DB)
    // Path to the file
    // ...

// Path to the file
$file = 'lab_storage/' . $fetch[0]['content_file'];

// Check file type
$file_type = pathinfo($file, PATHINFO_EXTENSION);

if ($file_type === 'docx') {
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
    $docContent = $text;
} elseif ($file_type === 'pdf') {
    // For PDF files, return the file path or read the file content if you want to show it inline
    $docContent = base64_encode(file_get_contents($file)); // Encode PDF content
} else {
    $docContent = "Unsupported file type.";
}

// Return the lab data and content as JSON
echo json_encode([
    'lab' => $fetch,
    'doc_content' => $docContent,
    'file_type' => $file_type, // Include file type in the response
]);

// ...

} catch (Exception $e) {
    // If an error occurs during database connection or file reading, return an error message
    echo json_encode([
        'error' => "Error: " . $e->getMessage()
    ]);
}

// Close the database connection
$conn = null;
