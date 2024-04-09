import { create_datatable } from "./standard";

let allButtons = [];

if (typeof robotsCreate !== "undefined") {
    allButtons = [
        {
            className: "btn btn-success",
            text: "Dodaj",
            action: function (e, dt, node, config) {
                window.location.assign(robotsCreate);
            },
        },
    ];
}

let additionalData = function (d) {};

let columns = [{ orderable: false, targets: 6 }];

let defaultOrder = [[0, "desc"]];

$(document).ready(function () {
    create_datatable(
        allButtons,
        defaultOrder,
        robotsAjax,
        "table_grid",
        additionalData,
        columns
    );
});
