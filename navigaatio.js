//Navigaatio
function navFunction() { //luodaan function ylÃ¤navipalkille
    let navnav = document.getElementById("ylaNavi"); //luodaan muuttuja ja haetaan sille id:llÃ¤ oikea elementti
    if (navnav.className === "topnav") { // Jos nÃ¤ytÃ¶n koko pienenee niin tÃ¤llÃ¤ muutetaan millÃ¤ css class jatketaan
    navnav.className += " responsive";
} else {
    navnav.className = "topnav";
}
}

//Haetaan modal
var modal = document.getElementById("myModal");

//Haetaan nappula jolla modal avataan
var btn = document.getElementById("buy-button");

// Span elementti jolla suljetaan modal
var span = document.getElementsByClassName("close")[0];

// Kun nappia klikataan modal aukeutuu
btn.onclick = function() {
  modal.style.display = "block";
}

// Raksista suljetaan modal
span.onclick = function() {
  modal.style.display = "none";
}

// Jos modalin ulkopuolelta klikataan, modal sulkeutuu
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}