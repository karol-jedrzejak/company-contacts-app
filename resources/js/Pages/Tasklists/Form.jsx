import React from "react";

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function Form({}) {
    return (
        <>
            <div>
                <InputLabel htmlFor="name" value="Name" />

                <TextInput
                    id="name"
                    name="name"
                    //value={data.name}
                    className="mt-1 block w-full"
                    autoComplete="name"
                    isFocused={true}
                    //onChange={(e) => setData("name", e.target.value)}
                    required
                />

                <InputError
                    //message={errors.name}
                    className="mt-2"
                />
            </div>
        </>
    );
}
