//Navigaatio
function navFunction() { //luodaan function ylÃ¤navipalkille
    let navnav = document.getElementById("ylaNavi"); //luodaan muuttuja ja haetaan sille id:llÃ¤ oikea elementti
    if (navnav.className === "topnav") { // Jos nÃ¤ytÃ¶n koko pienenee niin tÃ¤llÃ¤ muutetaan millÃ¤ css class jatketaan
    navnav.className += " responsive";
} else {
    navnav.className = "topnav";
}
}