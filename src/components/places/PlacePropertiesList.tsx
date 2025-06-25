import React from "react";
import {formatPlaceProperties} from "@/utils/formatPlaceProperties";
import {capitalizeFirstWord} from "@/utils/text";

type Props = { properties: Record<string, any> };

export function PlacePropertiesList({ properties }: Props) {
    const formatted = formatPlaceProperties(properties);

    if (!formatted.length) return <p>No additional information available.</p>;

    return (
        <ul>
            {formatted.map(({ label, value }) => (
                <li
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "black",
                        marginBottom: ".5rem"
                    }}
                    key={label}
                >
                    <strong>{label}: </strong>
                    <span style={label === "Opening Hours" ? { whiteSpace: "pre-line", textAlign: "left", maxWidth: 320 } : {}}>
                        {label === "Opening Hours"
                            ? String(value).split(/[,;]\s*/).join("\n")
                            : Array.isArray(value)
                                ? value.join(", ")
                                : capitalizeFirstWord(value)
                        }
                    </span>
                </li>
            ))}
        </ul>
    );
}