import { create_datatable } from "./standard";

let allButtons = [
    {
        className: "btn btn-success",
        text: "Dodaj",
        action: function (e, dt, node, config) {
            window.location.assign(dataCreate);
        },
    },
];

let additionalData = function (d) {};

let columns = [
    { targets: 3, className: "text-end me-5 pe-5" },
    { orderable: false, targets: 5 },
];

let defaultOrder = [[0, "desc"]];

$(document).ready(function () {
    create_datatable(
        allButtons,
        defaultOrder,
        dataAjax,
        "table_grid",
        additionalData,
        columns
    );
});
