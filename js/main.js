const firebaseConfig = {
    apiKey: "AIzaSyA4dBuR0Niim2lIq_aCS0Foq32bNm1srWM",
    authDomain: "blog-school-adc21.firebaseapp.com",
    projectId: "blog-school-adc21",
    storageBucket: "blog-school-adc21.appspot.com",
    messagingSenderId: "529262083138",
    appId: "1:529262083138:web:256e6504413f37075581db",
    measurementId: "G-FMCWJMH0X8"
  };

function mobileMenu() {
    var x = document.getElementById("navbar");
    if (x.className === "") {
        x.className = "mobile";
    } else {
        x.className = "";
    }
}

const yearElement = document.getElementById('year');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const postareBtn = document.getElementById('postare-btn');
const salutare = document.getElementById('username');

let user = null;
let admins = ["GOTGwTwSNCODEWfJrx28Li7EYJs1"];


// setam bazele firebase, ne conectam la serviciu
firebase.initializeApp(firebaseConfig);

// referinta la serviciu de autentificare
const auth = firebase.auth();

// referinta la baza de date
const db = firebase.firestore();

//referinta la colectie de postari din BD
const postariDb = db.collection('postari');

// alegem providerul de logare -> Google
const provider = new firebase.auth.GoogleAuthProvider();

loginBtn.onclick = function() {
    console.log("logare...");
    auth.signInWithPopup(provider).then(function() { window.location.reload(); });
}

logoutBtn.onclick = function() {
    auth.signOut();
    window.location.reload();
}

function isAdmin() {
    let admin;

    if (user == null)
       return false;

    admin = admins.includes(user.uid); // true or false   verifica daca persoana data e admin

    return admin; 
}

function formatDate(time) {
    let date  = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let resuylt = day + "-" + month + "-" + year;

    return resuylt;
}
 
auth.onAuthStateChanged(function(fuser) {
    user = fuser;
    console.log(user);
    if (user != null) {
        // logat in sistem
        logoutBtn.style.display = "block";
        loginBtn.style.display = "none";

        salutare.innerHTML = "Salutare, " + user.displayName

        if(isAdmin() == true) {
            postareBtn.style.display = 'block';
        }
        else {
            postareBtn.style.display = 'none'
        }
    }

    else {
        // nu e logat in sistem
        loginBtn.style.display = "block";
        logoutBtn.style.display = "none";
        postareBtn.style.display = 'none';
    }

    document.querySelector('body').style.display = "block";
})  

if (yearElement) {
    let date = new Date();
    
    yearElement.innerHTML = date.getFullYear() + " ©";
}

