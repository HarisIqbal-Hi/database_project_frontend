import FilterInput from "@/components/places/FilterInput";
import {ChangeEvent, useState} from "react";
import {useFavorites} from "@/features/favorite/hooks/useFavorites";
import styles from "./FilterInput.module.scss";
import Image from "next/image";

interface FilterBarProps {
    interests: string[]
}

export type FilterType = string | "favorite" | "visited" | "all";

interface FilterBarProps {
    interests: string[];
    onFilterChange: (filter: { search: string; category: FilterType }) => void;
}

export default function FilterBar({interests, onFilterChange}: FilterBarProps) {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<FilterType>("all");

    const handleSearch = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log("handleSearch", event.target.value);
        setSearch(event.target.value);
        onFilterChange({search: event.target.value, category: selected});
    };

    const handleFilterClick = (filter: FilterType) => {
        setSelected(filter);
        onFilterChange({search, category: filter});
    };


    return (
        <>
            <div style={{

                background: "#fdf6e3",
                borderRadius: '20px',
                padding: '1rem 1.5rem',
                marginBottom: '1.3rem',
                gap: '1.2rem',
            }}>
                {/* Example SVG icons for categories */}
                <FilterInput
                    value={search}
                    onChange={handleSearch}
                    placeholder="Filter by category..."
                />
                <div style={{
                    marginTop: '1rem',
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '.5rem',
                }}>
                    {interests?.map((interest, index) => (
                        <div key={index} className={`${styles.filter_icon} ${selected === interest ? styles.selected : ""}`}>
                            <Image
                                className={`${styles.icon}`}
                                src={`/icons/${interest}.svg`}
                                alt={interest}
                                width={32}
                                height={32}
                                onClick={() => handleFilterClick(interest)}
                                style={{cursor: 'pointer'}}
                            />
                        </div>
                    ))}
                    <div className={`${styles.filter_icon} ${selected === "favorite" ? styles.selected : ""}`}>
                        <Image
                            className={`${styles.icon} `}
                            src="/icons/favorite.svg"
                            alt="favorite"
                            width={32}
                            height={32}
                            onClick={() => handleFilterClick("favorite")}
                            style={{cursor: 'pointer'}}
                        />
                    </div>
                    <div className={`${styles.filter_icon} ${selected === "visited" ? styles.selected : ""}`}>
                        <Image
                            className={`${styles.icon}`}
                            src="/icons/visited.svg"
                            alt="visited"
                            width={32}
                            height={32}
                            onClick={() => handleFilterClick("visited")}
                            style={{cursor: 'pointer'}}
                        />
                    </div>
                    <div className={`${styles.filter_icon} ${selected === "all" ? styles.selected : ""}`}>
                        <Image
                            className={`${styles.icon}`}
                            src="/icons/all.svg"
                            alt="all"
                            width={32}
                            height={32}
                            onClick={() => handleFilterClick("all")}
                            style={{cursor: 'pointer'}}
                        />
                    </div>
                </div>
            </div>

        </>
    );
}