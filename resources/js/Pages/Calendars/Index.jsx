import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ButtonStandard from "@/Components/ButtonStandard";
import Table from "@/Components/Table";
import React from "react";
import { useState, useRef } from "react";

import Message from "@/Components/Message";

import ModalDestroy from "@/Pages/Calendars/ModalDestroy";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

export default function Index({
    auth,
    items,
    events,
    events2,
    message = null,
}) {
    //console.log(events);
    console.log(events2);

    // Add
    function confirmAdd() {
        window.open(route("companies.create"), "_self");
    }

    // Edit
    function confirmEdit(e) {
        let item = items.find(
            (item) => item.id == e.currentTarget.getAttribute("target_id")
        );
        window.open(route("companies.edit", item.id), "_self");
    }

    // View
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Calendar
                </h2>
            }
        >
            <Head title="Calendar" />

            <div className="pt-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="p-4 flex justify-center">
                            <ButtonStandard
                                className="mx-2"
                                tabIndex="-1"
                                onClick={confirmAdd}
                            >
                                Add
                            </ButtonStandard>
                        </div>
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            events={items}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
