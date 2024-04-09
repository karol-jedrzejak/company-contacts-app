import { create_datatable } from "./standard";

let allButtons = [];

if (typeof systemsCreate !== "undefined") {
    allButtons = [
        {
            className: "btn btn-success",
            text: "Dodaj",
            action: function (e, dt, node, config) {
                window.location.assign(systemsCreate);
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
        systemsAjax,
        "table_grid",
        additionalData,
        columns
    );
});
