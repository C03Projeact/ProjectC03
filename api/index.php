<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Heders: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();
var_dump($conn);

$method = $_SERVER['REQUEST_METHOD'];
