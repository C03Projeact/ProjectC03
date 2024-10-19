<?php

/**
 * Database Connection
 */
class DbConnect
{
    private $server = 'localhost';
    private $dbname = 'rmuttcp_C03';
    private $user = 'rmuttcp';
    private $pass = 'xG5qK2sg43';

    public function connect()
{
    try {
        $conn = new PDO("mysql:host={$this->server};dbname={$this->dbname}", $this->user, $this->pass);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        error_log("Database connection successful."); // Log success message
        return $conn;
    } catch (PDOException $e) {
        error_log("Connection error: " . $e->getMessage()); // Log error message
        throw new Exception("Connection failed: " . $e->getMessage());
    }
}

}
