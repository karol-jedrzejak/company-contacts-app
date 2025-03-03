import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import ButtonStandard from "@/Components/ButtonStandard";

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectEmployeeInput from "@/Components/SelectEmployeeInput";
import Modal from "@/Components/Modal";
import SelectInput from "@/Components/SelectInput";

import { useRef } from "react";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";

export default function Edit({
    auth,
    item,
    mode,
    employees,
    importance_types,
}) {
    const companies_employees_idInput = useRef();
    const topicInput = useRef();
    const importanceInput = useRef();
    const activeInput = useRef();

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
        topic: item.topic,
        importance: item.importance,
        active: item.active,
    });

    // Functions
    const change = (e) => {
        e.preventDefault();

        if (mode == "add") {
            post(route("sales_contacts.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    window.open(route("sales_contacts.index"), "_self");
                },
                onError: (errors) => {
                    if (errors.companies_employees_id) {
                        reset("companies_employees_id");
                        companies_employees_idInput.current.focus();
                    }
                    if (errors.topic) {
                        reset("topic");
                        topicInput.current.focus();
                    }
                    if (errors.importance) {
                        reset("importance");
                        importanceInput.current.focus();
                    }
                    if (errors.active) {
                        reset("active");
                        activeInput.current.focus();
                    }
                },
            });
        } else {
            put(route("sales_contacts.update", item.id), {
                preserveScroll: true,
                onSuccess: () => {
                    window.open(route("sales_contacts.index"), "_self");
                },
                onError: (errors) => {
                    if (errors.companies_employees_id) {
                        reset("companies_employees_id");
                        companies_employees_idInput.current.focus();
                    }
                    if (errors.topic) {
                        reset("topic");
                        topicInput.current.focus();
                    }
                    if (errors.importance) {
                        reset("importance");
                        importanceInput.current.focus();
                    }
                    if (errors.active) {
                        reset("active");
                        activeInput.current.focus();
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
                    <Head title="Sales Contacts Add -> Add" />
                ) : (
                    <Head title="Sales Contacts Add -> Edit" />
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

                        {/* topic */}
                        <div className="mt-2  col-span-2">
                            <InputLabel htmlFor="topic" value="Name" />
                            <TextInput
                                id="topic"
                                name="topic"
                                ref={topicInput}
                                value={data.topic}
                                onChange={(e) =>
                                    setData("topic", e.target.value)
                                }
                                className="mt-2 block w-full"
                                required
                            />
                            <InputError
                                message={errors.topic}
                                className="mt-2"
                            />
                        </div>

                        {/* importance */}
                        <div className="mt-2  col-span-2">
                            <InputLabel
                                htmlFor="importance"
                                value="Importance"
                            />
                            <SelectInput
                                id="importance"
                                name="importance"
                                ref={importanceInput}
                                value={data.importance}
                                className="mt-2 block w-full"
                                onChange={(e) =>
                                    setData("importance", e.target.value)
                                }
                                options={importance_types}
                                required
                            />
                            <InputError
                                message={errors.importance}
                                className="mt-2"
                            />
                        </div>

                        {/* active */}
                        <div className="mt-2 col-span-2">
                            <InputLabel htmlFor="active" value="active" />
                            <SelectInput
                                id="active"
                                name="active"
                                ref={activeInput}
                                value={data.active}
                                yesNo={true}
                                className="mt-2 block w-full"
                                onChange={(e) =>
                                    setData("active", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.active}
                                className="mt-2"
                            />
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
