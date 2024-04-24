var myElement1 = document.getElementById("coordinate_longitude");
myElement1.onpaste = function (e) {
    var pastedText = undefined;
    if (window.clipboardData && window.clipboardData.getData) {
        // IE
        pastedText = window.clipboardData.getData("Text");
    } else if (e.clipboardData && e.clipboardData.getData) {
        pastedText = e.clipboardData.getData("text/plain");
    }

    var Szerokosc = pastedText.substr(0, 7);

    myElement1.value = Szerokosc;

    return false; // Prevent the default handler from running.
};

var myElement2 = document.getElementById("coordinate_latitude");
myElement2.onpaste = function (e) {
    var pastedText = undefined;
    if (window.clipboardData && window.clipboardData.getData) {
        // IE
        pastedText = window.clipboardData.getData("Text");
    } else if (e.clipboardData && e.clipboardData.getData) {
        pastedText = e.clipboardData.getData("text/plain");
    }

    var NrPrzecinek = pastedText.indexOf(",");
    NrPrzecinek = parseFloat(NrPrzecinek) + parseFloat(2);

    var Dlugosc = pastedText.substr(NrPrzecinek, 7);

    myElement2.value = Dlugosc;

    return false; // Prevent the default handler from running.
};

window.OdpalGoogleMaps = function () {
    var adres1 = document.getElementById("adress_number").value;
    var adres2 = document.getElementById("adress_sub_number").value;
    var adres3 = document.getElementById("adress_street").value;
    var adres4 = document.getElementById("adress_city").value;
    var adres5 = document.getElementById("adress_postcode").value;
    var adres6 = document.getElementById("adress_post_office").value;

    if (adres2 == "") {
        var adresnr = adres1;
    } else {
        var adresnr = adres1 + "%2F" + adres2;
    }

    if (adres3 == "") {
        var adres = adres4 + "+" + adresnr + "+" + adres5 + "+" + adres6;
    } else {
        if (adres4 == adres6) {
            var adres =
                "Ul.+" + adres3 + "+" + adresnr + "+" + adres5 + "+" + adres6;
        } else {
            var adres =
                "Ul.+" +
                adres3 +
                "+" +
                adresnr +
                "+" +
                adres4 +
                "+" +
                adres5 +
                "+" +
                adres6;
        }
    }

    window.open("https://www.google.pl/maps/place/" + adres, "_blank");
};

window.PobierzDane = async function () {
    var adres1 = document.getElementById("adress_number").value;
    var adres2 = document.getElementById("adress_sub_number").value;
    var adres3 = document.getElementById("adress_street").value;
    var adres4 = document.getElementById("adress_city").value;
    var adres5 = document.getElementById("adress_postcode").value;
    var adres6 = document.getElementById("adress_post_office").value;

    if (adres2 == "") {
        var adresnr = adres1;
    } else {
        var adresnr = adres1 + "/" + adres2;
    }

    if (adres3 == "") {
        var adres = adres4 + "+" + adresnr + "+" + adres5 + "+" + adres6;
    } else {
        if (adres4 == adres6) {
            var adres = adres3 + "+" + adresnr + "+" + adres5 + "+" + adres6;
        } else {
            var adres =
                adres3 +
                "+" +
                adresnr +
                "+" +
                adres4 +
                "+" +
                adres5 +
                "+" +
                adres6;
        }
    }
    let placeObject = new Object();
    await fetch(
        "http://nominatim.openstreetmap.org/search?addressdetails=1&format=jsonv2&limit=1&q=" +
            adres
    )
        .then((resp) => resp.text())
        .then(function (data) {
            placeObject = JSON.parse(data);
        });

    let statetext = placeObject[0].address.state.split(" ");
    let state = statetext[1];
    let Woj = state[0].toUpperCase() + state.slice(1);

    var TekstAlert =
        "Województwo : " +
        Woj +
        "\n" +
        "Długość : " +
        placeObject[0].lat +
        "\n" +
        "Szerokość : " +
        placeObject[0].lon;

    alert(TekstAlert);

    document.getElementById("voivodeship").text = Woj;
    document.getElementById("voivodeship").value = Woj;
    document.getElementById("coordinate_NS").value = parseFloat(
        placeObject[0].lat
    ).toFixed(4);
    document.getElementById("coordinate_WE").value = parseFloat(
        placeObject[0].lon
    ).toFixed(4);
};
