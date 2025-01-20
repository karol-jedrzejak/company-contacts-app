import React from "react";

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import ButtonStandard from "@/Components/ButtonStandard";
import Message from "@/Components/Message";
import Modal from "@/Components/Modal";

import { useForm } from "@inertiajs/react";

export default function AddForm({
    addMessageShow,
    setAddMessageShow,
    addModal,
    closeAddModal,
    importance_types,
    new_task,
}) {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        description: "",
        importance: "",
    });

    const addTask = (e) => {
        e.preventDefault();

        post(route("tasklists.store"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {},
        });
        closeAddModal();
        setAddMessageShow(true);
    };

    return (
        <>
            <Message
                color="green"
                message="Item was successfully added."
                messageShow={addMessageShow}
                setMessageShow={setAddMessageShow}
            />

            <Modal show={addModal} onClose={closeAddModal}>
                <form onSubmit={addTask} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Add Item
                    </h2>

                    <hr className="h-px mt-2 mb-6 bg-gray-200 border-0 dark:bg-gray-700" />

                    <div className="mt-2">
                        {/* Description */}
                        <InputLabel htmlFor="description" value="Description" />
                        <TextInput
                            id="description"
                            name="description"
                            value={new_task.description}
                            className="mt-1 block w-full"
                            autoComplete="description"
                            isFocused={true}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            required
                        />
                        <InputError
                            //message={errors.description}
                            className="mt-2"
                        />
                        {/* Importance */}
                        <InputLabel htmlFor="importance" value="Importance" />
                        <SelectInput
                            id="importance"
                            name="importance"
                            value={new_task.importance}
                            className="mt-2 block w-full"
                            autoComplete="importance"
                            isFocused={true}
                            options={importance_types}
                            onChange={(e) =>
                                setData("importance", e.target.value)
                            }
                            required
                        />
                        <InputError
                            //message={errors.importance}
                            className="mt-2"
                        />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <ButtonStandard btn_style="green" type="submit">
                            Add
                        </ButtonStandard>
                        <ButtonStandard
                            className="ms-3"
                            onClick={closeAddModal}
                        >
                            Cancel
                        </ButtonStandard>
                    </div>
                </form>
            </Modal>
        </>
    );
}
