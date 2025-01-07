import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import ButtonStandard from "@/Components/ButtonStandard";

export default function Index({ auth, tasklists }) {
    function destroy(e) {
        if (confirm("Are you sure you want to delete this task?")) {
            router.delete(
                route(
                    "tasklists.destroy",
                    e.currentTarget.getAttribute("target_id")
                )
            );
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    TASKLIST
                </h2>
            }
        >
            <Head title="Tasklists" />
            <table className="table-fixed w-full p-12 m-12">
                <thead>
                    <tr className="bg-gray-100 p-16">
                        <th className="px-4 py-2 w-20">No.</th>

                        <th className="px-4 py-2">Title</th>

                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {tasklists.map(({ id, description }) => (
                        <tr key={id}>
                            <td className="border px-4 py-2">{id}</td>

                            <td className="border px-4 py-2">{description}</td>

                            <td className="border px-4 py-2">
                                <ButtonStandard
                                    btn_style=""
                                    className="mx-2"
                                    link={route("tasklists.edit", id)}
                                >
                                    Edit
                                </ButtonStandard>

                                <ButtonStandard
                                    btn_style="secondary"
                                    className="mx-2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = window.location =
                                            route("tasklists.edit", id);
                                    }}
                                >
                                    Edit
                                </ButtonStandard>

                                <ButtonStandard
                                    btn_style="danger"
                                    className="mx-2"
                                    target_id={id}
                                    tabIndex="-1"
                                    onClick={destroy}
                                >
                                    Delete
                                </ButtonStandard>
                            </td>
                        </tr>
                    ))}

                    {tasklists.length === 0 && (
                        <tr>
                            <td className="px-6 py-4 border-t" colSpan="4">
                                No tasks found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </AuthenticatedLayout>
    );
}
