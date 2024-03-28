// Varmistetaan että sivu on ladattu ennenkuin lisäillään kuuntelijoita
window.onload = event => {
    console.log("page is fully loaded");
    // haetaan nappi id:n perusteella
    var nappi = document.getElementById("button1");
    // lisätään kuuntelija nappiin
    nappi.addEventListener("click", () => {
        // haetaan email ja pass input kentistä arvot
        var email = document.getElementById("email").value;
        var pass = document.getElementById("pass").value;
        // tulostetaan arvot konsoliin
        console.log(email, pass);
        // luodaan uusi XMLHttpRequest objekti
        var xmlhttp = new XMLHttpRequest();
        // lisätään kuuntelija joka tarkistaa onko readyState 4 ja status 200
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // jos vastaus on ok, ohjataan käyttäjä etusivulle
                window.location.href = this.responseURL;
            };
        }
        // avataan yhteys ja lähetetään data
        xmlhttp.open("POST", "http://localhost:3000/kirjaudu", true);
        // asetetaan pyynnön otsake
        xmlhttp.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
        );
        // lähetetään data email ja pass muuttujien arvot POST pyyntönä
        xmlhttp.send("email=" + email + "&pass=" + pass);
    });
};
