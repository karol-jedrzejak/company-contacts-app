import { create_datatable } from "./standard";

let allButtons = [
    {
        className: "btn btn-success",
        text: "Dodaj",
        action: function (e, dt, node, config) {
            window.location.assign(employeesCreate);
        },
    },
];

let additionalData = function (d) {
    d.active = document.getElementById("active").value;
};

let columns = [
    { orderable: false, targets: 2 },
    { orderable: false, targets: 3 },
    { orderable: false, targets: 4 },
    { orderable: false, targets: 5 },
];

let defaultOrder = [[0, "asc"]];

$(document).ready(function () {
    create_datatable(
        allButtons,
        defaultOrder,
        employeesAjax,
        "table_grid",
        additionalData,
        columns
    );
});
