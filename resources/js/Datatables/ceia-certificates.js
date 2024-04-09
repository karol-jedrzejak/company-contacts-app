import { create_datatable } from "./standard";
import { selectallrows } from "./standard";
import { Modal } from "bootstrap";

let allButtons = [
    {
        className: "btn btn-outline-danger",
        text: "Archiwum",
        attr: { id: "datatable-active-button" },
        action: function (e, dt, node, config) {
            let dtButton = document.getElementById("datatable-active-button");
            if (dtButton.classList.contains("btn-outline-danger")) {
                dtButton.classList.remove("btn-outline-danger");
                dtButton.classList.add("btn-danger");
            } else {
                dtButton.classList.add("btn-outline-danger");
                dtButton.classList.remove("btn-danger");
            }

            let button = document.getElementById("active");
            if (button.value == 0) {
                button.value = 1;
            } else {
                button.value = 0;
            }
            dt.ajax.reload();
        },
    },
    {
        className: "btn btn-success",
        text: "Lista",
        action: function (e, dt, node, config) {
            var zmienne = document.querySelectorAll("input:checked");
            var IdNumbers = [];
            zmienne.forEach((element) => IdNumbers.push(element.id));
            window.location.assign(list_pdf.slice(0, -1) + IdNumbers);
        },
    },
    {
        className: "btn btn-light",
        text: "Certyfikaty",
        action: function (e, dt, node, config) {
            var zmienne = document.querySelectorAll("input:checked");
            var IdNumbers = [];
            var valid = true;
            let errorCertificates = new Modal(
                document.getElementById("ErrorCertificates")
            );
            zmienne.forEach((element) => {
                IdNumbers.push(element.id);
                if (element.dataset.certificate == "false") {
                    valid = false;
                }
            });
            if (valid && IdNumbers.length != 0) {
                window.location.assign(
                    certificates_pdf.slice(0, -1) + IdNumbers
                );
            } else {
                errorCertificates.show();
            }
        },
    },
    {
        className: "btn btn-info",
        text: "Zaświadczenia",
        action: function (e, dt, node, config) {
            var zmienne = document.querySelectorAll("input:checked");
            var IdNumbers = [];
            zmienne.forEach((element) => IdNumbers.push(element.id));
            window.location.assign(participation_pdf.slice(0, -1) + IdNumbers);
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
        className: "btn btn-warning",
        text: "Aktualizuj",
        action: function (e, dt, node, config) {
            var zmienne = document.querySelectorAll("input:checked");
            var IdNumbers = [];
            var valid = true;
            let errorCertificates = new Modal(
                document.getElementById("ErrorCertificates")
            );
            zmienne.forEach((element) => {
                IdNumbers.push(element.id);
                if (element.dataset.certificate == "false") {
                    valid = false;
                }
            });
            if (valid && IdNumbers.length != 0) {
                window.location.assign(multiupdate.slice(0, -1) + IdNumbers);
            } else {
                errorCertificates.show();
            }
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

let additionalData = function (d) {
    d.active = document.getElementById("active").value;
};

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
