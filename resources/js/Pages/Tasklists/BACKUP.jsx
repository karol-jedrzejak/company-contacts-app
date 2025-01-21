import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import ButtonStandard from "@/Components/ButtonStandard";
import BadgeTable from "@/Components/BadgeTable";

import React, { useState } from "react";
import ReactPaginate from "react-paginate";

export default function Index({ auth, items }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [pageNumber, setPageNumber] = useState(0);

    const [sortColumn, setSortColumn] = useState("description");
    const [sortDirection, setSortDirection] = useState("asc");

    const itemsPerPage = 10;
    const pagesVisited = pageNumber * itemsPerPage;

    const searchitems = ["description"];
    const columns = [
        {
            variable: "id",
            text: "id",
        },
        {
            variable: "description",
            text: "description",
        },
        {
            variable: "importance",
            text: "importance",
        },
    ];

    function tableLayout(item) {
        return (
            <tr
                key={item.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2 text-center">
                    <BadgeTable bdg_style={item.importance}>
                        {item.importance}
                    </BadgeTable>
                </td>
                <td className="px-4 py-2 whitespace-nowrap w-px">
                    <ButtonStandard
                        className="mx-2"
                        link={route("tasklists.edit", item.id)}
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
                                item.id
                            );
                        }}
                    >
                        Edit
                    </ButtonStandard>

                    <ButtonStandard
                        btn_style="danger"
                        className="mx-2"
                        target_id={item.id}
                        tabIndex="-1"
                        onClick={destroy}
                    >
                        Delete
                    </ButtonStandard>
                </td>
            </tr>
        );
    }

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
            return tableLayout(item);
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
            <div className="flex flex-col justify-center items-center">
                <div className="py-4">
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
                                return (
                                    <th
                                        className="px-4 py-2 text-center cursor-pointer"
                                        col_id={column.variable}
                                        onClick={(e) => {
                                            handleSorting(
                                                e.target.getAttribute("col_id")
                                            );
                                        }}
                                    >
                                        {column.text}
                                        {sortColumn == column.variable ? (
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
        </AuthenticatedLayout>
    );
}

{
    /* ---------------- Add ----------------- */
}
{
    /*             <ModalAdd></ModalAdd> */
}

{
    /*             <Message
                color="green"
                message="Item was successfully added."
                messageShow={addMessageShow}
                setMessageShow={setAddMessageShow}
            />

            <Modal show={addModal} onClose={closeAddModal}>
                <form onSubmit={add} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Add Item
                    </h2>

                    <hr className="h-px mt-2 mb-6 bg-gray-200 border-0 dark:bg-gray-700" />

                    <Form importance_types={importance_types}></Form>
                    <div className="mt-6 flex justify-end">
                        <ButtonStandard btn_style="green" type="submit">
                            Add
                        </ButtonStandard>
                        <ButtonStandard
                            className="ms-3"
                            onClick={closeAddModal}
                        >
                            Cancel
                        </ButtonStandard>
                    </div>
                </form>
            </Modal> */
}

{
    /* ---------------- Edit ---------------- */
}
{
    /*             <Message
                color="yellow"
                message="Item was successfully updated."
                messageShow={editMessageShow}
                setMessageShow={setEditMessageShow}
            />

            <Modal show={editModal} onClose={closeEditModal}>
                <form onSubmit={null} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Edit Item
                    </h2>

                    <hr className="h-px mt-2 mb-6 bg-gray-200 border-0 dark:bg-gray-700" />
                    <Form importance_types={importance_types}></Form>

                    <div className="mt-6 flex justify-end">
                        <ButtonStandard btn_style="yellow" type="submit">
                            Update
                        </ButtonStandard>
                        <ButtonStandard
                            className="ms-3"
                            onClick={closeEditModal}
                        >
                            Cancel
                        </ButtonStandard>
                    </div>
                </form>
            </Modal> */
}
