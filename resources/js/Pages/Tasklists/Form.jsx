import React from "react";

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function Form({}) {
    return (
        <>
            <div>
                <InputLabel htmlFor="Description" value="Description" />

                <TextInput
                    id="Description"
                    name="Description"
                    //value={data.Description}
                    className="mt-1 block w-full"
                    autoComplete="Description"
                    isFocused={true}
                    //onChange={(e) => setData("Description", e.target.value)}
                    required
                />

                <InputError
                    //message={errors.Description}
                    className="mt-2"
                />
            </div>
        </>
    );
}
