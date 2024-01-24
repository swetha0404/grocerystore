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
        
        <div class="container p-3">
            <div class="panel panel-default">
                <div class="panel-heading">Registration form</div>
                    <div class="panel-body">

                        <form method=POST action=doregistration.php>

                            <div class="form-group">
                                <label>First name:</label>
                                <input type="text" class="form-control" name="fname" required/>
                            </div>

                            <div class="form-group">
                                <label>Last name:</label>
                                <input type="text" class="form-control" name="lname" required/>
                            </div>

                            <div class="form-group">
                                <label>Date of birth:</label>
                                <input type="date" class="form-control"  name="dob" required/>
                            </div>

                            <div class="form-group">
                                <label>Email:</label>
                                <input type="email" class="form-control"  name="email" required/>
                            </div>

                            <div class="form-group">
                                <label>Phone:</label>
                                <input type="text" class="form-control" maxlength="10" name="phone" required/>
                            </div>
                            

                            <div class="form-group">
                                <label>Address:</label>
                                <input type="text" class="form-control"  name="address" required/>
                            </div>

                            <!-- User table info -->

                            <div class="form-group">
                                <label>Username:</label>
                                <input type="text" class="form-control" name="uname" required/>
                            </div>

                            <div class="form-group">
                                <label>Password:</label>
                                <input type="password" class="form-control"  required name="pass1" onChange="form.pass2.pattern=this.value" />
                            </div>

                            <div class="form-group">
                                <label>Password confirmation:</label>
                                <input type="password" class="form-control"  name="pass2" required />
                            </div>

                            <div class="form-group">
                                <input type="submit" name="submit" class="btn btn-primary" value="Save" />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>

    </body>

</html>