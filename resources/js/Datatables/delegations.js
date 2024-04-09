import { create_datatable } from "./standard";
import { Modal } from "bootstrap";

let allButtons = [
    {
        className: "btn btn-warning",
        text: "Rozliczone",
        action: function (e, dt, node, config) {
            var zmienne = document.querySelectorAll("input:checked");
            var IdNumbers = [];
            let id_tag = "";
            var valid = true;
            let errorPaid = new Modal(document.getElementById("ErrorPaid"));
            let paidDialog = new Modal(document.getElementById("paidDialog"));
            let paidInput = document.getElementById("paidInput");
            zmienne.forEach((element) => {
                id_tag = id_tag + element.id + ",";
                IdNumbers.push(element.id);
                if (element.dataset.certificate == "false") {
                    valid = false;
                }
            });
            id_tag = id_tag.slice(0, -1);
            if (valid && IdNumbers.length != 0) {
                paidInput.value = id_tag;
                paidDialog.show();
            } else {
                errorPaid.show();
            }
        },
    },
    {
        className: "btn btn-light",
        text: "Lista",
        action: function (e, dt, node, config) {
            var zmienne = document.querySelectorAll("input:checked");
            var IdNumbers = [];
            let id_tag = "";
            var valid = true;
            let errorPaid = new Modal(document.getElementById("ErrorPaid"));

            zmienne.forEach((element) => {
                id_tag = id_tag + element.id + ",";
                IdNumbers.push(element.id);
                if (element.dataset.certificate == "false") {
                    valid = false;
                }
            });
            id_tag = id_tag.slice(0, -1);

            if (valid && IdNumbers.length != 0) {
                window.location.assign(delegationsShow.slice(0, -1) + id_tag);
            } else {
                errorPaid.show();
            }
        },
    },
    {
        className: "btn btn-success",
        text: "Dodaj",
        action: function (e, dt, node, config) {
            window.location.assign(delegationsCreate);
        },
    },
];

let additionalData = function (d) {};

let columns = [
    { orderable: false, targets: 0 },
    { orderable: false, targets: 5, className: "text-end" },
    { orderable: false, targets: 6, className: "text-center" },
    { orderable: false, targets: 7 },
];

let defaultOrder = [[1, "desc"]];

$(document).ready(function () {
    create_datatable(
        allButtons,
        defaultOrder,
        delegationsAjax,
        "table_grid",
        additionalData,
        columns
    );
});
