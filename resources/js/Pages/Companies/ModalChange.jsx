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
    const descriptionInput = useRef();
    const importanceInput = useRef();

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
        description: item.description,
        importance: item.importance,
    });

    const closeModal = () => {
        setShowModal(false);
    };

    // Functions
    const change = (e) => {
        e.preventDefault();

        if (mode == "add") {
            post(route("tasklists.store"), {
                preserveScroll: true,
                onSuccess: () => reset(),
                onError: (errors) => {
                    if (errors.description) {
                        reset("description");
                        descriptionInput.current.focus();
                    }

                    if (errors.importance) {
                        reset("importance");
                        importanceInput.current.focus();
                    }
                },
            });

            changeMessage({
                color: "green",
                text: "Company was successfully added.",
            });
        } else {
            put(route("tasklists.update", item.id), {
                preserveScroll: true,
                onSuccess: () => reset(),
                onError: (errors) => {
                    if (errors.description) {
                        reset("description");
                        descriptionInput.current.focus();
                    }

                    if (errors.importance) {
                        reset("importance");
                        importanceInput.current.focus();
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
                <form onSubmit={change} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        {mode == "add" ? <>Add Item</> : <>Edit Item</>}
                    </h2>

                    <hr className="h-px mt-2 mb-6 bg-gray-200 border-0 dark:bg-gray-700" />

                    {/* Description */}
                    <div className="mt-2">
                        <InputLabel htmlFor="description" value="Description" />
                        <TextInput
                            id="description"
                            name="description"
                            ref={descriptionInput}
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="mt-2 block w-full"
                            required
                        />
                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>
                    {/* Importance */}
                    <div className="mt-2">
                        <InputLabel htmlFor="importance" value="Importance" />
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
                    <div className="mt-6 flex justify-end">
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
