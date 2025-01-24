import ButtonStandard from "@/Components/ButtonStandard";
import Modal from "@/Components/Modal";
import React from "react";
import { router } from "@inertiajs/react";

export default function ModalDestroy({
    deletionTarget,
    showModal,
    setShowModal,
    changeMessage,
}) {
    const closeModal = () => {
        setShowModal(false);
    };

    // Functions
    const destroy = (e) => {
        e.preventDefault();
        closeModal();
        router.delete(route("tasklists.destroy", deletionTarget.id));
        changeMessage("destroy");
    };

    return (
        <>
            <Modal show={showModal} onClose={closeModal}>
                <form onSubmit={destroy} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Confirm
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Are you sure you want to delete this ?
                    </p>

                    <div className="mt-6 flex justify-end">
                        <ButtonStandard btn_style="danger" type="submit">
                            Delete
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
