export function create_datatable(
    allButtons,
    setOrder,
    urlAdress,
    tableid,
    additionalData,
    columns
) {
    var table = $("#" + tableid).DataTable({
        language: {
            decimal: "",
            emptyTable: "Brak rekordów",
            info: "Strona _PAGE_ z _PAGES_",
            infoEmpty: "Brak rekordów",
            infoFiltered: "(Znaleziono _MAX_ rekordów)",
            infoPostFix: "",
            thousands: ",",
            lengthMenu: "_MENU_ rekordów na stronę",
            loadingRecords: "Ładowanie...",
            processing: "",
            search: "Wyszukaj:",
            zeroRecords: "Brak pasujących rekordów",
            paginate: {
                first: "Pierwsza",
                last: "Ostatnia",
                next: "Następna",
                previous: "Poprzednia",
            },
            aria: {
                sortAscending: ": Naciśnij aby posrtować rosnąco",
                sortDescending: ": Naciśnij aby posrtować malejąco",
            },
        },
        dom:
            "<'row'<'col-sm-12 col-md-2'l><'col-sm-12 col-md-10 mt-sm-2 mt-md-0 d-flex flex-row-reverse'B f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        buttons: allButtons,
        order: setOrder,
        serverSide: true,
        autoWidth: false,
        stateSave: true,
        columnDefs: columns,
        initComplete: function () {},
        ajax: {
            url: urlAdress, // json datasource
            type: "post", // type of method  ,GET/POST/DELETE
            error: function () {
                $("#" + tableid + "_processing").css("display", "none");
            },
            data: additionalData,
        },
    });
}

export function selectallrows() {
    var checkboxes = document.getElementsByClassName("form-check-input");

    let allChecked = true;

    Array.prototype.forEach.call(checkboxes, function (el) {
        // Do stuff here
        allChecked = true;
        if (el.checked == false) {
            allChecked = false;
            el.checked = true;
        }
    });

    if (allChecked == true) {
        Array.prototype.forEach.call(checkboxes, function (el) {
            el.checked = false;
        });
    }
}
