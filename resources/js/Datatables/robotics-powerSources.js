import { create_datatable } from "./standard";

let allButtons = [];

if (typeof psCreate !== "undefined") {
    allButtons = [
        {
            className: "btn btn-success",
            text: "Dodaj",
            action: function (e, dt, node, config) {
                window.location.assign(psCreate);
            },
        },
    ];
}

let additionalData = function (d) {};

let columns = [{ orderable: false, targets: 7 }];

let defaultOrder = [[0, "desc"]];

$(document).ready(function () {
    create_datatable(
        allButtons,
        defaultOrder,
        psAjax,
        "table_grid",
        additionalData,
        columns
    );
});
