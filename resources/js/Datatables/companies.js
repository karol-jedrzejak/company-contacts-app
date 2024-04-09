import { create_datatable } from "./standard";

let allButtons = [
    {
        className: "btn btn-success",
        text: "Dodaj",
        action: function (e, dt, node, config) {
            window.location.assign(companyCreate);
        },
    },
];

let additionalData = function (d) {
    d.active = document.getElementById("active").value;
};

let columns = [
    {
        orderable: false,
        targets: 4,
    },
];

let defaultOrder = [[0, "asc"]];

$(document).ready(function () {
    create_datatable(
        allButtons,
        defaultOrder,
        companyAjax,
        "table_grid",
        additionalData,
        columns
    );
});
