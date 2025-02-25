import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import ButtonStandard from "@/Components/ButtonStandard";

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectEmployeeInput from "@/Components/SelectEmployeeInput";
import Modal from "@/Components/Modal";

import { useRef } from "react";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";

export default function Edit({ auth, item, mode, employees }) {
    const companies_employees_idInput = useRef();
    const titleInput = useRef();
    const startInput = useRef();
    const endInput = useRef();

    if (item.companies_employees_id == "") {
        item.companies_employees_id = employees[0].id;
    }

    const {
        data,
        setData,
        errors,
        put,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        companies_employees_id: item.companies_employees_id,
        title: item.title,
        start: item.start,
        end: item.end,
    });

    // Functions
    const change = (e) => {
        e.preventDefault();

        if (mode == "add") {
            post(route("calendars.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    window.open(route("calendars.index"), "_self");
                },
                onError: (errors) => {
                    if (errors.companies_employees_id) {
                        reset("companies_employees_id");
                        companies_employees_idInput.current.focus();
                    }
                    if (errors.title) {
                        reset("title");
                        titleInput.current.focus();
                    }
                    if (errors.start) {
                        reset("start");
                        startInput.current.focus();
                    }
                    if (errors.end) {
                        reset("end");
                        endInput.current.focus();
                    }
                },
            });
        } else {
            put(route("calendars.update", item.id), {
                preserveScroll: true,
                onSuccess: () => {
                    window.open(route("calendars.index"), "_self");
                },
                onError: (errors) => {
                    if (errors.companies_employees_id) {
                        reset("companies_employees_id");
                        companies_employees_idInput.current.focus();
                    }
                    if (errors.title) {
                        reset("title");
                        titleInput.current.focus();
                    }
                    if (errors.start) {
                        reset("start");
                        startInput.current.focus();
                    }
                    if (errors.end) {
                        reset("end");
                        endInput.current.focus();
                    }
                },
            });
        }
    };

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
                {mode == "add" ? (
                    <Head title="Calendar -> Add" />
                ) : (
                    <Head title="Calendar -> Edit" />
                )}

                <div className="flex flex-col justify-center items-center">
                    <form
                        onSubmit={change}
                        className="p-6 grid grid-cols-2 gap-1 w-4/5"
                    >
                        <h2 className="text-lg font-medium text-gray-900 col-span-2">
                            {mode == "add" ? <>Add Item</> : <>Edit Item</>}
                        </h2>

                        <hr className="h-px mt-2 mb-6 bg-gray-200 border-0 dark:bg-gray-700 col-span-2" />

                        {mode == "edit" ? (
                            <input
                                type="hidden"
                                id="id"
                                name="id"
                                value={item.id}
                            />
                        ) : (
                            <></>
                        )}

                        {/* companies_employees_id */}
                        <div className="mt-2 col-span-2">
                            <InputLabel
                                htmlFor="companies_employees_id"
                                value="Company Employee"
                            />
                            <SelectEmployeeInput
                                id="companies_employees_id"
                                name="companies_employees_id"
                                ref={companies_employees_idInput}
                                value={data.companies_employees_id}
                                onChange={(e) =>
                                    setData(
                                        "companies_employees_id",
                                        e.target.value
                                    )
                                }
                                className="mt-2 block w-full"
                                employees={employees}
                                required
                            />
                            <InputError
                                message={errors.companies_employees_id}
                                className="mt-2"
                            />
                        </div>

                        {/* title */}
                        <div className="mt-2  col-span-2">
                            <InputLabel htmlFor="title" value="Name" />
                            <TextInput
                                id="title"
                                name="title"
                                ref={titleInput}
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="mt-2 block w-full"
                                required
                            />
                            <InputError
                                message={errors.title}
                                className="mt-2"
                            />
                        </div>

                        {/* start */}
                        <div className="mt-2  col-span-2">
                            <InputLabel htmlFor="start" value="Start" />
                            <TextInput
                                id="start"
                                name="start"
                                ref={startInput}
                                value={data.start}
                                type="datetime-local"
                                onChange={(e) =>
                                    setData("start", e.target.value)
                                }
                                className="mt-2 block w-full"
                                required
                            />
                            <InputError
                                message={errors.start}
                                className="mt-2"
                            />
                        </div>

                        {/* end */}
                        <div className="mt-2  col-span-2">
                            <InputLabel htmlFor="end" value="End" />
                            <TextInput
                                id="end"
                                name="end"
                                ref={endInput}
                                value={data.end}
                                type="datetime-local"
                                onChange={(e) => setData("end", e.target.value)}
                                className="mt-2 block w-full"
                                required
                            />
                            <InputError message={errors.end} className="mt-2" />
                        </div>

                        {mode == "add" ? (
                            <div className="col-span-2 mt-6 flex justify-end">
                                <ButtonStandard
                                    btn_style="green"
                                    disabled={processing}
                                    type="submit"
                                >
                                    Add
                                </ButtonStandard>
                            </div>
                        ) : (
                            <div className="col-span-2 mt-6 flex justify-end">
                                <ButtonStandard
                                    btn_style="yellow"
                                    disabled={processing}
                                    type="submit"
                                >
                                    Update
                                </ButtonStandard>
                            </div>
                        )}
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
