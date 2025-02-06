import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function SelectInput(
    {
        type = "text",
        className = "",
        isFocused = false,
        yesNo = false,
        options,
        ...props
    },
    ref
) {
    const select = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            select.current.focus();
        }
    }, []);

    // test //

    return (
        /*         <input
            {...props}
            type={type}
            className={
                "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm " +
                className
            }
            ref={input}
        /> */
        <select
            {...props}
            className={
                "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm " +
                className
            }
            ref={select}
        >
            {yesNo ? (
                <>
                    <option key={1} value={1}>
                        Yes
                    </option>
                    <option key={2} value={0}>
                        No
                    </option>
                </>
            ) : (
                <>
                    {options.map((value, id) => {
                        let text =
                            value.charAt(0).toUpperCase() + value.substr(1);
                        return (
                            <option key={id} value={value}>
                                {text}
                            </option>
                        );
                    })}
                </>
            )}
        </select>
    );
});
