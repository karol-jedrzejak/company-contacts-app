import React from "react";

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";

import { useRef } from "react";
import { useForm } from "@inertiajs/react";

export default function Form({ importance_types, item }) {
    const importanceInput = useRef();
    const descriptionInput = useRef();

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        importance: item.importance,
        description: item.description,
    });

    return (
        <>
            {/* Description */}
            <div className="mt-2">
                <InputLabel htmlFor="description" value="Description" />
                <TextInput
                    id="description"
                    name="description"
                    className="mt-2 block w-full"
                    required
                />
                <InputError
                    /* message={errors.description} */ className="mt-2"
                />
            </div>
            {/* Importance */}
            <div className="mt-2">
                <InputLabel htmlFor="importance" value="Importance" />
                <SelectInput
                    id="importance"
                    name="importance"
                    className="mt-2 block w-full"
                    options={importance_types}
                    required
                />
                <InputError
                    /* message={errors.importance}  */ className="mt-2"
                />
            </div>
        </>
    );
}
