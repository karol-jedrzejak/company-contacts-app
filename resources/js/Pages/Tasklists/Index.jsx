import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import ButtonStandard from "@/Components/ButtonStandard";
import BadgeTable from "@/Components/BadgeTable";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
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

    const bulletinsPerPage = 8;
    const pagesVisited = pageNumber * bulletinsPerPage;
    const displayBulletins = tasklists
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
            {/*  <table className="table-fixed w-full p-12 m-12">
                <thead>
                    <tr className="bg-gray-100 p-16">
                        <th className="px-4 py-2 w-20">No.</th>

                        <th className="px-4 py-2">Title</th>

                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {tasklists.map(({ id, description }) => (
                        <tr key={id}>
                            <td className="border px-4 py-2">{id}</td>

                            <td className="border px-4 py-2">{description}</td>

                            <td className="border px-4 py-2">
                                <ButtonStandard
                                    btn_style=""
                                    className="mx-2"
                                    link={route("tasklists.edit", id)}
                                >
                                    Edit
                                </ButtonStandard>

                                <ButtonStandard
                                    btn_style="secondary"
                                    className="mx-2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = window.location =
                                            route("tasklists.edit", id);
                                    }}
                                >
                                    Edit
                                </ButtonStandard>

                                <ButtonStandard
                                    btn_style="danger"
                                    className="mx-2"
                                    target_id={id}
                                    tabIndex="-1"
                                    onClick={destroy}
                                >
                                    Delete
                                </ButtonStandard>
                            </td>
                        </tr>
                    ))}

                    {tasklists.length === 0 && (
                        <tr>
                            <td className="px-6 py-4 border-t" colSpan="4">
                                No tasks found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table> */}
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
                        <th className="border px-4 py-2">id</th>
                        <th className="border px-4 py-2">description</th>
                        <th className="border px-4 py-2">importance</th>
                        <th className="border px-4 py-2">buttons</th>
                    </tr>
                </thead>
                <tbody>{displayBulletins}</tbody>
            </table>
            <div>
                <div className="bulletinPagination" md={12}>
                    <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        pageCount={pageCount}
                        onPageChange={handlePageChange}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        containerClassName={"pagination"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
