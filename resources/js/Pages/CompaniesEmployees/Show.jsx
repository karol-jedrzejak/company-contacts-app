import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ButtonStandard from "@/Components/ButtonStandard";

export default function Show({ auth, item, company }) {
    // Edit
    function itemEdit() {
        window.open(route("employees.edit", item.id), "_self");
    }

    function companyInfo() {
        window.open(route("companies.show", company.id), "_self");
    }

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        COMPANIES EMPLOYEE
                    </h2>
                }
            >
                <Head title="Companies -> Show" />

                <div className="pt-6">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Employee Information
                                </h2>
                            </header>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 py-4">
                                <div className="py-2">
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        Name & Surname
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-400">
                                        {item.name} {item.surname}
                                    </div>
                                </div>
                                <div className="py-2">
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        Position
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-400">
                                        {item.position}
                                    </div>
                                </div>
                                <div className="py-2">
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        Mobile
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-400">
                                        {item.mobile}
                                    </div>
                                </div>
                                <div className="py-2">
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        Phone
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-400">
                                        {item.phone}
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
                                        Active
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-400">
                                        {item.active ? <>Yes</> : <>No</>}
                                    </div>
                                </div>
                                <div className="py-2">
                                    <ButtonStandard
                                        className=""
                                        tabIndex="-1"
                                        onClick={itemEdit}
                                    >
                                        Edit
                                    </ButtonStandard>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
