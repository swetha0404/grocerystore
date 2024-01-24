<?php
    $cartdata = $_POST['cartdata'];
    $filePath = $_POST['filePath'];
    echo '<script>console.log("file updated successfully")</script>';
    file_put_contents($filePath, $cartdata);
    echo '<script>console.log("file updated successfully")</script>';
    echo '<script>alert("File updated successfully")</script>';
?>