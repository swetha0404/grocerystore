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
        <div class="container p-3 col-md-4">
            <div class="panel panel-default">
                <div class="panel-heading">Login page</div>
                    <div class="panel-body">

                        <form method=POST action=dologin.php>

                            <div class="form-group">
                                <label>Username:</label>
                                <input type="text" class="form-control" autocomplete=off required name="username"/>
                            </div>

                            <div class="form-group">
                                <label>Password:</label>
                                <input type="password" class="form-control"  required name="pass"/>
                            </div>


                            <div class="form-group">
                                <label></label>
                                <input type="submit" name="Submit" class="btn btn-primary" value="Login"/>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>  
    </body>

</html>