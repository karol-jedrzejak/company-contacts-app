export default function BadgeTable({ bdg_style = "", children, ...props }) {
    let stylingClassNames = "bg-green-500 text-white";

    switch (bdg_style) {
        case "high":
            stylingClassNames = "bg-red-500 text-white";
            break;
        case "medium":
            stylingClassNames = "bg-yellow-500 text-gray-900";
            break;

        default:
            break;
    }

    return (
        <div
            {...props}
            className={
                stylingClassNames +
                ` inline-flex items-center px-4 py-2 rounded-md font-semibold text-xs uppercase`
            }
        >
            {children}
        </div>
    );
}
