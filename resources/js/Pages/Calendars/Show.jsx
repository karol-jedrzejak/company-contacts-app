import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import ButtonStandard from "@/Components/ButtonStandard";

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectEmployeeInput from "@/Components/SelectEmployeeInput";
import Modal from "@/Components/Modal";

import { useState, useRef } from "react";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";

export default function Edit({ auth, item, employee, company }) {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const destroy = (e) => {
        e.preventDefault();
        closeModal();
        router.delete(route("calendars.destroy", item.id), {
            onSuccess: (data) => {
                window.open(route("calendars.index"), "_self");
            },
            onError: (error) => {
                window.open(route("calendars.index"), "_self");
            },
        });
    };

    const editLink = (e) => {
        e.preventDefault();
        window.open(route("calendars.edit", item.id), "_self");
    };

    function companyInfo() {
        window.open(route("companies.show", company.id), "_self");
    }

    function employeeInfo() {
        window.open(route("employees.show", employee.id), "_self");
    }

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        CALENDAR
                    </h2>
                }
            >
                <Head title="Calendar -> Show" />

                <Modal show={showModal} onClose={closeModal}>
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
                            <ButtonStandard
                                className="ms-3"
                                onClick={closeModal}
                            >
                                Cancel
                            </ButtonStandard>
                        </div>
                    </form>
                </Modal>

                <div className="pt-6">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Calendar Event Information
                                </h2>
                            </header>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 py-4">
                                <div className="py-2">
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        Employee
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-400">
                                        {employee.name} {employee.surname}{" "}
                                        <ButtonStandard
                                            className="mx-2"
                                            onClick={employeeInfo}
                                        >
                                            Show
                                        </ButtonStandard>
                                    </div>
                                </div>
                                <div className="py-2">
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        Company
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-400">
                                        {company.name_short}{" "}
                                        <ButtonStandard
                                            className="mx-2"
                                            onClick={companyInfo}
                                        >
                                            Show
                                        </ButtonStandard>
                                    </div>
                                </div>
                                <div className="py-2">
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        title
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-400">
                                        {item.title}
                                    </div>
                                </div>
                                <div className="py-2">
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        start
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-400">
                                        {item.start}
                                    </div>
                                </div>
                                <div className="py-2">
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        end
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-400">
                                        {item.end}
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-2 mt-6 flex justify-between">
                                <ButtonStandard
                                    btn_style="danger"
                                    type="button"
                                    onClick={openModal}
                                >
                                    Delete
                                </ButtonStandard>
                                <ButtonStandard
                                    btn_style="yellow"
                                    type="button"
                                    onClick={editLink}
                                >
                                    Edit
                                </ButtonStandard>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
