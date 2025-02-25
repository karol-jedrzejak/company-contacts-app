import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import ButtonStandard from "@/Components/ButtonStandard";

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";

import { useRef } from "react";
import { useForm } from "@inertiajs/react";

export default function Edit({ company, auth, item, mode }) {
    const nipInput = useRef();
    const nameInput = useRef();
    const surnameInput = useRef();
    const positionInput = useRef();
    const mobileInput = useRef();
    const phoneInput = useRef();
    const emailInput = useRef();
    const activeInput = useRef();

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
        name: item.name,
        surname: item.surname,
        position: item.position,
        mobile: item.mobile,
        phone: item.phone,
        email: item.email,
        active: item.active,
    });

    function companyInfo() {
        window.open(route("companies.show", company.id), "_self");
    }

    // Functions
    const change = (e) => {
        e.preventDefault();

        if (mode == "add") {
            post(
                route("companies.employees.store", {
                    company: company.id,
                }),
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        window.open(
                            route("companies.employees.index", {
                                company: company.id,
                            }),
                            "_self"
                        );
                    },
                    onError: (errors) => {
                        if (errors.name) {
                            reset("name");
                            nameInput.current.focus();
                        }
                        if (errors.surname) {
                            reset("surname");
                            surnameInput.current.focus();
                        }
                        if (errors.position) {
                            reset("position");
                            positionInput.current.focus();
                        }
                        if (errors.mobile) {
                            reset("mobile");
                            mobileInput.current.focus();
                        }
                        if (errors.phone) {
                            reset("phone");
                            phoneInput.current.focus();
                        }
                        if (errors.email) {
                            reset("email");
                            emailInput.current.focus();
                        }
                        if (errors.active) {
                            reset("active");
                            activeInput.current.focus();
                        }
                    },
                }
            );
        } else {
            put(route("employees.update", item.id), {
                preserveScroll: true,
                onSuccess: () => {
                    window.open(
                        route("companies.employees.index", {
                            company: company.id,
                        }),
                        "_self"
                    );
                },
                onError: (errors) => {
                    if (errors.name) {
                        reset("name");
                        nameInput.current.focus();
                    }
                    if (errors.surname) {
                        reset("surname");
                        surnameInput.current.focus();
                    }
                    if (errors.position) {
                        reset("position");
                        positionInput.current.focus();
                    }
                    if (errors.mobile) {
                        reset("mobile");
                        mobileInput.current.focus();
                    }
                    if (errors.phone) {
                        reset("phone");
                        phoneInput.current.focus();
                    }
                    if (errors.email) {
                        reset("email");
                        emailInput.current.focus();
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
                        COMPANIES EMPLOYEES
                    </h2>
                }
            >
                {mode == "add" ? (
                    <Head title="Companies -> Add" />
                ) : (
                    <Head title="Companies -> Edit" />
                )}

                <div className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {company.surname}{" "}
                        <ButtonStandard className="mx-2" onClick={companyInfo}>
                            Show
                        </ButtonStandard>
                    </div>
                </div>

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

                        {/* name */}
                        <div className="mt-2">
                            <InputLabel htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                name="name"
                                ref={nameInput}
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="mt-2 block w-full"
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                        {/* surname */}
                        <div className="mt-2">
                            <InputLabel htmlFor="surname" value="Surname" />
                            <TextInput
                                id="surname"
                                name="surname"
                                ref={surnameInput}
                                value={data.surname}
                                onChange={(e) =>
                                    setData("surname", e.target.value)
                                }
                                className="mt-2 block w-full"
                                required
                            />
                            <InputError
                                message={errors.surname}
                                className="mt-2"
                            />
                        </div>
                        {/* position */}
                        <div className="mt-2 col-span-2">
                            <InputLabel htmlFor="position" value="Position" />
                            <TextInput
                                id="position"
                                name="position"
                                ref={positionInput}
                                value={data.position}
                                onChange={(e) =>
                                    setData("position", e.target.value)
                                }
                                className="mt-2 block w-full"
                                required
                            />
                            <InputError
                                message={errors.position}
                                className="mt-2"
                            />
                        </div>
                        {/* mobile */}
                        <div className="mt-2">
                            <InputLabel htmlFor="mobile" value="Mobile" />
                            <TextInput
                                id="mobile"
                                name="mobile"
                                ref={mobileInput}
                                value={data.mobile}
                                onChange={(e) =>
                                    setData("mobile", e.target.value)
                                }
                                className="mt-2 block w-full"
                                required
                            />
                            <InputError
                                message={errors.mobile}
                                className="mt-2"
                            />
                        </div>
                        {/* phone */}
                        <div className="mt-2">
                            <InputLabel htmlFor="phone" value="Phone" />
                            <TextInput
                                id="phone"
                                name="phone"
                                ref={phoneInput}
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                className="mt-2 block w-full"
                                required
                            />
                            <InputError
                                message={errors.phone}
                                className="mt-2"
                            />
                        </div>
                        {/* email */}
                        <div className="mt-2 col-span-2">
                            <InputLabel htmlFor="email" value="E-mail" />
                            <TextInput
                                id="email"
                                name="email"
                                ref={emailInput}
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="mt-2 block w-full"
                                required
                            />
                            <InputError
                                message={errors.email}
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

                        <div className="col-span-2 mt-6 flex justify-end">
                            {mode == "add" ? (
                                <ButtonStandard
                                    btn_style="green"
                                    disabled={processing}
                                    type="submit"
                                >
                                    Add
                                </ButtonStandard>
                            ) : (
                                <ButtonStandard
                                    btn_style="yellow"
                                    disabled={processing}
                                    type="submit"
                                >
                                    Update
                                </ButtonStandard>
                            )}
                        </div>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
