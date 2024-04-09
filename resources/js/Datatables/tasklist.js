import { create_datatable } from "./standard";

let allButtons = [
    {
        className: "btn btn-success",
        text: "Dodaj",
        action: function (e, dt, node, config) {
            window.location.assign(tasklistCreate);
        },
    },
];

let additionalData = function (d) {};

let columns = [{ orderable: false, targets: 3 }];

let defaultOrder = [[0, "asc"]];

$(document).ready(function () {
    create_datatable(
        allButtons,
        defaultOrder,
        tasklistAjax,
        "table_grid",
        additionalData,
        columns
    );
});
