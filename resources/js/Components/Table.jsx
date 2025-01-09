import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import ButtonStandard from "@/Components/ButtonStandard";

export default function Table({
    addButton = false,
    items,
    searchitems,
    defaultSort,
    defaultSortDirection,
    columns,
    rowLayout,
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [pageNumber, setPageNumber] = useState(0);

    const [sortColumn, setSortColumn] = useState(defaultSort);
    const [sortDirection, setSortDirection] = useState(defaultSortDirection);

    const itemsPerPage = 10;
    const pagesVisited = pageNumber * itemsPerPage;

    const displayItems = items
        .sort((a, b) => {
            const nameA = a[sortColumn]; // ignore upper and lowercase
            const nameB = b[sortColumn]; // ignore upper and lowercase

            String(nameA).toUpperCase(); // ignore upper and lowercase
            String(nameB).toUpperCase(); // ignore upper and lowercase

            if (sortColumn == "importance") {
                let nameValueA = 1;
                switch (nameA) {
                    case "high":
                        nameValueA = 3;
                        break;
                    case "medium":
                        nameValueA = 2;
                        break;

                    default:
                        break;
                }
                let nameValueB = 1;
                switch (nameB) {
                    case "high":
                        nameValueB = 3;
                        break;
                    case "medium":
                        nameValueB = 2;
                        break;

                    default:
                        break;
                }
                if (sortDirection == "asc") {
                    if (nameValueA < nameValueB) {
                        return -1;
                    }
                    if (nameValueA > nameValueB) {
                        return 1;
                    }
                } else {
                    if (nameValueA > nameValueB) {
                        return -1;
                    }
                    if (nameValueA < nameValueB) {
                        return 1;
                    }
                }

                // names must be equal
                return 0;
            } else {
                if (sortDirection == "asc") {
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                } else {
                    if (nameA > nameB) {
                        return -1;
                    }
                    if (nameA < nameB) {
                        return 1;
                    }
                }

                // names must be equal
                return 0;
            }
        })
        .filter((item) => {
            if (searchTerm === "") {
                return item;
            }
            let found = false;
            searchitems.forEach((searchitem) => {
                if (
                    String(item[String(searchitem)])
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                ) {
                    found = true;
                }
            });
            if (found) {
                return item;
            }
            return false;
        })
        .slice(pagesVisited, pagesVisited + itemsPerPage)
        .map((item) => {
            return rowLayout(item);
        });

    const pageCount = Math.ceil(
        items.filter((item) => {
            if (searchTerm === "") {
                return item;
            }
            let found = false;
            searchitems.forEach((searchitem) => {
                if (
                    String(item[String(searchitem)])
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                ) {
                    found = true;
                }
            });
            if (found) {
                return item;
            }
            return false;
        }).length / itemsPerPage
    );

    const handlePageChange = ({ selected }) => {
        setPageNumber(selected);
    };

    const handleSorting = (selectedRow) => {
        if (sortColumn == selectedRow) {
            if (sortDirection == "asc") {
                setSortDirection("desc");
            } else {
                setSortDirection("asc");
            }
        } else {
            setSortColumn(selectedRow);
            setSortDirection("asc");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="py-4">
                {addButton ? (
                    <ButtonStandard
                        className="mx-2"
                        tabIndex="-1"
                        onClick={addButton}
                    >
                        Add
                    </ButtonStandard>
                ) : (
                    <></>
                )}
                <label>
                    <input
                        className="rounded-lg"
                        placeholder="Search..."
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            handlePageChange({ selected: 0 });
                        }}
                    />
                </label>
            </div>
            <table className="w-4/5 p-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400  border-b ">
                    <tr>
                        {columns.map((column) => {
                            let classList = "px-4 py-2 text-center";
                            if (column.sortable) {
                                classList = classList + " cursor-pointer";
                            }
                            return (
                                <th
                                    key={column.id}
                                    className={classList}
                                    col_id={column.variable}
                                    onClick={(e) => {
                                        if (column.sortable) {
                                            handleSorting(
                                                e.target.getAttribute("col_id")
                                            );
                                        }
                                    }}
                                >
                                    {column.text}
                                    {sortColumn == column.variable &&
                                    column.sortable ? (
                                        <>
                                            {sortDirection == "asc" ? (
                                                <>
                                                    <span className="ps-1">
                                                        ↓
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="ps-1">
                                                        ↑
                                                    </span>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </th>
                            );
                        })}
                        <th className="text-center px-4 py-2">edit</th>
                    </tr>
                </thead>
                <tbody>{displayItems}</tbody>
            </table>
            <div>
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                    containerClassName={
                        "pt-8 flex justify-center gap-2 items-center"
                    }
                    pageLinkClassName={
                        "relative block border border-indigo-400 rounded-lg bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-gray-400"
                    }
                    previousLinkClassName={
                        "relative block border border-indigo-400 rounded-lg bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-gray-400"
                    }
                    nextLinkClassName={
                        "relative block border border-indigo-400 rounded-lg bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-gray-400"
                    }
                    activeClassName={"bg-indigo-400 rounded-lg text-white"}
                    disabledClassName={"pointer-events-none opacity-50"}
                />
            </div>
        </div>
    );
}
