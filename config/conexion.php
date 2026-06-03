<?php

$conn = new mysqli("localhost", "root", "", "minova");

if ($conn->connect_error) {
    die("Error: " . $conn->connect_error);
}

?>