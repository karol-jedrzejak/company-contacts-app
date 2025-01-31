import React from "react";

import ButtonStandard from "@/Components/ButtonStandard";
import Modal from "@/Components/Modal";

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";

import { useRef } from "react";
import { useForm } from "@inertiajs/react";

export default function ModalChange({
    showModal,
    setShowModal,
    changeMessage,
    item,
    mode,
}) {
    const nipInput = useRef();
    const name_shortInput = useRef();
    const name_completeInput = useRef();
    const adress_numberInput = useRef();
    const adress_streetInput = useRef();
    const adress_cityInput = useRef();
    const adress_postcodeInput = useRef();
    const countryInput = useRef();
    const coordinate_latitudeInput = useRef();
    const coordinate_longitudeInput = useRef();
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
        nip: item.nip,
        importance: item.importance,
        nip: item.nip,
        name_short: item.name_short,
        name_complete: item.name_complete,
        adress_number: item.adress_number,
        adress_street: item.adress_street,
        adress_city: item.adress_city,
        adress_postcode: item.adress_postcode,
        country: item.country,
        coordinate_latitude: item.coordinate_latitude,
        coordinate_longitude: item.coordinate_longitude,
        active: item.active,
    });

    const closeModal = () => {
        setShowModal(false);
    };

    // Functions
    const change = (e) => {
        e.preventDefault();

        if (mode == "add") {
            post(route("companies.store"), {
                preserveScroll: true,
                onSuccess: () => reset(),
                onError: (errors) => {
                    if (errors.nip) {
                        reset("nip");
                        nipInput.current.focus();
                    }
                    if (errors.name_short) {
                        reset("name_short");
                        name_shortInput.current.focus();
                    }
                    if (errors.name_complete) {
                        reset("name_complete");
                        name_completeInput.current.focus();
                    }
                    if (errors.adress_number) {
                        reset("adress_number");
                        adress_numberInput.current.focus();
                    }
                    if (errors.adress_street) {
                        reset("adress_street");
                        adress_streetInput.current.focus();
                    }
                    if (errors.adress_city) {
                        reset("adress_city");
                        adress_cityInput.current.focus();
                    }
                    if (errors.adress_postcode) {
                        reset("adress_postcode");
                        adress_postcodeInput.current.focus();
                    }
                    if (errors.country) {
                        reset("country");
                        countryInput.current.focus();
                    }
                    if (errors.coordinate_latitude) {
                        reset("coordinate_latitude");
                        coordinate_latitudeInput.current.focus();
                    }
                    if (errors.coordinate_longitude) {
                        reset("coordinate_longitude");
                        coordinate_longitudeInput.current.focus();
                    }
                    if (errors.active) {
                        reset("active");
                        activeInput.current.focus();
                    }
                },
            });

            changeMessage({
                color: "green",
                text: "Company was successfully added.",
            });
        } else {
            put(route("companies.update", item.id), {
                preserveScroll: true,
                onSuccess: () => reset(),
                onError: (errors) => {
                    if (errors.nip) {
                        reset("nip");
                        nipInput.current.focus();
                    }
                    if (errors.name_short) {
                        reset("name_short");
                        name_shortInput.current.focus();
                    }
                    if (errors.name_complete) {
                        reset("name_complete");
                        name_completeInput.current.focus();
                    }
                    if (errors.adress_number) {
                        reset("adress_number");
                        adress_numberInput.current.focus();
                    }
                    if (errors.adress_street) {
                        reset("adress_street");
                        adress_streetInput.current.focus();
                    }
                    if (errors.adress_city) {
                        reset("adress_city");
                        adress_cityInput.current.focus();
                    }
                    if (errors.adress_postcode) {
                        reset("adress_postcode");
                        adress_postcodeInput.current.focus();
                    }
                    if (errors.country) {
                        reset("country");
                        countryInput.current.focus();
                    }
                    if (errors.coordinate_latitude) {
                        reset("coordinate_latitude");
                        coordinate_latitudeInput.current.focus();
                    }
                    if (errors.coordinate_longitude) {
                        reset("coordinate_longitude");
                        coordinate_longitudeInput.current.focus();
                    }
                    if (errors.active) {
                        reset("active");
                        activeInput.current.focus();
                    }
                },
            });

            changeMessage({
                color: "green",
                text: "Company was successfully updated.",
            });
        }

        closeModal();
    };

    return (
        <>
            <Modal show={showModal} onClose={closeModal}>
                <form onSubmit={change} className="p-6 grid grid-cols-2 gap-1">
                    <h2 className="text-lg font-medium text-gray-900 col-span-2">
                        {mode == "add" ? <>Add Item</> : <>Edit Item</>}
                    </h2>

                    <hr className="h-px mt-2 mb-6 bg-gray-200 border-0 dark:bg-gray-700 col-span-2" />

                    {/* nip */}
                    <div className="mt-2 col-span-2">
                        <InputLabel htmlFor="nip" value="nip" />
                        <TextInput
                            id="nip"
                            name="nip"
                            ref={nipInput}
                            value={data.nip}
                            onChange={(e) => setData("nip", e.target.value)}
                            className="mt-2 block w-full"
                            required
                        />
                        <InputError message={errors.nip} className="mt-2" />
                    </div>
                    {/* name_short */}
                    <div className="mt-2  col-span-2">
                        <InputLabel htmlFor="name_short" value="name_short" />
                        <TextInput
                            id="name_short"
                            name="name_short"
                            ref={name_shortInput}
                            value={data.name_short}
                            onChange={(e) =>
                                setData("name_short", e.target.value)
                            }
                            className="mt-2 block w-full"
                            required
                        />
                        <InputError
                            message={errors.name_short}
                            className="mt-2"
                        />
                    </div>
                    {/* name_complete */}
                    <div className="mt-2  col-span-2">
                        <InputLabel
                            htmlFor="name_complete"
                            value="name_complete"
                        />
                        <TextInput
                            id="name_complete"
                            name="name_complete"
                            ref={name_completeInput}
                            value={data.name_complete}
                            onChange={(e) =>
                                setData("name_complete", e.target.value)
                            }
                            className="mt-2 block w-full"
                            required
                        />
                        <InputError
                            message={errors.name_complete}
                            className="mt-2"
                        />
                    </div>
                    {/* adress_street */}
                    <div className="mt-2">
                        <InputLabel
                            htmlFor="adress_street"
                            value="adress_street"
                        />
                        <TextInput
                            id="adress_street"
                            name="adress_street"
                            ref={adress_streetInput}
                            value={data.adress_street}
                            onChange={(e) =>
                                setData("adress_street", e.target.value)
                            }
                            className="mt-2 block w-full"
                            required
                        />
                        <InputError
                            message={errors.adress_street}
                            className="mt-2"
                        />
                    </div>
                    {/* adress_number */}
                    <div className="mt-2">
                        <InputLabel
                            htmlFor="adress_number"
                            value="adress_number"
                        />
                        <TextInput
                            id="adress_number"
                            name="adress_number"
                            ref={adress_numberInput}
                            value={data.adress_number}
                            onChange={(e) =>
                                setData("adress_number", e.target.value)
                            }
                            className="mt-2 block w-full"
                            required
                        />
                        <InputError
                            message={errors.adress_number}
                            className="mt-2"
                        />
                    </div>
                    {/* adress_city */}
                    <div className="mt-2">
                        <InputLabel htmlFor="adress_city" value="adress_city" />
                        <TextInput
                            id="adress_city"
                            name="adress_city"
                            ref={adress_cityInput}
                            value={data.adress_city}
                            onChange={(e) =>
                                setData("adress_city", e.target.value)
                            }
                            className="mt-2 block w-full"
                            required
                        />
                        <InputError
                            message={errors.adress_city}
                            className="mt-2"
                        />
                    </div>
                    {/* adress_postcode */}
                    <div className="mt-2">
                        <InputLabel
                            htmlFor="adress_postcode"
                            value="adress_postcode"
                        />
                        <TextInput
                            id="adress_postcode"
                            name="adress_postcode"
                            ref={adress_postcodeInput}
                            value={data.adress_postcode}
                            onChange={(e) =>
                                setData("adress_postcode", e.target.value)
                            }
                            className="mt-2 block w-full"
                            required
                        />
                        <InputError
                            message={errors.adress_postcode}
                            className="mt-2"
                        />
                    </div>
                    {/* country */}
                    <div className="mt-2  col-span-2">
                        <InputLabel htmlFor="country" value="country" />
                        <TextInput
                            id="country"
                            name="country"
                            ref={countryInput}
                            value={data.country}
                            onChange={(e) => setData("country", e.target.value)}
                            className="mt-2 block w-full"
                            required
                        />
                        <InputError message={errors.country} className="mt-2" />
                    </div>
                    {/* coordinate_latitude */}
                    <div className="mt-2 col-span-1">
                        <InputLabel
                            htmlFor="coordinate_latitude"
                            value="coordinate_latitude"
                        />
                        <TextInput
                            id="coordinate_latitude"
                            name="coordinate_latitude"
                            ref={coordinate_latitudeInput}
                            value={data.coordinate_latitude}
                            onChange={(e) =>
                                setData("coordinate_latitude", e.target.value)
                            }
                            className="mt-2 block w-full"
                            required
                        />
                        <InputError
                            message={errors.coordinate_latitude}
                            className="mt-2"
                        />
                    </div>
                    {/* coordinate_longitude */}
                    <div className="mt-2 col-span-1">
                        <InputLabel
                            htmlFor="coordinate_longitude"
                            value="coordinate_longitude"
                        />
                        <TextInput
                            id="coordinate_longitude"
                            name="coordinate_longitude"
                            ref={coordinate_longitudeInput}
                            value={data.coordinate_longitude}
                            onChange={(e) =>
                                setData("coordinate_longitude", e.target.value)
                            }
                            className="mt-2 block w-full"
                            required
                        />
                        <InputError
                            message={errors.coordinate_longitude}
                            className="mt-2"
                        />
                    </div>
                    {/* active */}
                    <div className="mt-2 col-span-2">
                        <InputLabel htmlFor="active" value="active" />
                        <TextInput
                            id="active"
                            name="active"
                            ref={activeInput}
                            value={data.active}
                            onChange={(e) => setData("active", e.target.value)}
                            className="mt-2 block w-full"
                            required
                        />
                        <InputError message={errors.active} className="mt-2" />
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
                        <ButtonStandard className="ms-3" onClick={closeModal}>
                            Cancel
                        </ButtonStandard>
                    </div>
                </form>
            </Modal>
        </>
    );
}
