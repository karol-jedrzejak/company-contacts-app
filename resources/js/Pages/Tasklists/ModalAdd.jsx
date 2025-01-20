import ButtonStandard from "@/Components/ButtonStandard";
import Modal from "@/Components/Modal";
import React from "react";
import Message from "@/Components/Message";
import { useState } from "react";
import { router } from "@inertiajs/react";

export default function ModalAdd({
    showModal,
    setShowModal,
    importance_types,
}) {
    const [messageShow, setMessageShow] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    };

    // Functions
    const add = (e) => {};

    return (
        <>
            <Message
                color="green"
                message="Item was successfully added."
                messageShow={messageShow}
                setMessageShow={setMessageShow}
            />

            <Modal show={addModal} onClose={closeModal}>
                <form onSubmit={add} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Add Item
                    </h2>

                    <hr className="h-px mt-2 mb-6 bg-gray-200 border-0 dark:bg-gray-700" />

                    <Form importance_types={importance_types}></Form>
                    <div className="mt-6 flex justify-end">
                        <ButtonStandard btn_style="green" type="submit">
                            Add
                        </ButtonStandard>
                        <ButtonStandard className="ms-3" onClick={closeModal}>
                            Cancel
                        </ButtonStandard>
                    </div>
                </form>
            </Modal>
        </>
    );
}
