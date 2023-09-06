function signUp() {
    var test = true;

    var firstName = document.getElementById("firstName").value;

    // verification(firstName.length <3,"firstNameError","First Name must have at least 3 characters");

    if (firstName.length < 3) {
        document.getElementById("firstNameError").innerHTML = "First Name must have at least 3 characters";
        document.getElementById("firstNameError").style.color = "red";
        test = false;
    } else {
        // il faut mettre le else si nn le msg d'erreur va etre tjrs affichée
        document.getElementById("firstNameError").innerHTML = "";
    }

    var lastName = document.getElementById("lastName").value;

    if (lastName.length < 5) {
        document.getElementById("lastNameError").innerHTML = "First Name must have at least 5 characters";
        document.getElementById("lastNameError").style.color = "red";
        test = false;
    } else {

        document.getElementById("lastNameError").innerHTML = "";
    }


    var email = document.getElementById("email").value;
    var validationEmail = validateEmail(email);
    // il faut pas que le var a le meme nom de la fonction
    // quand on ecirs le nom de var c adire que c true si on veut le false on met le point !
    // car on generel à l'interieur de if on met toujours les erreurs
    // si non on peut ne pas utiliser les variables on peut utilsier la fonction if (!validateEmail(email)) et ca fonctionne
    if (!validationEmail) {
        document.getElementById("emailError").innerHTML = "Invalid Email";
        document.getElementById("emailError").style.color = "red";
        test = false;
    } else {
        document.getElementById("emailError").innerHTML = "";

    }


    if (emailExist(email)) {
        document.getElementById("emailExistError").innerHTML = " Email exist";
        document.getElementById("emailExistError").style.color = "red";
    } else {
        document.getElementById("emailExistError").innerHTML = ""

    }

    var password = document.getElementById("password").value;
    // c tres important il faut que le variable de la fonction soit la meme que la var 
    if (!checkPassword(password)) {
        document.getElementById("passWordError").innerHTML = "Invalid password";
        document.getElementById("passWordError").style.color = "red";
        test = false;
    } else {
        passWordError
        document.getElementById("passWordError").innerHTML = "";

    }

    var ConfirmPassword = document.getElementById("ConfirmPassword").value;
    if (password != ConfirmPassword) {
        document.getElementById("confirmPasswordError").innerHTML = "Invalid confirmpassword";
        document.getElementById("confirmPasswordError").style.color = "red";
        test = false;
    } else {
        document.getElementById("confirmPasswordError").innerHTML = " ";
    }
    var telephone = document.getElementById("telephone").value;
    // c une fonction predefinie avec un retour de true et false
    if (!isNaN(telephone) && telephone.length == 8) {
        document.getElementById("telError").innerHTML = " ";
    } else {
        // il faut que la variable est le meme ds la fonction 
        document.getElementById("telError").innerHTML = "Invalid tel number";
        document.getElementById("telError").style.color = "red";
        test = false;
    }


    var idUser = JSON.parse(localStorage.getItem("iduser") || "10");
    // console.log(firstName,lastName,email,password,ConfirmPassword,telephone);

    // stockage des données
    if (test) {
        // pour declarer les objets on ecrit var user {} c {} c adire que c un objet 
        // les atrributs on peut les ecrire comme on veut mais pour eviter les erreurs on les ecrit les memes 
        // c toujours , sauf la derniere sans rien 
        var user = {
            id: idUser,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            tel: telephone,
            //  c un attribut statique c pas dynamique comme les autres
            role: "user"
        }
        // console.log(user);
        // creer le tableau d'objet (il faut le convertir en tableau d'objet via la methode parse)
        var users = JSON.parse(localStorage.getItem("users") || "[]");
        //    pour ajouter les users
        users.push(user);
        //    ici c pour modifier les objets en string pour revenir au local storge
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("iduser", idUser + 1);
        location.replace("login.html");
        // reload pour reload la page 
        // location.reload();
        //    console.log(users);
    }



}
// toujours il faut mettre la fonction derriere la fonctione et non dedans si nn ca ne fonctionne plus on ne peux pas mettre une fonction à l'interieur d'une autre

function insertAdmins(params) {
    var admin1 = {
        id: 1,
        firstName: "admin1",
        lastName: "admin1",
        email: "admin1@gmail.com",
        password: "Admin1@22",
        tel: "50670298",
        role: "admin"
    }

    var admin2 = {
        id: 2,
        firstName: "admin2",
        lastName: "admin2",
        email: "admin2@gmail.com",
        password: "Admin2@22",
        tel: "50670298",
        role: "admin"
    }

    var admin3 = {
        id: 3,
        firstName: "admin3",
        lastName: "admin3",
        email: "admin3@gmail.com",
        password: "Admin3@22",
        tel: "50670298",
        role: "admin"
    }

    var users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(admin1, admin2, admin3);
    localStorage.setItem("users", JSON.stringify(users));
    // adminsadded ne necessite pas une variable car c une key 
    localStorage.setItem("adminsAdded", true);


}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function checkPassword(str) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    return re.test(str);
}

// ds la fonction il ne faut jamais ecrire les variables entre deux cotes 

function verification(condition, idSpan, msgError) {
    // pn va declarer le variable test ici et il va return test et puis on va declarer une variable sur chaque attribut qui va recuperer cette variable test 
    var test = true;
    // il faut pas faire les variables en deux "" par ce que ca change le variable a chaque fois 
    if (condition) {
        document.getElementById(idSpan).innerHTML = msgError;
        document.getElementById(idSpan).style.color = "red";
        test = false;
    } else {

        document.getElementById(idSpan).innerHTML = "";
    }

    return test;
}

function emailExist(email) {
    var exist = false;
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            exist = true;
        }
        return exist;
    }

}

function addProduct() {



    var productName = document.getElementById("productName").value;

    var test1 = verification(productName.length < 3, "productNameError", "product name must have at least 3 caracters");


    var price = document.getElementById("price").value;

    var test2 = verification(price <= 0, "priceError", "Error Price");

    var stock = document.getElementById("stock").value;

    var test3 = verification(stock < 10, "stockError", "stock must be at least 10");


    var category = document.getElementById("category").value;

    var test4 = verification(category.length = 0, "categoryError", "the category must not be empty");
    // on a recupere l'image img c l'image et puis le finalImg pour recupere l image car au debut le localstorge recupere que par cette maniere 
    var img = document.getElementById("img").value;
    // fonction quel'on a fait pour mettre le chemin de l'image et les antislash par des slash 
    var finalImg = replaceCh(img);
    console.log(productName, price, stock, category);


    if (test1 && test2 && test3 && test4) {

        var idProduct = JSON.parse(localStorage.getItem("idProduct") || "1");
        var product = {
            id: idProduct,
            productName: productName,
            price: price,
            stock: stock,
            category: category,
            img: finalImg
        }
        var products = JSON.parse(localStorage.getItem("products") || "[]");

        products.push(product);

        localStorage.setItem("products", JSON.stringify(products));

        localStorage.setItem("idProduct", JSON.stringify(idProduct + 1));

        location.reload();
    }
}

function displayUsers() {
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    // balise de table on le met ds un backtic comme c une chainde de caractere 
    // altgr7 pour creer une backtick
    var usersTable = `<table class="table table-dark">
   <thead>
     <tr>
       <th scope="col">First Name</th>
       <th scope="col">Last Name</th>
       <th scope="col">Email</th>
       <th scope="col">TEL</th>
       <th scope="col">role</th>
       <th scope="col">Action</th>
     </tr>
   </thead>
   <tbody>`;



    for (let i = 0; i < users.length; i++) {

        usersTable = usersTable + `<tr>
    <td scope="row">${users[i].firstName} </td>
    <td>${users[i].lastName} </td>
    <td>${users[i].email}</td>
    <td>${users[i].tel}</td>
    <td>${users[i].role}</td>
    <td>
        <button type="button" class="btn btn-warning" onclick="editUser(${users[i].id})">Edit</button>
        <button type="button" class="btn btn-danger" onclick="deleteUser(${users[i].id})">Delete</button>

    </td>
  </tr>`

    }
    usersTable = usersTable + `  </tbody>
</table>`;
    // <!-- c à partir de bootstrap button -->
    // donc on va utiliser innerHtml pour envoyer le code de JS vers HTML et au html on met la fonction


}
function login() {

    //   on recupere les inputs  // 
    // on recupere les info introduites par l'utilisateur 

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    // recuperer le tableau d'objets 

    var users = JSON.parse(localStorage.getItem("users") || "[]");
    // parcourir le tableau pour chercher l'utilisateur 
    var findedUser;

    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password) {

            findedUser = users[i];
        }

    }
    // console.log(findedUser);
    if (findedUser) {
        // user exist 
        document.getElementById("loginError").innerHTML = " ";
        // pour enregistrer le user qui est conncté on va registrer un nouveau key pour ce qui est conncte
        // on va modifier ce qui va etre affiche au niveau de findedUser que l'id S affiche
        // donc on va supprimer Json.stringify car on l'a utilise que si on a des objet , ds ce cas on a que l'id dnc on elimine stringify 
        localStorage.setItem("connectedUser", findedUser.id);
        switch (findedUser.role) {
            case "admin":
                location.replace("dashboardAdmin.html")
                break;s

            case "user":
                // il faut mettre la page de la products et non index (utilite sur la fonction add to basket)
                location.replace("Products.html")
                break;
        }


    } else {
        // user not exist 
        document.getElementById("loginError").innerHTML = "wrong informations";
        document.getElementById("loginError").style.color = "red";
    }

}
// on va utiliser le key pour la fonction soit generique 
function searchById(id, key) {

    // recuperation du tableau on peut le nommer comme on veut cette variable 
    var tab = JSON.parse(localStorage.getItem(key) || "[]");
    // declaration d'une variable pour sauvegarder le retour a la fin 
    var object;

    for (let i = 0; i < tab.length; i++) {
        // 
        if (tab[i].id == id) {

            object = tab[i];
        }

    }
    // on veut le object qui est le user si on veut utiliser la fonction on ecris searchById(11,"users")et il va donner le user 
    return object;
}

searchById(11, "users");


function deleteUser(id) {

    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var pos;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {

            pos = i;
        }
    }
    users.splice(pos, 1);
    localStorage.setItem("users", JSON.stringify(users));
    location.reload();

}

function editUser(id) {
    // on a utiliser la fonction searchById pour avoir users et valeur ds le formulaire de tel avec value =user.tel et ca devient dynamique
    // on met user.id par ce que il faut appeler par id si nn rien ne modifie
    var user = searchById(id, "users");
    var editUserForm = `<div class="login_form_inner">
<h3>Edit User</h3>
<div class="row login_form"  id="contactForm" novalidate="novalidate">
    <!-- onblur et onfocus c pour que l'ecriture se partir au moment de l'ecriture -->

    <div class="col-md-12 form-group">
        <input type="tel" class="form-control" id="telephone" value="${user.tel}" name="name" placeholder="Telephone" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Telephone'">
        <span id="telError"></span>
    </div>
    
    <div class="col-md-12 form-group">
        <button type="submit" value="submit" class="primary-btn" onclick="confirmEditUser(${user.id})">confirm edit</button>
    
    </div>
</div>
</div>`;
    // on a utliser le backtick c parce que on veut mettre une fonction dynamique a chaque fois quand clique il affiche le formulaire donc on ne peut pas le coller en HTML 
    // dnc on a utilise le backtick et apres innerhtml pour le msg 
    document.getElementById("editUserForm").innerHTML = editUserForm;


}

// homework : controle de saisie + clique sur confirm si on veut changer le numero avec une fonction confirmEdit

function confirmEditUser(id) {

    // .value pour recuperer la valeur 
    // on utilise break car on va rechercher une seule valeur id c unique 
    var newTel = document.getElementById("telephone").value;

    if (!isNaN(newTel) && newTel.length == 8) {
        document.getElementById("telError").innerHTML = " ";

        var users = JSON.parse(localStorage.getItem("users") || "[]");
        // ici il faut que id soit egale a l id de la fonction (variable de debut)
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                users[i].tel = newTel;
                break;
            }

        }

        localStorage.setItem("users", JSON.stringify(users));

        location.reload();

    } else {

        document.getElementById("telError").innerHTML = "Invalid tel number";
        document.getElementById("telError").style.color = "red"

    }
}


// on va faire une fonction qui prend des products de localstorge et faire l'affichage 
function displayShop() {

    var products = JSON.parse(localStorage.getItem("products") || "[]");
    // on va faire une backtick vide car tjrs on a le meme principe la partie fixe et puis on concatenne puisque on n'a pas de partie fixe on le laisse vide 
    // on declare une variable pour mettre le code html 
    // c toujours lorsqu'on veut un truc dynamique on copie le code html et on le mets entre backtick
    var shop = '';

    for (let i = 0; i < products.length; i++) {
        shop = shop + ` <div class="col-lg-3 col-md-6">
    <div class="single-product">
        <img class="img-fluid" src="${products[i].img}" alt="">
        <div class="product-details">
            <h6>${products[i].productName}</h6>
            <div class="price">
                <h6>$ ${products[i].price}</h6>
                
            </div>
            <div class="stock">-
            <h6> ${products[i].stock}</h6>
            
        </div>
            
        <div class="category">
        <h6>${products[i].category}</h6>    
    </div> 
    </div>
    </div>
    <button type="button" class="btn btn-primary btn-sm" onclick= "addToBasket(${products[i].id})">Add to bascket</button>
    </div>
`;
    }
    document.getElementById("shop").innerHTML = shop;

}

function addToBasket(idProduct) {

    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

    if (connectedUser) {
        location.replace("productInfos.html");
        localStorage.setItem("prToReserve", idProduct);

    } else {

        // si il n'est pas connectee il faut qu'il passe a connecter 
        location.replace("login.html");
    }

}

// lorsque on veut un affichage on fait une fonction autre pour l'affichage 

function productInfo() {
    var prToReserve = localStorage.getItem("prToReserve");

    var product = searchById(prToReserve, "products");
    // on a un seule produit donc on n'a pas une boucle for et on n'a   pas besoin de parse
    var prBloc = `<div class="s_product_text">
   <h3>${product.productName}</h3>
   <h2>$ ${product.price}</h2>
   <h2> ${product.stock} </h2>
   <ul class="list">
     <li><a class="active" href="#"><span>${product.category}</span> : Household</a></li>
     <li><a href="#"><span>Availibility</span> : In Stock</a></li>
   </ul>
   <p>Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for
     something that can make your interior look awesome, and at the same time give you the pleasant warm feeling
     during the winter.</p>
   <div class="product_count">
     <label for="qty">Quantity:</label>
     <input type="number" name="qty" id="qty" class="input-text qty">
     <span id="qtyError"></span>
   </div>
   <div class="card_area d-flex align-items-center">
   
     <button class="primary-btn" onclick="validateQuantity(${product.stock})">Order</a>
    
   </div>
 </div>
   `;

    document.getElementById("prBloc").innerHTML = prBloc;

}


function validateQuantity(stock) {

    var qty = document.getElementById("qty").value;
    var prToReserve = localStorage.getItem("prToReserve");
    var connectedUser = localStorage.getItem("connectedUser");
    if (qty > stock || qty <= 0) {
        document.getElementById("qtyError").innerHTML = "invalid qty";
        document.getElementById("qtyError").style.color = "red";
    } else {
        var idOrder = JSON.parse(localStorage.getItem("idOrder") || "1");
        var orders = JSON.parse(localStorage.getItem("orders") || "[]");
        var order = {
            id: idOrder,
            idProduct: prToReserve,
            idUser: connectedUser,
            qty: qty,
            statut: "on hold"

        }

        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));
        localStorage.setItem("idOrder", idOrder + 1);
        var products = JSON.parse(localStorage.getItem("products") || "[]");
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == prToReserve) {

                products[i].stock = products[i].stock - qty;
                break;
            }

        }
        localStorage.setItem("products", JSON.stringify(products));
        location.replace("myBasket")
    }


}
// on fait break sauf si on recherche une seule chose seulement si on a 5 choses a rechercheer on fait pas break 


function getFromLS(key) {
    return JSON.parse(localStorage.getItem("key") || "[]");
}


function getMyOrders() {
    var orders = JSON.parse(localStorage.getItem("orders") || "[]");
    var connectedUser = localStorage.getItem("connectedUser");
    var myOrders = [];
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].idUser == connectedUser) {
            myOrders.push(orders[i]);
        }

    }

    return myOrders
}




function displayCart() {

    var myOrders = getMyOrders();
    // on a laisser la partie statique sur html l'autre fois on a fait une partie statique entre baktick car on a pris le code a partir de bootstrap
    var myOrdersBloc = "";

    for (let i = 0; i < myOrders.length; i++) {
        var product = searchById(myOrders[i].idProduct, "products")
        myOrdersBloc = myOrdersBloc + `
    
        <tr>
            <td>
                <div class="media">
                    <div class="d-flex">
                        <img src="img/cart.jpg" alt="">
                    </div>
                    <div class="media-body">
                        <p>${product.productName}</p>
                    </div>
                </div>
            </td>
            <td>
                <h5>$ ${product.price}</h5>
            </td>
      
            <td>
                <h5> ${myOrders[i].qty}</h5>
            </td>
            <td>
                <h5>$ ${myOrders[i].qty * product.price}</h5>
            </td>
            <td>
            <button type="button" class="btn btn-danger" onclick="deleteOrder(${myOrders[i].id})">Delete</button>
            </td>
            <td>
            <button type="button" class="btn btn-success" onclick="ConfirmOrder(${myOrders[i].id})">Confirm</button>
            </td>
        </tr> `

    }
    document.getElementById("myOrdersBloc").innerHTML = myOrdersBloc;
}



function ConfirmOrder(idOrder) {
    var orders = JSON.parse(localStorage.getItem("orders") || "[]");

    for (let i = 0; i < orders.length; i++) {

        if (orders[i].id == idOrder) {

            orders[i].statut = "confirmed"
            //  on break par ce que on cherche une seule chose et on l'a trouvé deja 
            break;
        }

    }
    localStorage.setItem("orders", JSON.stringify(orders));
}

function deleteOrder(id) {
    var orders = JSON.parse(localStorage.getItem("orders") || "[]");
    // le id c le meme id de search by id c le meme que le id de la fonction
    var order = searchById(id, "orders");
    var pos;
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id == id) {
            pos = i;
        }

    }
    orders.splice(pos, 1);

    localStorage.setItem("orders", JSON.stringify(orders));
    var products = JSON.parse(localStorage.getItem("products") || "[]");
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == order.idProduct) {
            products[i].stock = products[i].stock + Number(order.qty);
        }

    }

    localStorage.setItem("products", JSON.stringify(products));
    location.reload();
}





// il faut que les commandes recu au admin soit confirmé par le user dnc il faut ajouter une bouton confirm to my basket pour que la commande soit confirmée
function displayOrders() {

    var orders = JSON.parse(localStorage.getItem("orders") || "[]");
    var products = JSON.parse(localStorage.getItem("products") || "[]");

    var displayOrderBloc = `<table class="table table-dark">
<thead>
  <tr>
    <th scope="col">idOrder</th>
    <th scope="col">Product tName</th>
    <th scope="col">qty</th>
    <th scope="col">user Name</th>
    <th scope="col">tel</th>
    <th scope="col">email</th>
    <th scope="col">Action</th>
  </tr>
</thead>
<tbody>`
    for (let i = 0; i < orders.length; i++) {
        var user = searchById(orders[i].idUser, "users");
        var product = searchById(orders[i].idProduct, "products");
        if (orders[i].statut == "confirmed") {


            displayOrderBloc = displayOrderBloc + `
    <tr>
    <th scope="row">${orders[i].id}</th>
    <td>${product.productName}</td>
    <td>${orders[i].qty}</td>
    <td>${user.firstName}</td>
    <td>${user.tel}</td>
    <td>${user.email}</td>
    <td><button type="button" class="btn btn-danger"onclick="deleteOrderByAdmin(${orders[i].id})">Delete</button></td>
    </tr>`;
        }

    }
    displayOrderBloc = displayOrderBloc + `</tbody>
</table>`
    document.getElementById("displayOrderBloc").innerHTML = displayOrderBloc;


}

function deleteOrderByAdmin(id) {
    var orders = JSON.parse(localStorage.getItem("orders") || "[]");
    var order = searchById(id, "orders");
    var pos;
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id == id) {
            pos = i;
        }

    }
    orders.splice(pos, 1);

    localStorage.setItem("orders", JSON.stringify(orders));


    var products = JSON.parse(localStorage.getItem("products") || "[]");
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == order.idProduct) {
            products[i].stock = products[i].stock + Number(order.qty);
        }

    }

    localStorage.setItem("products", JSON.stringify(products));
    location.reload();



}
function getRooms() {
    var houses = JSON.parse(localStorage.getItem("houses") || "[]");
    var allRooms = [];
    for (let i = 0; i < houses.length; i++) {
        for (let j = 0; j < houses[i].rooms.length; j++) {
            allRooms.push(houses[i].rooms[j]);
        }
    }
    return allRooms;
}

function displayRoomsForAdmin() {
    var allRooms = getRooms()
    var roomsList = "";
    for (let i = 0; i < allRooms.length; i++) {

        var roomsList = roomsList + `
                <tr style="text-align: center;">
                              
                                <td>${allRooms[i].idHouse}</td>
                                <td>${allRooms[i].idRoom}</td>
                                <td>${allRooms[i].name}</td>
                                <td>${allRooms[i].capacity}</td>
                                <td>${allRooms[i].price}</td>
                                <td> 
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop" onclick="deleteRoom(${allRooms[i].idRoom})" >  Delete </button>
                                </td>
                </tr>`


    }

    document.getElementById("roomsList").innerHTML = roomsList;

}
function deleteRoom(idRoom) {
    var houses = JSON.parse(localStorage.getItem("houses") || "[]");
    var allRooms = [];

    for (let i = 0; i < houses.length; i++) {
        for (let j = 0; j < houses[i].rooms.length; j++) {
            allRooms.push(houses[i].rooms[j]);
        }
    }

    var pos;
    for (let i = 0; i < allRooms.length; i++) {
        if (allRooms[i].idRoom == idRoom) {
            pos = i;
            break;
        }
    }

    allRooms.splice(pos, 1);

    for (let i = 0; i < houses.length; i++) {
        for (let j = 0; j < houses[i].rooms.length; j++) {
            if (houses[i].rooms[j].idRoom == idRoom) {
                houses[i].rooms.splice(j, 1);
            }
        }
    }

    localStorage.setItem("houses", JSON.stringify(houses));
    alert("Room has been deleted!");
    location.reload();}
function displayProfile() {

    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var connectedUser = localStorage.getItem("connectedUser");
    var profileBloc = "";
    for (let i = 0; i < users.length; i++) {

        if (users[i].id == connectedUser) {
            profileBloc = profileBloc + `<h3>Welcome ${users[i].firstName}</h3>
        <div class="row login_form"  id="contactForm" novalidate="novalidate">
                       <div class="col-md-12 form-group">
                <input type="text" class="form-control" value="${users[i].firstName}" id="firstName" name="name" >
            <span id="firstNameError"></span>
            </div>
            <div class="col-md-12 form-group">
                <input type="text" class="form-control" value="${users[i].lastName}" id="lastName" name="name" >
                <span id="lastNameError"></span>
            </div>
            <div class="col-md-12 form-group">
                <input type="email" class="form-control" value="${users[i].email}" id="email" name="name" >
                <span id="emailError"></span>
                <span id="emailExistError"></span>
            </div>
           
            <div class="col-md-12 form-group">
                <input type="password" class="form-control" value="${users[i].password}" id="password" name="name" >
                <span id="passWordError"></span>
            </div>
            
            <div class="col-md-12 form-group">
                <input type="tel" class="form-control" value="${users[i].tel}" id="telephone" name="name" >
                <span id="telError"></span>
            </div>
            
            <div class="col-md-12 form-group">
                <button type="submit" value="submit" class="primary-btn" onclick="editProfile(${users[i].id})">Edit</button>
            
            </div>
        </div>`;
        }

    }

    document.getElementById("profileBloc").innerHTML = profileBloc;

}

function editProfile(id) {

    var newFirstName = document.getElementById("firstName").value;

    var test = verification(newFirstName.length < 3, "firstNameError", "Error");

    console.log(test);

    var newLastName = document.getElementById("lastName").value;

    var test1 = verification(newLastName.length < 5, "lastNameError", "Error");

    console.log(test1);

    var newEmail = document.getElementById("email").value;

    var test3 = verification(!validateEmail(newEmail), "emailError", "Error");

    console.log(test3);

    var newPassword = document.getElementById("password").value;

    var test4 = verification(!checkPassword(newPassword), "passWordError", "Error");

    console.log(test4);

    var newTel = document.getElementById("telephone").value;

    var test2 = verification(isNaN(newTel) || newTel.length != 8, "telError", "Error");

    console.log(test2);

    var users = JSON.parse(localStorage.getItem("users") || "[]");

    if (test && test1 && test2 && test3 && test4) {

        for (let i = 0; i < users.length; i++) {

            if (users[i].id == id) {

                users[i].firstName = newFirstName;

                users[i].lastName = newLastName;

                users[i].tel = newTel;

                users[i].email = newEmail;

                users[i].password = newPassword;

                break;

            }

        }

        localStorage.setItem("users", JSON.stringify(users));

        location.reload();

    }

}

function generateHeader() {

    var headerContent = "";
    var connectedUser = localStorage.getItem("connectedUser");
    // il faut que la condition soit apres connectedUser la condition si nn avant on n'est pas sure que le user est connectée 
    if (connectedUser) {
        var user = searchById(connectedUser, "users")
        if (user.role == "user") {

            headerContent = headerContent + `
    <li class="nav-item"><a class="nav-link" href="Products.html">Home</a></li>
    <li class="nav-item"><a class="nav-link" href="#">Welcome ${user.firstName}</a></li>
    <li class="nav-item"><a class="nav-link" href="PROFILE.html">Profile</a></li>	
    <li class="nav-item"><a class="nav-link" href="myBasket.html">Basket</a></li>				
    <li class="nav-item"><a class="nav-link" onclick="Logout()" href="#">logout</a></li>`;
        } else {
            headerContent = headerContent + `
    <li class="nav-item"><a class="nav-link" href="Products.html">Home</a></li>
    <li class="nav-item"><a class="nav-link" href="PROFILE.html">Profile</a></li>	
    <li class="nav-item"><a class="nav-link" href="add product.html">Add Product</a></li>				
    <li class="nav-item"><a class="nav-link" href="dashboardAdmin.html">Dashboard</a></li>
    <li class="nav-item"><a class="nav-link" onclick="Logout()" href="#">logout</a></li>`;

        }
    } else {
        headerContent = headerContent + `
    <li class="nav-item"><a class="nav-link" href="Products.html">Home</a></li>
    <li class="nav-item"><a class="nav-link" href="signup.html">Sign up</a></li>	
    <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>				
    <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>`;

    }

    document.getElementById("headerContent").innerHTML = headerContent;
}

function Logout() {

    localStorage.removeItem("connectedUser");
    location.replace("Products.html");


}
//  il faut copier le header dns toutes les pages poru que ca soit dynamique 



function replaceCh(ch) {
    // c a partir d'une page https://quickref.me/normalize-file-path-slashes c pour remplacer le antislash par slash 
    var newCh = ch.replace(/[\\/]+/g, '/');
    // puis on va faire le variable res pour remplacer me fakepath par le cheminde cable 
    var res = newCh.replace("fakepath", "Users/21650/Desktop/karma-master/karma-master/img");
    return res;
}

function searchProduct(evt) {
    var code = evt.keyCode;
    // on peut faire pour avoir les codees = les numeros des buttons du clavier par consolog 
    if (code == 13) {

        var categorySearch = document.getElementById("search_input").value;
        localStorage.setItem("categorySearch", categorySearch);
        location.replace("search.html");

    }

    // ici on ne peut pas utiliser le return car le return on ne le peut utiliser que par rappel a la fonction et donc ce cas on a un event dnc on ne peut pas le plsu faisable c de creer un key et faire un rappel a ce key 

}

// attention il faut pas que le html contient du form si nn la fonction ne va pas fonctionner 


function displaySearch() {
    var products = JSON.parse(localStorage.getItem("products") || "[]");
   var categorySearch=localStorage.getItem("categorySearch");
var result=[];

for (let i = 0; i < products.length; i++) {

if (products[i].category==categorySearch) {
    
result.push(products[i]);
}

}
var shop="";
 
for (let i = 0; i < result.length; i++) {
    shop = shop + ` <div class="col-lg-3 col-md-6">
    <div class="single-product">
        <img class="img-fluid" src="${result[i].img}" alt="">
        <div class="product-details">
            <h6>${result[i].productName}</h6>
            <div class="price">
                <h6>$ ${result[i].price}</h6>
                
            </div>
            <div class="stock">-
            <h6> ${result[i].stock}</h6>
            
        </div>
            
        <div class="category">
        <h6>${result[i].category}</h6>    
    </div> 
    </div>
    </div>
    <button type="button" class="btn btn-primary btn-sm" onclick= "addToBasket(${result[i].id})">Add to bascket</button>
    </div>`;

}

document.getElementById("shop").innerHTML=shop;

}