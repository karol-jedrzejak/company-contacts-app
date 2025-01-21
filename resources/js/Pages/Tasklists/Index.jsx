import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import ButtonStandard from "@/Components/ButtonStandard";
import BadgeTable from "@/Components/BadgeTable";
import Table from "@/Components/Table";
import Modal from "@/Components/Modal";
import React from "react";
import { useState } from "react";

import Message from "@/Components/Message";
import Form from "@/Pages/Tasklists/Form";

import ModalAdd from "@/Pages/Tasklists/ModalAdd";
import ModalDestroy from "@/Pages/Tasklists/ModalDestroy";

export default function Index({ auth, items, importance_types, new_task }) {
    const [currentTarget, setCurrentTarget] = useState(null);

    // Add
    const [addModal, setAddModal] = useState(false);

    function confirmAdd() {
        setAddModal(true);
    }

    // Edit
    const [editModal, setEditModal] = useState(false);
    const [editMessageShow, setEditMessageShow] = useState(false);
    let editTarget = null;

    function confirmEdit(e) {
        editTarget = e.currentTarget.getAttribute("target_id");
        setEditModal(true);
    }

    // Deletion
    const [deletionModal, setDeletionModal] = useState(false);

    function confirmDeletion(e) {
        setCurrentTarget(e.currentTarget.getAttribute("target_id"));
        setDeletionModal(true);
    }

    // Tables
    const searchitems = ["description", "importance"];
    const columns = [
        {
            id: 1,
            variable: "id",
            text: "id",
            sortable: true,
        },
        {
            id: 2,
            variable: "description",
            text: "description",
            sortable: true,
        },
        {
            id: 3,
            variable: "importance",
            text: "importance",
            sortable: true,
        },
    ];

    function rowLayout(item) {
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
                        target_id={item.id}
                        tabIndex="-1"
                        onClick={confirmEdit}
                    >
                        Edit
                    </ButtonStandard>
                    <ButtonStandard
                        btn_style="danger"
                        className="mx-2"
                        target_id={item.id}
                        tabIndex="-1"
                        onClick={confirmDeletion}
                    >
                        Delete
                    </ButtonStandard>
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
                    TASKLIST
                </h2>
            }
        >
            <Head title="Tasklists" />

            {/* ---------------- Add ----------------- */}
            {/*             <ModalAdd></ModalAdd> */}

            {/*             <Message
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
            </Modal> */}

            {/* ---------------- Edit ---------------- */}
            {/*             <Message
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
            </Modal> */}

            {/* ---------------- Delete ---------------- */}
            <ModalDestroy
                showModal={deletionModal}
                setShowModal={setDeletionModal}
                deletionTarget={currentTarget}
            ></ModalDestroy>

            {/* ---------------- Table ---------------- */}
            <Table
                addButton={confirmAdd}
                defaultSort="description"
                defaultSortDirection="asc"
                items={items}
                searchitems={searchitems}
                columns={columns}
                rowLayout={rowLayout}
            />
        </AuthenticatedLayout>
    );
}
