<!DOCTYPE HTML>

<html>

    <head>
        <title>Login</title>
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

            $op = $_POST['Submit'];
            $username = $_POST['username'];
            $pass = $_POST['pass'];

            if ($op=="Login")
            {
                $sql = "SELECT * FROM users WHERE username='$username'";
                $result = mysqli_query($link,$sql);

                // Check for errors
                if (!$result) {
                    echo "Error: " . mysqli_error($link);
                } 
                
                elseif (mysqli_num_rows($result)>0) {
                    // Fetch the result
                    $row = mysqli_fetch_assoc($result);
                    $storedPwd = $row['pwd'];
                    
                    if (password_verify($pass, $storedPwd)) {

                        setcookie("auth_user","$username");
                        echo "<script>
                                localStorage.setItem(auth_user, $username);
                                </script>";
                        header("Location: private.php");
                        exit;

                    } else { 
                        ?>
                            <div class="panel panel-danger">
                                <div class="panel-heading">Login error</div>
                                <div class="panel-body">Wrong password entered.<br>Redirecting you to the login page in 5 seconds</div>
                            </div>
                        <?php                        
                            // redirect to login page after 5 secs
                            echo "<script>
                                setTimeout(function() {
                                    window.location.href = 'login.php';
                                }, 5000);
                                </script>";
                    }
                }

                // FAILED LOGIN
                elseif (mysqli_num_rows($result)==0)
                {
                    ?>
                        <div class="panel panel-danger">
                            <div class="panel-heading">Login error</div>
                            <div class="panel-body">Username does not exist. Please register as a new user.<br>Redirecting you to the registration page in 5 seconds</div>
                        </div>        
                    <?php                                               
                        // redirect to registration page after 5 secs
                        echo "<script>
                        setTimeout(function() {
                            window.location.href = 'registration.php';
                        }, 5000);
                        </script>";
                }
            }
        ?>

    </body>

</html>