import React from "react";

export default function Message({ color, message }) {
    let classes = "fixed bottom-4 right-4 rounded-lg p-2 m-4 text-lg";
    switch (color) {
        case "green":
            classes += " bg-green-700 text-black";
            break;

        case "red":
            classes += " bg-red-700 text-white";
            break;

        case "yellow":
            classes += " bg-yellow-400 text-black";
            break;

        default:
            break;
    }

    return <div className={classes}>{message}</div>;
}
