<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$hostname = "localhost";
$username = "root";
$password = "";
$database = "smartmonkey";

$conn = mysqli_connect($hostname, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Check request method and handle accordingly
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle POST request
    if (isset($_POST["Voltage"]) && isset($_POST["Status"])) {
        $v = mysqli_real_escape_string($conn, $_POST["Voltage"]);
        $s = mysqli_real_escape_string($conn, $_POST["Status"]);

        $sql = "INSERT INTO battery_status (voltage, status) VALUES ('$v', '$s')";

        if (mysqli_query($conn, $sql)) {
            $response = array(
                "status" => "success",
                "message" => "New record created successfully"
            );
        } else {
            $response = array(
                "status" => "error",
                "message" => "Error: " . mysqli_error($conn)
            );
        }
        echo json_encode($response);
    } else {
        $response = array(
            "status" => "error",
            "message" => "Voltage or Status not set in POST request."
        );
        echo json_encode($response);
    }
} 
else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Handle GET request
    $sql = "SELECT id, voltage, status, created_at FROM battery_status ORDER BY created_at DESC LIMIT 1";
    $result = mysqli_query($conn, $sql);
    
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $data = array(
            'id' => $row['id'],
            'voltage' => $row['voltage'],
            'status' => $row['status'],
            'timestamp' => $row['created_at']
        );
        echo json_encode($data);
    } else {
        echo json_encode(null);
    }
}

mysqli_close($conn);
?>