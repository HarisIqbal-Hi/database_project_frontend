import FilterInput from "@/components/places/FilterInput";
import {ChangeEvent, useState} from "react";

export default function FilterBar() {
    const [search, setSearch] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearch(event.target.value);
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            background: "#fdf6e3",
            borderRadius: '20px',
            padding: '1rem 1.5rem',
            marginBottom: '1.3rem',
            gap: '1.2rem',
        }}>
            {/* Example SVG icons for categories */}
            <FilterInput
                value={search}
                onChange={handleChange}
                placeholder="Filter by category..."
            />
        </div>
    );
}