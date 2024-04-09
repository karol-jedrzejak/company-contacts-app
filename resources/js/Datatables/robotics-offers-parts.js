import { create_datatable } from "./standard";

// ------------ 1 --------------

let allButtons1 = [
    {
        className: "btn btn-success",
        text: "Dodaj",
        action: function (e, dt, node, config) {
            window.location.assign(dataCreate1);
        },
    },
];

let additionalData1 = function (d) {};

let columns1 = [{ orderable: false, targets: 5 }];

let defaultOrder1 = [[0, "desc"]];

// ------------ 2 --------------

let allButtons2 = [
    {
        className: "btn btn-success",
        text: "Dodaj",
        action: function (e, dt, node, config) {
            window.location.assign(dataCreate2);
        },
    },
];

let additionalData2 = function (d) {};

let columns2 = [{ orderable: false, targets: 2 }];

let defaultOrder2 = [[0, "desc"]];

// ------------ 3 --------------

let allButtons3 = [
    {
        className: "btn btn-success",
        text: "Dodaj",
        action: function (e, dt, node, config) {
            window.location.assign(dataCreate3);
        },
    },
];

let additionalData3 = function (d) {};

let columns3 = [{ orderable: false, targets: 2 }];

let defaultOrder3 = [[0, "desc"]];

// ------------ Ready --------------

$(document).ready(function () {
    create_datatable(
        allButtons1,
        defaultOrder1,
        dataAjax1,
        "table_grid_1",
        additionalData1,
        columns1
    );

    create_datatable(
        allButtons2,
        defaultOrder2,
        dataAjax2,
        "table_grid_2",
        additionalData2,
        columns2
    );

    create_datatable(
        allButtons3,
        defaultOrder3,
        dataAjax3,
        "table_grid_3",
        additionalData3,
        columns3
    );
});
