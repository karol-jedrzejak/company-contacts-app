import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ButtonStandard from "@/Components/ButtonStandard";
import Table from "@/Components/Table";
import React from "react";
import { useState, useRef } from "react";
import BadgeTable from "@/Components/BadgeTable";

import Message from "@/Components/Message";

import ModalDestroy from "@/Pages/SalesContacts/ModalDestroy";

export default function Index({ auth, items, new_item, message = null }) {
    console.log(items);
    const [currentTarget, setCurrentTarget] = useState(new_item);

    // Message
    const [messageShow, setMessageShow] = useState(false);
    const [messageColor, setMessageColor] = useState("");
    const [messageText, setMessageText] = useState("");

    const timeoutRef = useRef();

    function changeMessage(message) {
        timeoutRef.current && clearTimeout(timeoutRef.current);
        setMessageColor(message.color);
        setMessageText(message.text);
        setMessageShow(true);
        timeoutRef.current = setTimeout(() => setMessageShow(false), 3000);
    }

    if (message) {
        changeMessage(message);
    }

    //Show
    function linkShow(e) {
        let item = items.find(
            (item) => item.id == e.currentTarget.getAttribute("target_id")
        );
        window.open(route("sales_contacts.show", item.id), "_self");
    }

    // Add
    function confirmAdd() {
        window.open(route("sales_contacts.create"), "_self");
    }

    // Edit
    function confirmEdit(e) {
        let item = items.find(
            (item) => item.id == e.currentTarget.getAttribute("target_id")
        );
        window.open(route("sales_contacts.edit", item.id), "_self");
    }

    // Deletion
    const [deletionModal, setDeletionModal] = useState(false);

    function confirmDeletion(e) {
        setCurrentTarget(
            items.find(
                (item) => item.id == e.currentTarget.getAttribute("target_id")
            )
        );
        setDeletionModal(true);
    }

    // Tables
    const searchitems = [
        "topic",
        "company_name",
        "importance",
        "companies_employees_name",
        "companies_employees_surname",
    ];
    const columns = [
        {
            id: 1,
            variable: "id",
            text: "Id",
            sortable: true,
        },
        {
            id: 2,
            variable: "topic",
            text: "Topic",
            sortable: true,
        },
        {
            id: 3,
            variable: "company_name",
            text: "Company Name",
            sortable: true,
        },
        {
            id: 4,
            variable: "companies_employees_name",
            text: "Employee",
            sortable: true,
        },
        {
            id: 5,
            variable: "latest_description",
            text: "Latest Update",
            sortable: true,
        },
        {
            id: 6,
            variable: "latest_updated_at",
            text: "Update date",
            sortable: true,
        },
        {
            id: 7,
            variable: "importance",
            text: "importance",
            sortable: true,
        },
    ];

    function companyInfo(e) {
        window.open(
            route(
                "companies.show",

                e.currentTarget.getAttribute("target_id")
            ),
            "_self"
        );
    }

    function employeeInfo(e) {
        window.open(
            route("employees.show", e.currentTarget.getAttribute("target_id")),
            "_self"
        );
    }

    function rowLayout(item) {
        let colors = "";
        if (item.active) {
            colors = "bg-white border-b dark:bg-gray-800 dark:border-gray-700";
        } else {
            colors =
                "bg-slate-200 border-b dark:bg-gray-800 dark:border-gray-700";
        }

        return (
            <tr key={item.id} className={colors}>
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">{item.topic}</td>
                <td className="px-4 py-2 text-center">
                    <ButtonStandard
                        className="mx-2"
                        target_id={item.company_id}
                        btn_style="white"
                        onClick={companyInfo}
                    >
                        {item.company_name}
                    </ButtonStandard>
                </td>
                <td className="px-4 py-2 text-center">
                    <ButtonStandard
                        className="mx-2"
                        target_id={item.companies_employees_id}
                        btn_style="white"
                        onClick={employeeInfo}
                    >
                        {item.companies_employees_name}{" "}
                        {item.companies_employees_surname}
                    </ButtonStandard>
                </td>
                <td className="px-4 py-2">{item.latest_description}</td>
                <td className="px-4 py-2">{item.latest_updated_at}</td>
                <td className="px-4 py-2 text-center">
                    <BadgeTable bdg_style={item.importance}>
                        {item.importance}
                    </BadgeTable>
                </td>
                <td className="px-4 py-2 whitespace-nowrap w-px">
                    <ButtonStandard
                        className="mx-2"
                        btn_style="green"
                        target_id={item.id}
                        tabIndex="-1"
                        onClick={linkShow}
                    >
                        Show
                    </ButtonStandard>
                    <ButtonStandard
                        className="mx-2"
                        target_id={item.id}
                        tabIndex="-1"
                        onClick={confirmEdit}
                    >
                        Edit
                    </ButtonStandard>
                    <>
                        {item.has_employees ? (
                            <>
                                <ButtonStandard
                                    data-tooltip-target={"button_" + item.id}
                                    btn_style="danger"
                                    className="mx-2 has-tooltip"
                                    tabIndex="-1"
                                    disabled
                                >
                                    <span className="rounded-full tooltip rounded shadow-lg p-2 bg-gray-200 text-red-500 -mt-8 -ml-[350px]">
                                        In order to delete company first delete
                                        employees.
                                    </span>
                                    Delete
                                </ButtonStandard>
                            </>
                        ) : (
                            <ButtonStandard
                                btn_style="danger"
                                className="mx-2"
                                target_id={item.id}
                                tabIndex="-1"
                                onClick={confirmDeletion}
                            >
                                Delete
                            </ButtonStandard>
                        )}
                    </>
                </td>
            </tr>
        );
    }

    // View
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    SALES CONTACTS
                </h2>
            }
        >
            <Head title="Sales Contacts" />

            {/* ---------------- Message ---------------- */}
            {messageShow ? (
                <Message color={messageColor} message={messageText} />
            ) : (
                <></>
            )}

            {/* ---------------- Delete ---------------- */}
            <>
                {deletionModal ? (
                    <ModalDestroy
                        showModal={deletionModal}
                        setShowModal={setDeletionModal}
                        deletionTarget={currentTarget}
                        changeMessage={changeMessage}
                    ></ModalDestroy>
                ) : (
                    <></>
                )}
            </>

            {/* ---------------- Table ---------------- */}
            <Table
                addButton={confirmAdd}
                defaultSort="id"
                defaultSortDirection="desc"
                items={items}
                searchitems={searchitems}
                columns={columns}
                rowLayout={rowLayout}
            />
        </AuthenticatedLayout>
    );
}
