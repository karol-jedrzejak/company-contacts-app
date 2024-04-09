// Datatables
import DataTable from "datatables.net-bs5";
import "datatables.net-buttons-bs5";

// ------ Umożliwienie uwzględnienia polskich liter w sortowaniu ------
var collator = new window.Intl.Collator("pol");
var types = $.fn.dataTable.ext.type;

delete types.order["string-pre"];
types.order["string-asc"] = collator.compare;
types.order["string-desc"] = function (a, b) {
    return collator.compare(a, b) * -1;
};
