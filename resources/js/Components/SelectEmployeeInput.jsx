import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function SelectEmployeeInput(
    { className = "", isFocused = false, employees, ...props },
    ref
) {
    const select = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            select.current.focus();
        }
    }, []);

    return (
        <select
            {...props}
            className={
                "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm " +
                className
            }
            ref={select}
        >
            {employees.map((value) => {
                return (
                    <option key={value.id} value={value.id}>
                        {value.name} {value.surname} [{value.company_name}]
                    </option>
                );
            })}
        </select>
    );
});
