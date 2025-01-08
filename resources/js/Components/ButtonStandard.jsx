export default function ButtonStandard({
    link = false,
    type = "button",
    btn_style = "",
    className = "",
    disabled,
    children,
    ...props
}) {
    let stylingClassNames =
        "border-transparent bg-indigo-400 text-white hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 ";

    switch (btn_style) {
        case "danger":
            stylingClassNames =
                "border-transparent bg-red-600 text-white hover:bg-red-500 focus:bg-gray-700 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 ";
            break;
        case "secondary":
            stylingClassNames =
                "border-1 border-gray-500 bg-white text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ";
            break;

        default:
            break;
    }

    if (link) {
        return (
            <button
                {...props}
                type={type}
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href = window.location = link;
                }}
                className={
                    stylingClassNames +
                    ` inline-flex items-center px-4 py-2 border rounded-md font-semibold text-xs uppercase tracking-widest focus:ring-offset-2 transition ease-in-out duration-150 ${
                        disabled && "opacity-25"
                    } ` +
                    className
                }
                disabled={disabled}
            >
                {children}
            </button>
        );
    } else {
        return (
            <button
                {...props}
                type={type}
                className={
                    stylingClassNames +
                    `inline-flex items-center px-4 py-2 border rounded-md font-semibold text-xs uppercase tracking-widest  focus:ring-offset-2 transition ease-in-out duration-150 ${
                        disabled && "opacity-25"
                    } ` +
                    className
                }
                disabled={disabled}
            >
                {children}
            </button>
        );
    }
}
