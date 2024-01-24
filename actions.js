let pageName = location.pathname.split("/").splice(-1)[0].replace(".html", "").replace(".php", "");
var pageFullPath = ''
let xmlString = ""; 
let cartXMLString = "";

// auto-intialize user-session
initializeUserSession();

function initializeUserSession() {
    if (pageName == "cart") {
        cartInit();
    }
    else if (pageName == "fresh-prod" || pageName=="frozen" || pageName=="candy" || pageName=="snacks") {
        pageFullPath = 'XMLs/'+pageName+'.xml';
        loadXMLDoc(pageFullPath);
    }
    else if (pageName == "pantry" || pageName == "breakfast-cereal" || pageName == "baking") {
        pageFullPath = 'JSONs/'+pageName+'.json';
        loadJSONDoc(pageFullPath);
    }
    else if (pageName == "specialty-shops") {
        initDiscount();
    }
    else if (pageName != "account" && pageName != "index" && pageName != "contact") {
        //cartCountInit();
    }
    else if (pageName == "index") {
        
    }
}   


function loadXMLDoc(xmlFile) {
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200 ) {
        var xmlDoc = this.responseXML; // Assuming the XML file is well-formed
        if (xmlDoc) {
            xmlString = new XMLSerializer().serializeToString(xmlDoc);
            loadInventoryXML(xmlString);
        }
      }
    };
    xmlhttp.open("GET", xmlFile, true);
    xmlhttp.send();
}

function loadInventoryXML(xmlString) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlString,"text/xml");  
    var fresh_prods = xmlDoc.getElementsByTagName("item");
    
    for (i=0; i<fresh_prods.length; i++) {
        // get info from the XML inventory
        var item_name_display = fresh_prods[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
        var item_name = fresh_prods[i].getElementsByTagName("name")[0].childNodes[0].nodeValue.toLowerCase();
        var item_img_path = fresh_prods[i].getElementsByTagName("img_path")[0].childNodes[0].nodeValue;
        var item_price = fresh_prods[i].getElementsByTagName("price")[0].childNodes[0].nodeValue;
        var item_rating = fresh_prods[i].getElementsByTagName("rating")[0].childNodes[0].nodeValue;
        var item_category = fresh_prods[i].getElementsByTagName("category")[0].childNodes[0].nodeValue;
        var item_cart = fresh_prods[i].getElementsByTagName("cart")[0].childNodes[0].nodeValue;
        var item_stock = fresh_prods[i].getElementsByTagName("stock")[0].childNodes[0].nodeValue;
        console.log(item_name_display+": "+item_stock);
        addItemsToPageJS(item_name, item_img_path, item_price, item_rating, item_category, item_cart, item_stock, item_name_display);
    }    
    // update total cart count on page
    document.getElementById('cart-total-count').innerHTML = localStorage.total;
}


function loadJSONDoc(jsonFilePath) {
    fetch(jsonFilePath).then((response) => response.json())
    .then((json) => {
        for (item in json) {
            // get info from the JSON objects
            var item_name_display = item;
            var item_name = json[item].ref_name;
            var item_img_path = json[item].img_path;
            var item_price = json[item].price;
            var item_rating = json[item].rating;
            var item_category = json[item].category;
            var item_cart = json[item].cart;
            var item_stock = json[item].stock;
            console.log(item_name_display+": "+item_stock);
            addItemsToPageJS(item_name, item_img_path, item_price, item_rating, item_category, item_cart, item_stock, item_name_display);
        }
        
        // update total cart count on page
        document.getElementById('cart-total-count').innerHTML = localStorage.total;
    });
}

function addItemsToPageJS(item_name, item_img_path, item_price, item_rating, item_category, item_cart, item_stock, item_name_display) {
    // create the divs in the html webpage for the respective item
    var category_div = document.getElementsByClassName("content-library "+item_category)[0];
    var item_card_div = document.createElement('div');
    item_card_div.setAttribute("class", "cards "+item_name);
    // add the image
    if (pageName == "frozen" || pageName == "breakfast-cereal" || pageName == "snacks" || pageName == "baking") {
        //use jQuery to add the image div 
        var card_img_div = $('<div>').addClass('card-img');
        var card_img = $('<img>').attr('src', item_img_path);
        card_img_div.append(card_img);
        item_card_div.appendChild(card_img_div[0]);
        console.log("Added image using jQuery");
    } else {
        // use JS to add the image 
        var card_img_div = document.createElement('div');
        card_img_div.setAttribute("class", "card-img");
        var card_img = document.createElement('img');
        card_img.src = item_img_path;
        card_img_div.appendChild(card_img);
        item_card_div.appendChild(card_img_div);
    }
    // add lower-half
    var card_lower_half_div = document.createElement('div');
    card_lower_half_div.setAttribute("class", "card-lower-half");
    // add card-info
    var card_info_div = document.createElement('div');
    card_info_div.setAttribute("class", "card-info");
    var p_card_name = document.createElement('p');
    p_card_name.setAttribute("class", "card-name");
    p_card_name.innerHTML = item_name_display;
    var p_card_price = document.createElement('p');
    p_card_price.setAttribute("class", "card-price "+item_name);
    p_card_price.innerHTML = item_price;
    card_info_div.appendChild(p_card_name);
    card_info_div.appendChild(p_card_price);
    card_lower_half_div.appendChild(card_info_div);
    // add card-rating-cart
    var card_rating_cart_div = document.createElement('div');
    card_rating_cart_div.setAttribute("class", "card-rating-cart");
    var card_rating_div = document.createElement('div');
    card_rating_div.setAttribute("class", "card-rating");
    var card_star_img = document.createElement('img');
    card_star_img.setAttribute("id", "card-star");
    card_star_img.src = "Icons/star.png";
    card_star_img.width = "20";
    card_star_img.height = "20";
    var p_card_rate = document.createElement('p');
    p_card_rate.setAttribute("id", "card-rate");
    p_card_rate.innerHTML = item_rating;
    card_rating_div.appendChild(card_star_img);
    card_rating_div.appendChild(p_card_rate);
    card_rating_cart_div.appendChild(card_rating_div);
    var card_add_to_cart_div = document.createElement('div');
    card_add_to_cart_div.setAttribute("class", "card-add-to-cart");
    var add_cart_img = document.createElement('img');
    add_cart_img.setAttribute("class", "add-cart-img");
    add_cart_img.src="Icons/shopping-cart.png";
    add_cart_img.width = "20";
    add_cart_img.height = "20";
    card_add_to_cart_div.appendChild(add_cart_img);
    var cart_adder_div = document.createElement('div');

    cart_adder_div.setAttribute("class", "cart-adder");
    var add_to_cart_btn = document.createElement('button');
    var item_add_plus_img = document.createElement('img');
    item_add_plus_img.setAttribute("class", "item-add-plus-img");
    item_add_plus_img.src = "Icons/add.png";
    item_add_plus_img.width = "10";
    item_add_plus_img.height = "10";
    add_to_cart_btn.appendChild(item_add_plus_img);

    if (pageName != "candy" && pageName != "snacks") {
        var add_cart_arguments = "addToCart('"+item_name+"')";
        add_to_cart_btn.setAttribute("onclick", add_cart_arguments);
        var p_cart_count = document.createElement('p');
        p_cart_count.setAttribute("class", "cart-count "+item_name);
        p_cart_count.innerHTML = item_cart;

        cart_adder_div.appendChild(add_to_cart_btn);
        cart_adder_div.appendChild(p_cart_count);
    }
    else {
        var item_add_input = document.createElement('input');
        item_add_input.type = "text";
        item_add_input.setAttribute("id", item_name+'_input');
        var add_cart_arguments = "addNumToCart('"+item_name+"')";
        add_to_cart_btn.setAttribute("onclick", add_cart_arguments);

        cart_adder_div.appendChild(item_add_input);
        cart_adder_div.appendChild(add_to_cart_btn);
    }
    
    card_add_to_cart_div.appendChild(cart_adder_div);
    card_rating_cart_div.appendChild(card_add_to_cart_div);
    card_lower_half_div.appendChild(card_rating_cart_div);
    item_card_div.appendChild(card_lower_half_div);

    // add card to content-library for correct category
    category_div.appendChild(item_card_div);

    // add item inventory and cart count into local storage
    if (!localStorage.getItem(item_name+'_inv')) {
        console.log(item_stock);
        localStorage.setItem(item_name+'_inv', Number(item_stock));
        if (!localStorage.getItem("total")){
            localStorage.total = 0;
            document.getElementById('cart-total-count').innerHTML = localStorage.total;
        } 
    }
    // only add to local storage if this item is not in the cart
    if (Number(item_cart) > 0 && !localStorage.getItem(item_name+'_cart')) {
        localStorage.setItem(item_name+'_cart', Number(item_cart));
        var itemPrice = Number(item_price.split("/")[0].replace("$", ""));
        localStorage.setItem(item_name+'_price', itemPrice);
        // add cart total items into local storage in case it doesn't exist
        if (localStorage.getItem("total")){
            // display number of items in cart on page
            localStorage.total = Number(localStorage.total) + 1;
            document.getElementById('cart-total-count').innerHTML = localStorage.total;
        }            
    } else {
        // item is added to localStorage, get value to dsiplay from there
        if (pageName != "candy" && pageName != "snacks")
            p_cart_count.innerHTML = Number(localStorage.getItem(item_name+'_cart'));
    }
}


function refreshDateTime() {
    let date = new Date();
    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0");
    document.getElementById('date-holder').innerHTML = month+"/"+day+"/"+date.getFullYear();
    document.getElementById('time-holder').innerHTML = date.toLocaleTimeString();
}   
setInterval(refreshDateTime, 1000);

function initCart() {

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(cartXMLString,"text/xml");  

    var cart_xml = xmlDoc.getElementsByTagName("cart");
    document.getElementById('cart-total-count').innerHTML = Number(cart_xml.getElementsByTagName("total")[0].childNodes[0].nodeValue);
}

function initDiscount() {
    localStorage.discount = 0;
    localStorage.code_student = 0;
    localStorage.code_unemployed = 0;
    localStorage.code_veteran = 0;
}

function cartInit() {
    if (localStorage.total) {
        var totalCount = 0;
        var totalAmount = 0;
        var cartTable = document.getElementById('cart-table');
        var searchRegExp = /\_/g;

        for (var j = 0; j < localStorage.length; j++) {
            if (localStorage.key(j).includes("_price")) {
                var item = localStorage.key(j).replace("_price", "");
                var newItemRow = cartTable.insertRow(1);
                var itemNameCell = newItemRow.insertCell(0);
                var itemPriceCell = newItemRow.insertCell(1);
                var itemQtyCell = newItemRow.insertCell(2);
                var itemAmtCell = newItemRow.insertCell(3);

                itemNameCell.innerHTML = item.replace(searchRegExp, " ");
                var price = Number(localStorage.getItem(item+"_price"));
                var count = Number(localStorage.getItem(item+"_cart"));
                itemPriceCell.innerHTML = "$"+price;
                itemQtyCell.innerHTML = count;
                totalCount += count;
                itemAmtCell.innerHTML = "$"+(price*count).toPrecision(3);
                totalAmount += price*count;
            }
        }

        // update totals
        var totalQty = document.getElementById('cart-total-qty');
        var totalAmt = document.getElementById('cart-total-amount');

        totalQty.innerHTML = totalCount;
        totalAmt.innerHTML = "$"+totalAmount.toPrecision(3);
    }
}

function validateInputs() {
    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
    let phoneNum = document.getElementById('phone').value;
    let email = document.getElementById('email').value;
    // get the selected gender
    let genderGroup = document.getElementsByName('gender');
    var checkedGender = Array.from(genderGroup).find(
        (radio) => radio.checked
    );
    let comment = document.getElementById('comment').value;

    let alphaRegex = /^[A-Z][a-zA-Z]+$/;
    let phoneRegex = /^\(\d{3}\)\d{3}\-\d{4}$/;

    let errorMsg = "";

    if (alphaRegex.test(fname) && alphaRegex.test(lname) && fname!==lname && phoneRegex.test(phoneNum)
        && email.includes("@") && email.includes(".") && checkedGender != null && comment.length >= 10
    ) {
        alert('continue');
    }
    else {
        if (!alphaRegex.test(fname)){
            errorMsg += "Please ensure the first name contains only alphabets and begins with a capital letter\n";
        }
        if (!alphaRegex.test(lname)){
            errorMsg += "Please ensure the last name contains only alphabets and begins with a capital letter\n";
        }
        if (fname===lname){
            errorMsg += "Please ensure the first name and last name are not the same\n";
        }
        if (!phoneRegex.test(phoneNum)) {
            errorMsg += "Please ensure the phone number is entered in the format (XXX)XXX-XXXX\n";
        }
        if (!email.includes("@") || !email.includes(".")) {
            errorMsg += "Please ensure the email contains an @ and .\n";
        }
        if (checkedGender == null) {
            errorMsg += "Please select a gender\n";
        }
        if (comment.length < 10) {
            errorMsg += "Please add more information in the comment";
        }
        alert(errorMsg);
    }
}

function openDropDown() {
    let dropDownField = document.getElementById('filterDropDown');
    let currentDisplay = dropDownField.style.display;
    if (currentDisplay == 'none')
        dropDownField.style.display = 'block';
    else
        dropDownField.style.display = 'none';
}

function showCategory(category) {
    let categoryInput = document.getElementById('typeDropDown');

    if (category != 'All') {
        let otherDivs = document.getElementsByClassName('content-library');
        for (var i=0; i < otherDivs.length; i++) {
            otherDivs[i].style.display = 'none';
        }
        document.getElementsByClassName(category)[0].style.display = 'block';
    }
    else {
        let allDivs = document.getElementsByClassName('content-library');
        for (var i=0; i < allDivs.length; i++) {
            allDivs[i].style.display = 'block';
        }
    }

    categoryInput.value = category;
}

function addToCart(item) { 
    var itemCart = item + '_cart';
    var itemInv = Number(localStorage.getItem(item + '_inv'));

    // check if sufficient inventory exists
    if (itemInv > 0) {
        var currentItemCountInCart = Number(localStorage.getItem(itemCart));

        if (localStorage.getItem(itemCart)) {
            localStorage.setItem(itemCart, currentItemCountInCart+1);
        } else {
            localStorage.setItem(itemCart, 1);
            // set price for item
            var itemPrice = document.getElementsByClassName('card-price '+item)[0].innerText;
            itemPrice = Number(itemPrice.split("/")[0].replace("$", ""));
            localStorage.setItem(item+'_price', itemPrice);
            localStorage.setItem(item+'_page', pageFullPath);
            localStorage.total = Number(localStorage.total) + 1;
        }
        localStorage.setItem(item+'_inv', itemInv-1);
    }
    else {
        alert('Sorry we are out of inventory for this item');
    }
    

    document.getElementsByClassName("cart-count "+item)[0].innerHTML = localStorage.getItem(itemCart);
    document.getElementById('cart-total-count').innerHTML = localStorage.total;

    console.log(localStorage);
    /*
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlString,"text/xml"); 

    var fresh_prods = xmlDoc.getElementsByTagName("item");
    var cart_total = Number(xmlDoc.getElementsByTagName("cart")[0].getElementsByTagName("total")[0].childNodes[0].nodeValue);
    
    for (i=0; i<fresh_prods.length; i++) {
        var item_name_xml = fresh_prods[i].getElementsByTagName("name")[0].childNodes[0].nodeValue.toLowerCase();
        if (item_name_xml == item){
            var item_inv = Number(fresh_prods[i].getElementsByTagName("stock")[0].childNodes[0].nodeValue);
            var item_cart = Number(fresh_prods[i].getElementsByTagName("cart")[0].childNodes[0].nodeValue);
            console.log(item_name_xml, " inv: "+item_inv+" cart: "+item_cart);

            if (item_inv > 0) {
                if (item_cart == 0) {
                    cart_total += 1;
                    xmlDoc.getElementsByTagName("cart")[0].getElementsByTagName("total")[0].childNodes[0].nodeValue = cart_total;
                }
                item_cart += 1;
                item_inv -= 1;
                fresh_prods[i].getElementsByTagName("cart")[0].childNodes[0].nodeValue = item_cart;
                fresh_prods[i].getElementsByTagName("stock")[0].childNodes[0].nodeValue = item_inv;
                xmlString = new XMLSerializer().serializeToString(xmlDoc);
                
                // update the page
                document.getElementsByClassName("cart-count "+item)[0].innerHTML = item_cart;
                document.getElementById('cart-total-count').innerHTML = cart_total;
            }
            else {
                alert('Sorry we are out of stock of '+item);
            }
        }    
    }  
    */
}

function addNumToCart(item) {
    var itemCart = item + '_cart';
    var itemInv = Number(localStorage.getItem(item + '_inv'));
    var itemQty = Number(document.getElementById(item+"_input").value);

    // check if sufficient inventory exists
    if (itemInv > itemQty) {
        var currentItemCountInCart = Number(localStorage.getItem(itemCart));

        if (localStorage.getItem(itemCart)) {
            localStorage.setItem(itemCart, currentItemCountInCart+itemQty);
        } else {
            localStorage.setItem(itemCart, itemQty);
            // set price for item
            var itemPrice = document.getElementsByClassName('card-price '+item)[0].innerText;
            itemPrice = Number(itemPrice.split("/")[0].replace("$", ""));
            localStorage.setItem(item+'_price', itemPrice);
            localStorage.setItem(item+'_page', pageFullPath);
            localStorage.total = Number(localStorage.total) + 1;
        }
        localStorage.setItem(item+'_inv', itemInv-itemQty);
        document.getElementById(item+"_input").value = "";
    }
    else {
        alert('Sorry we are out of inventory for this item');
    }
    
    document.getElementById('cart-total-count').innerHTML = localStorage.total;

    console.log(localStorage);
}

function searchForItem() {
    
    if (document.getElementById('prodSearch').value ) {
        var itemName = document.getElementById('prodSearch').value.toLowerCase();
        console.log(itemName);
        var resultItems = document.getElementsByClassName("cards "+itemName);
        var catHeaders = document.getElementsByClassName("category heading");
        let otherDivs = document.getElementsByClassName("cards");
        let alphaRegex = /^[a-zA-Z]+$/;
        console.log(resultItems);
        
        if (resultItems.length == otherDivs.length) {            
            alert("Please enter the item name to search");
        }
        else {
            // ensure only alphabets are allowed
            if (alphaRegex.test(itemName)){
                
                if (resultItems.length == 0) {
                    alert(itemName+" was not found in our inventory for this category");
                }
                else {
                    // remove category headings
                    for (var c=0; c < catHeaders.length; c++) {
                        catHeaders[c].style.display = 'none';
                    }
                
                    // remove all cards
                    for (var i=0; i < otherDivs.length; i++) {
                        otherDivs[i].style.display = 'none';
                    }
    
                    // show only search result cards
                    for (var j=0; j < resultItems.length; j++) {
                        if (localStorage.getItem(itemName+"_inv") && localStorage.getItem(itemName+"_inv") > 0)
                            resultItems[j].style.display = 'block';
                        else {
                            alert(itemName+" is out of stock");
                            break;
                        }
                    } 
                }
            }
            else {
                alert("Please enter only alphabets");
            }
        }   
    }
}

function startOfferQuiz() {
    document.getElementById('quiz-q1').style.display = 'block';
    document.getElementById('special-offer-btn').style.display = 'none';
    // start timer 
    localStorage.startTime = performance.now();
}

function displayQuestion(quesID) {
    var quesDiv = document.getElementById(quesID);
    quesDiv.style.display = 'block';
    // hide previous ques
    var prevQuesID = Number(quesID.charAt(quesID.length-1)) - 1;
    var prevQuesDiv = document.getElementById("quiz-q"+prevQuesID);
    prevQuesDiv.style.display = 'none';
}

function applyDiscount(discountCode, nextQues) {
    let answerGroup = document.getElementsByName(discountCode);
    var checkedAns = Array.from(answerGroup).find(
        (radio) => radio.checked
    );
    if (checkedAns == null) {
        alert("Please select answer or skip this question");
    }
    else {
        if (discountCode == "student" && checkedAns.value == 'yes') {        
            localStorage.discount = Number(localStorage.discount) + 10;
            localStorage.code_student = 1;
        }
        else if (discountCode == "unemployed" && checkedAns.value == 'yes') {
            localStorage.discount = Number(localStorage.discount) + 15;
            localStorage.code_unemployed = 1;
        }
        else if (discountCode == "vet" && checkedAns.value == 'yes') {
            localStorage.discount = Number(localStorage.discount) + 20;        
            localStorage.code_veteran = 1;
        }
        if (nextQues == "offer")
            displayOffer();
        else
            displayQuestion(nextQues);
    }    
}

function displayOffer() {
    // end timer
    localStorage.endTime = performance.now();
    // remove questions
    var lastQues = document.getElementById('quiz-q3');
    lastQues.style.display = 'none';
    // display the final offer
    var discOffer = document.getElementById('offer')
    discOffer.style.display = 'block';
    var reasonsDiv = document.getElementById('offer-reasons');
    var amountDiv = document.getElementById('offer-amount');
    for (var i=0; i < localStorage.length; i++) {
        if (localStorage.key(i).includes('code_') && Number(localStorage.getItem(localStorage.key(i))) == 1) {
            var discCode = localStorage.key(i).split("_")[1];
            reasonsDiv.innerHTML += "<br>"+"- "+discCode ;
        }
    }
    amountDiv.innerHTML += '<b>' +localStorage.discount + "</b> discount!"
    // display the time spent
    var timeDiv = document.getElementById('time-spent');
    var timeInS = Number(localStorage.endTime) - Number(localStorage.startTime);
    timeInS = timeInS/1000;
    timeDiv.innerHTML += timeInS+"s on this quiz!"
}

function checkoutCart() {

    var promises = [];

    for (var j = 0; j < localStorage.length; j++) {
        if (localStorage.key(j).includes("_price")) {
            (function() {
                var item_name = localStorage.key(j).replace("_price", "");
                var item_name_cap = item_name[0].toUpperCase() + item_name.substring(1, item_name.length);
                var count = Number(localStorage.getItem(item_name + "_cart"));
                var data_page = localStorage.getItem(item_name + "_page");
                
                var ext = data_page.split('.')[1];
                var promise;

                if (ext == 'xml') {
                    promise = $.ajax({
                        type: 'GET',
                        url: data_page,
                        dataType: 'xml',
                        async: false,
                        success: function(xml) {
                            const product = $(xml).find('item:has(name:contains("' + item_name_cap + '"))');
                            console.log("Changing " + product);
                            const countElement = product.find('stock');
                            if (countElement.length > 0) {
                                newStock = parseInt(countElement.text()) - parseInt(count);
                                countElement.text(newStock);
                                const updatedXmlString = new XMLSerializer().serializeToString(xml);
                                $.ajax({
                                    type: 'POST',
                                    url: 'cart_save.php',
                                    data: {
                                        cartdata: updatedXmlString,
                                        filePath: data_page
                                    },
                                    success: function() {
                                        console.log('XML updated successfully');
                                    },
                                    error: function(error) {
                                        console.error('Error updating XML: ' + error);
                                    }
                                });
                            } else {
                                console.error('Product not found');
                            }
                        },
                        error: function(error) {
                            console.error('Error loading XML: ' + error);
                        }
                    });
                } else {
                    promise = $.ajax({
                        type: 'GET',
                        url: data_page,
                        dataType: 'json',
                        async: false,
                        success: function(data) {
                            const product = Object.values(data).find(item => item.ref_name === item_name);
                            if (product) {
                                product.stock -= parseInt(count);
                                console.log(product);
                                $.ajax({
                                    type: 'POST',
                                    url: 'cart_save.php',
                                    data: {
                                        cartdata: JSON.stringify(data),
                                        filePath: data_page
                                    },
                                    success: function() {
                                        console.log('JSON updated successfully');
                                    },
                                    error: function(error) {
                                        console.error('Error updating JSON: ' + error);
                                    }
                                });
                            } else {
                                console.error('Item not found');
                            }
                        },
                        error: function(error) {
                            console.error('Error loading JSON: ' + error);
                        }

                    });
                }
                promises.push(promise);
            })();
        }
    }

    $.when.apply($, promises).then(function() {
        cancelTransaction();
    }).fail(function() {
        console.error("One or more AJAX requests failed");
    });
    
}
    

function cancelTransaction() {
    // clear local storage
    localStorage.clear();

    // redirect to home page
    window.location.href = "index.html";
}