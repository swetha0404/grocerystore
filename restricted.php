<?php

$current_user = $_COOKIE['auth_user'];

$sql = "SELECT cust_id FROM users WHERE username='$current_user'";
$result = mysqli_query($link,$sql);

if (mysqli_num_rows($result)==0)
{
    echo "Unauthorized access!";
    exit;
}
?>