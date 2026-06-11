<?php

$conn = new mysqli("localhost", "root", "1234567", "minova");

if ($conn->connect_error) {
    die("Error: " . $conn->connect_error);
}

?>