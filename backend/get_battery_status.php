<?php

$hostname = "localhost";
$username = "root";
$password = "";
$database = "smartmonkey";

$conn = mysqli_connect($hostname, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

echo "Database connection is OK";

if (isset($_POST["Voltage"]) && isset($_POST["Status"])) {
    $v = mysqli_real_escape_string($conn, $_POST["Voltage"]);
    $s = mysqli_real_escape_string($conn, $_POST["Status"]);

    $sql = "INSERT INTO battery_status (voltage, status) VALUES ('$v', '$s')";

    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
} else {
    echo "Voltage or Status not set in POST request.";
}


// Handle GET request to fetch data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT id, voltage, status, created_at FROM battery_status ORDER BY created_at DESC LIMIT 10";
    $result = mysqli_query($conn, $sql);
    
    $data = array();
    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            $data[] = array(
                'id' => $row['id'],
                'voltage' => $row['voltage'],
                'status' => $row['status'],
                'timestamp' => $row['created_at']
            );
        }
    }
    echo json_encode($data);
}

mysqli_close($conn);
?>


