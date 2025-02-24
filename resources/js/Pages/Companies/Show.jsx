import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ButtonStandard from "@/Components/ButtonStandard";

export default function Show({ auth, item, child_count }) {
    console.log(child_count);
    // Edit
    function itemEdit() {
        window.open(route("companies.edit", item.id), "_self");
    }
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        COMPANIES
                    </h2>
                }
            >
                <Head title="Companies -> Show" />

                <div className="pt-6">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Company Information
                                </h2>
                            </header>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 py-4">
                                <div className="py-2">
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        Name Short
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-400">
                                        {item.name_short}
                                    </div>
                                </div>
                                <div className="py-2">
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        Name Complete
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-400">
                                        {item.name_complete}
                                    </div>
                                </div>
                                <div className="py-2">
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        NIP
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-400">
                                        {item.nip}
                                    </div>
                                </div>
                                <div className="py-2">
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        Adress
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-400">
                                        {item.adress_street}{" "}
                                        {item.adress_number}
                                        <br></br>
                                        {item.adress_postcode}{" "}
                                        {item.adress_city}
                                    </div>
                                </div>
                                <div className="py-2">
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        Country
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-400">
                                        {item.country}
                                    </div>
                                </div>
                                <div className="py-2">
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        Coordinates
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-400">
                                        Latitude: {item.coordinate_latitude}
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-400">
                                        Longitude: {item.coordinate_longitude}
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

                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <table className="w-full p-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400  border-b ">
                                    <tr>
                                        <th></th>
                                        <th>Active</th>
                                        <th>Archive</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Employees</td>
                                        <td>{child_count.employees.active}</td>
                                        <td>{child_count.employees.archive}</td>
                                        <td>
                                            {child_count.employees.active +
                                                child_count.employees.archive}
                                        </td>
                                        <td>
                                            <ButtonStandard
                                                className="my-2"
                                                tabIndex="-1"
                                                onClick={itemEdit}
                                            >
                                                Show
                                            </ButtonStandard>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Sales Topics</td>
                                        <td>
                                            {child_count.sales_topics.active}
                                        </td>
                                        <td>
                                            {child_count.sales_topics.archive}
                                        </td>
                                        <td>
                                            {child_count.sales_topics.active +
                                                child_count.sales_topics
                                                    .archive}
                                        </td>
                                        <td>
                                            <ButtonStandard
                                                className="my-2"
                                                tabIndex="-1"
                                                onClick={itemEdit}
                                            >
                                                Show
                                            </ButtonStandard>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Meetings</td>
                                        <td>{child_count.meetings.active}</td>
                                        <td>{child_count.meetings.archive}</td>
                                        <td>
                                            {child_count.meetings.active +
                                                child_count.meetings.archive}
                                        </td>
                                        <td>
                                            <ButtonStandard
                                                className="my-2"
                                                tabIndex="-1"
                                                onClick={itemEdit}
                                            >
                                                Show
                                            </ButtonStandard>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
