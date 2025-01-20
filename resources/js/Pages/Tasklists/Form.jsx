import React from "react";

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";

export default function Form({ importance_types }) {
    return (
        <>
            {/* Description */}
            <div className="mt-2">
                <InputLabel htmlFor="description" value="Description" />
                <TextInput
                    id="description"
                    name="description"
                    //value={data.description}
                    className="mt-1 block w-full"
                    autoComplete="description"
                    isFocused={true}
                    //onChange={(e) => setData("description", e.target.value)}
                    required
                />
                <InputError
                    //message={errors.description}
                    className="mt-2"
                />
            </div>
            {/* Importance */}
            <div className="mt-2">
                <InputLabel htmlFor="importance" value="Importance" />
                <SelectInput
                    id="importance"
                    name="importance"
                    //value={data.importance}
                    className="mt-2 block w-full"
                    autoComplete="importance"
                    isFocused={true}
                    options={importance_types}
                    //onChange={(e) => setData("importance", e.target.value)}
                    required
                />
                <InputError
                    //message={errors.importance}
                    className="mt-2"
                />
            </div>
        </>
    );
}
