import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import ButtonStandard from "@/Components/ButtonStandard";
import BadgeTable from "@/Components/BadgeTable";

import React, { useState } from "react";
import ReactPaginate from "react-paginate";

export default function Index({ auth, tasklists }) {
    function destroy(e) {
        if (confirm("Are you sure you want to delete this task?")) {
            router.delete(
                route(
                    "tasklists.destroy",
                    e.currentTarget.getAttribute("target_id")
                )
            );
        }
    }

    const [searchTerm, setSearchTerm] = useState("");
    const [pageNumber, setPageNumber] = useState(0);

    const [sortColumn, setSortColumn] = useState("description");
    const [sortDirection, setSortDirection] = useState("asc");

    const bulletinsPerPage = 8;
    const pagesVisited = pageNumber * bulletinsPerPage;
    const displayBulletins = tasklists
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
        .filter((tasklist) => {
            if (searchTerm === "") {
                return tasklist;
            } else if (
                tasklist.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            ) {
                return tasklist;
            }
            return false;
        })
        .slice(pagesVisited, pagesVisited + bulletinsPerPage)
        .map((tasklist) => {
            return (
                <tr key={tasklist.id}>
                    <td className="border px-4 py-2">{tasklist.id}</td>
                    <td className="border px-4 py-2">{tasklist.description}</td>
                    <td className="border px-4 py-2">
                        <BadgeTable bdg_style={tasklist.importance}>
                            {tasklist.importance}
                        </BadgeTable>
                    </td>
                    <td className="border px-4 py-2">
                        <ButtonStandard
                            btn_style=""
                            className="mx-2"
                            link={route("tasklists.edit", tasklist.id)}
                        >
                            Edit
                        </ButtonStandard>

                        <ButtonStandard
                            btn_style="secondary"
                            className="mx-2"
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href = window.location = route(
                                    "tasklists.edit",
                                    tasklist.id
                                );
                            }}
                        >
                            Edit
                        </ButtonStandard>

                        <ButtonStandard
                            btn_style="danger"
                            className="mx-2"
                            target_id={tasklist.id}
                            tabIndex="-1"
                            onClick={destroy}
                        >
                            Delete
                        </ButtonStandard>
                    </td>
                </tr>
            );
        });

    const pageCount = Math.ceil(
        tasklists.filter((tasklist) => {
            if (searchTerm === "") {
                return tasklist;
            } else if (
                tasklist.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            ) {
                return tasklist;
            }
            return false;
        }).length / bulletinsPerPage
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
        console.log(sortColumn);
        console.log(sortDirection);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    TASKLIST
                </h2>
            }
        >
            <Head title="Tasklists" />
            <div className="search-wrapper">
                <div
                    className="btn btn-primary"
                    style={{ marginBottom: "20px" }}
                >
                    Create New
                </div>
                <label>
                    <input
                        type="search"
                        className="search-input"
                        placeholder="Search..."
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            handlePageChange({ selected: 0 });
                        }}
                    />
                </label>
            </div>
            <table xs={1} md={4} className="g-4">
                <thead>
                    <tr>
                        <th
                            className="border px-4 py-2 cursor-pointer"
                            col_id="id"
                            onClick={(e) => {
                                handleSorting(e.target.getAttribute("col_id"));
                            }}
                        >
                            id
                            {sortColumn == "id" ? (
                                <>
                                    {sortDirection == "asc" ? (
                                        <>
                                            <span className="ps-1">↓</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="ps-1">↑</span>
                                        </>
                                    )}
                                </>
                            ) : (
                                <></>
                            )}
                        </th>
                        <th
                            className="border px-4 py-2 cursor-pointer"
                            col_id="description"
                            onClick={(e) => {
                                handleSorting(e.target.getAttribute("col_id"));
                            }}
                        >
                            description
                            {sortColumn == "description" ? (
                                <>
                                    {sortDirection == "asc" ? (
                                        <>
                                            <span className="ps-1">↓</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="ps-1">↑</span>
                                        </>
                                    )}
                                </>
                            ) : (
                                <></>
                            )}
                        </th>
                        <th
                            className="border px-4 py-2 cursor-pointer"
                            col_id="importance"
                            onClick={(e) => {
                                handleSorting(e.target.getAttribute("col_id"));
                            }}
                        >
                            importance
                            {sortColumn == "importance" ? (
                                <>
                                    {sortDirection == "asc" ? (
                                        <>
                                            <span className="ps-1">↓</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="ps-1">↑</span>
                                        </>
                                    )}
                                </>
                            ) : (
                                <></>
                            )}
                        </th>
                        <th className="border px-4 py-2">edit</th>
                    </tr>
                </thead>
                <tbody>{displayBulletins}</tbody>
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
                        "relative block border border-gray-800 rounded-lg bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-gray-400"
                    }
                    previousLinkClassName={
                        "relative block border border-gray-800 rounded-lg bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-gray-400"
                    }
                    nextLinkClassName={
                        "relative block border border-gray-800 rounded-lg bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-gray-400"
                    }
                    activeClassName={"bg-gray-800 rounded-lg text-white"}
                    disabledClassName={"pointer-events-none opacity-50"}
                />
            </div>
        </AuthenticatedLayout>
    );
}
