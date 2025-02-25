import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ButtonStandard from "@/Components/ButtonStandard";
import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

export default function Index({ auth, items, events }) {
    console.log(events);

    // Add
    function confirmAdd() {
        window.open(route("calendars.create"), "_self");
    }

    // Edit
    const handleEventClick = (arg) => {
        window.open(route("calendars.show", arg.event.id), "_self");
    };

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
                            timeZone="Europe/Warsaw"
                            initialView="dayGridMonth"
                            events={items}
                            eventClick={handleEventClick}
                            editable={true}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
