<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="mystyle.css">
        <title>Green Basket</title>
        <link rel="icon" type="image/png" href="Icons/shopping-basket.png"/>

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Poppins&display=swap" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    </head>

    <body>  
        
        <div class="header main">            
            <div class="date-time main-time">
                <p id="date-holder"></p>
                <p id="time-holder"></p>
            </div>
            <img id="logo-main" src="Icons/shopping-basket.png" onclick="window.location.href='index.html'"/>
            <div class="header-text-content">
                <h1>Welcome to Green Basket!</h1>
                <p>Your one-stop shop for all your grocery needs</p>
            </div>
        </div>

        <div class="nav-bar cart-nav">
            <h3>
                Cart
            </h3>
        </div>

        <div class="center-content">

            <div class="side home-page-short">                        
                <h4>Explore</h4>                
                <div class="filter-sort-options">
                    <ul>
                        <li>
                            <a href="index.html">Trending searches</a>
                        </li>
                        <li>
                            <a href="specialty-shops.html">Shop the season's harvest</a>
                        </li>                            
                        <li>
                            <a href="account.html">Reorder last purchase</a>
                        </li>
                    </ul>
                </div>
            </div>
    
            <div class="main-content">
                <table id="cart-table">
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Amount</th>
                    </tr>
                    <tr>
                        <th colspan="2">Total</th>
                        <th id="cart-total-qty"></th>
                        <th id="cart-total-amount"></th>
                    </tr>
                </table>
                
                <button id="cancel-btn" onclick="cancelTransaction()">
                    Cancel
                </button>

                <button id="checkout-btn" onclick="checkoutCart()">
                    Checkout
                </button>

                
            </div>
        </div>    

        <div class="footer">
            <p class="facts">Swetha Malaivaiyavur Elayavalli - <b>SXM220052</b> </p>    
            <p class="facts">Hanah Susan Zachariah - <b>HXZ220000</b> </p>
            <div class="payments">
                <img class="payment-logo" src="Icons/Payment Icons/visa.png" />
                <img class="payment-logo" src="Icons/Payment Icons/mastercard.png" />
                <img class="payment-logo" src="Icons/Payment Icons/amex.png" />
                <img class="payment-logo" src="Icons/Payment Icons/discover.png" />
                <img class="payment-logo" src="Icons/Payment Icons/applePay.png" />
                <img class="payment-logo" src="Icons/Payment Icons/paypal.png" />
            </div>
        </div>
        
        <script src="actions.js"></script>
    </body>
</html>