<?php

    $link = mysqli_connect("localhost","root","password","greenbasket");
    if (!$link)
    {
        echo "MySQL Error: " . mysqli_connect_error();
    }
?>