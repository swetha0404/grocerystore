<!DOCTYPE HTML>

<html>

    <head>       
    <title>Registration</title>

        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

        <!-- jQuery library -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

        <!-- Latest compiled JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

    </head>

    <body>

        <?php

        include "database.php"; 

        function checkUserNameExists($username, $conn) {
                // Sanitize the input to prevent SQL injection
                $username = $conn->real_escape_string($username);

                // Query to check if the username exists
                $query = "SELECT * FROM users WHERE username = '$username'";
                $result = $conn->query($query);

                // Check if any row is returned
                if ($result->num_rows > 0) {
                    return true; // Username exists
                } else {
                    return false; // Username does not exist
                }
        }

        function checkErrors($email, $uname, $pass_1, $pass_2, $link) {
            
                $errors = 0;

                if (! preg_match('/@.*\.com/', $email)) {        
                    ?>
                        <div class="container p-3">
                            <div class="panel panel-danger">
                                <div class="panel-heading">Email error</div>
                                <div class="panel-body">Please enter a valid email address.<br>Redirecting you to the registration page in 5 seconds.</div>
                            </div>
                        </div>
                    <?php
                        $errors = 1;
                }

                if (checkUserNameExists($uname, $link)) {
                    ?>
                        <div class="container p-3">
                            <div class="panel panel-danger">
                                <div class="panel-heading">Username error</div>
                                <div class="panel-body">Please choose a different username,<br>Redirecting you to the registration page in 5 seconds.</div>
                            </div>
                        </div>
                    <?php
                        $errors = 1;
                }

                if ($pass_1 != $pass_2) {
                    ?>
                        <div class="container p-3">
                            <div class="panel panel-danger">
                                <div class="panel-heading">Password error</div>
                                <div class="panel-body">Password confirmation does not match. Please ensure you are entering the same password twice for confirmation.<br>Redirecting you to the registration page in 5 seconds.</div>
                            </div>
                        </div>
                    <?php
                        $errors = 1;
                }
                else {
                    if (strlen($pass_1) < 8) {
                        ?>
                            <div class="container p-3">
                                <div class="panel panel-danger">
                                    <div class="panel-heading">Password error</div>
                                    <div class="panel-body">Please ensure your password is at least 8 characters long.<br>Redirecting you to the registration page in 5 seconds.</div>
                                </div>
                            </div>
                        <?php
                            $errors = 1;
                    }
                }
                return $errors;
        }

        function retrieveLastUserID($link) {
                $sql = "SELECT MAX(cust_id) AS highest_user_id FROM users";
                $result = mysqli_query($link, $sql);

                // Check for errors
                if (!$result) {
                    echo "Error: " . mysqli_error($link);
                } else {
                    // Fetch the result
                    $row = mysqli_fetch_assoc($result);

                    // Access the highest user ID
                    $highestUserId = $row['highest_user_id'];

                    return $highestUserId;
                }
        }

            $op = $_POST['submit'];
            $fname = $_POST['fname'];
            $lname = $_POST['lname'];
            $uname = $_POST['uname'];
            $dob = $_POST['dob'];
            $email = $_POST['email'];
            $phone = $_POST['phone'];
            $address = $_POST['address'];
            $pass_1 = $_POST['pass1'];
            $pass_2 = $_POST['pass2'];

            $age = date_diff(date_create(date('Y-m-d')), date_create($dob)); 
            $errors = checkErrors($email,$uname,$pass_1,$pass_2,$link);

            if ($errors != 0) {
                // redirect to registration page after 5 secs
                echo "<script>
                    setTimeout(function() {
                        window.location.href = 'registration.php';
                    }, 5000);
                </script>";
            }


            if ($op=="Save" and $errors==0)
            {

                $sql = "INSERT INTO customers (first_name,last_name,age,ph_no,email,address)
                    VALUES ('$fname','$lname','$age->y','$phone','$email','$address')";
                mysqli_query($link,$sql);

                if (mysqli_error($link))  echo "MySQL Error: " . mysqli_error($link);
                else  {
                    // get the customer id and add into the users table
                    $nextUserID = mysqli_insert_id($link);
                    $hasedPwd = password_hash($pass_1, PASSWORD_DEFAULT);
                    $sql_users = "INSERT INTO users VALUES ('$nextUserID','$uname','$hasedPwd')";                    
                    mysqli_query($link,$sql_users);

                    if (mysqli_error($link)) {
                        echo "MySQL Error: " . mysqli_error($link);
                    } else {
                        // Registration success message
                        echo "
                            <div class='container p-3'>
                                <div class='panel panel-primary'>
                                    <div class='panel-heading'>Success!</div>
                                    <div class='panel-body'>Your registration was successful.<br>Redirecting you to the login page</div>
                                </div>
                            </div>";
                
                        // Redirect to login page after 5 seconds
                        echo "<script>
                            setTimeout(function() {
                                window.location.href = 'login.php';
                            }, 5000);
                        </script>";
                    }
                }
            }

        ?>
    </body>

</html>