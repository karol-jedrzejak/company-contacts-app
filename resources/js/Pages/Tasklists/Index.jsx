import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import ButtonStandard from "@/Components/ButtonStandard";
import BadgeTable from "@/Components/BadgeTable";
import Table from "@/Components/Table";
import Modal from "@/Components/Modal";
import React from "react";
import { useRef, useState, useEffect } from "react";
import TextInput from "@/Components/TextInput";

export default function Index({ auth, items, message }) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [deletionTarget, setDeletionTarget] = useState(null);
    const [messageShow, setMessageShow] = useState(false);

    useEffect(() => {
        if (message) {
            setMessageShow(true);
            const timeout = setTimeout(() => setMessageShow(false), 2000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [message]);

    function confirmDeletion(e) {
        setDeletionTarget(e.currentTarget.getAttribute("target_id"));
        setConfirmingDeletion(true);
    }

    const closeModal = () => {
        setConfirmingDeletion(false);
    };

    const destroy = (e) => {
        e.preventDefault();
        closeModal();
        router.delete(route("tasklists.destroy", deletionTarget));
    };

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
                        onClick={confirmDeletion}
                    >
                        Delete
                    </ButtonStandard>
                </td>
            </tr>
        );
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
            {messageShow ? (
                <div className="fixed bottom-4 right-4 bg-red-700 text-white rounded-lg p-2 m-4 text-lg animate-appear">
                    {message}
                </div>
            ) : (
                <></>
            )}

            <Modal show={confirmingDeletion} onClose={closeModal}>
                <form onSubmit={destroy} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Confirm
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Are you sure you want to delete this ?
                    </p>

                    <div className="mt-6 flex justify-end">
                        <ButtonStandard btn_style="danger" type="submit">
                            Delete
                        </ButtonStandard>
                        <ButtonStandard className="ms-3" onClick={closeModal}>
                            Cancel
                        </ButtonStandard>
                    </div>
                </form>
            </Modal>

            <Table
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
