import { create_datatable } from "./standard";
import { selectallrows } from "./standard";
import { Modal } from "bootstrap";

let allButtons = [
    {
        className: "btn btn-light",
        text: "Certyfikaty",
        action: function (e, dt, node, config) {
            var zmienne = document.querySelectorAll("input:checked");
            var IdNumbers = [];
            let errorCertificates = new Modal(
                document.getElementById("ErrorCertificates")
            );
            zmienne.forEach((element) => {
                IdNumbers.push(element.id);
            });
            if (IdNumbers.length != 0) {
                window.location.assign(
                    certificates_pdf.slice(0, -1) + IdNumbers
                );
            } else {
                errorCertificates.show();
            }
        },
    },
    {
        className: "btn btn-danger",
        text: "Zaznacz Wszystkie",
        action: function (e, dt, node, config) {
            selectallrows();
        },
    },
    {
        className: "btn btn-success",
        text: "Dodaj",
        action: function (e, dt, node, config) {
            window.location.assign(certificatesCreate);
        },
    },
];

let additionalData = function (d) {};

let columns = [
    { orderable: false, targets: 0 },
    { orderable: false, targets: 8 },
];

let defaultOrder = [[1, "desc"]];

$(document).ready(function () {
    create_datatable(
        allButtons,
        defaultOrder,
        certificatesAjax,
        "table_grid",
        additionalData,
        columns
    );
});
