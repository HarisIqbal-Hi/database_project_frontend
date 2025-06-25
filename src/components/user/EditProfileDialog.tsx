import React, {ChangeEvent, useEffect, useState} from "react";
import styles from "./EditProfileDialog.module.scss";
import {EditProfileDialogProps, User} from "@/components/user/types";
import FloatingInput from "@/components/ui/FloatingInput";
import Image from "next/image";
import FloatingSelect from "@/components/ui/FloatingSelect";
import FloatingMultiSelect from "@/components/ui/FloatingSelect";
import {useUpdateUserProfile} from "@/features/user/hooks/useUpdateUserProfile";
import {useQueryClient} from "@tanstack/react-query";
import Tabs from "@/components/ui/Tabs";
import AchievementsTab from "@/components/user/AchievementsTab";

const INTEREST_OPTIONS = [
    {value: "museum", label: "Museum"},
    {value: "restaurant", label: "Restaurant"},
    {value: "theatre", label: "Theatre"},
    {value: "artwork", label: "Artwork"},
    {value: "hotel", label: "Hotel"},
    {value: "guest_house", label: "Guest House"},
    {value: "gallery", label: "Gallery"},
];

const TABS = [
    { label: "Profile", value: "profile" },
    { label: "Achievements", value: "achievements" },
];

export default function EditProfileDialog({open, onClose, user}: EditProfileDialogProps) {
    const [tab, setTab] = useState("profile");
    const reactQueryClient = useQueryClient();
    const [isLocationUpdated, setIsLocationUpdated] = useState(false);
    const [userState, setUserState] = useState({
        username: user.username || "",
        name: user.full_name || "",
        email: user.email || "",
        interests: user.interests || [],
        location: user.location || undefined,
    });
    const { mutate: updateUser, isPending, isSuccess, error } = useUpdateUserProfile();
    const [loadingLoc, setLoadingLoc] = useState(false);

    useEffect(() => {
        if (open && user) {
            console.log("user open", user);
            setUserState({
                name: user.full_name || "",
                username: user.username || "",
                email: user.email || "",
                interests: user.interests || [],
                location: user.location || undefined,
            });
        }
    }, [open, user]);

    const handleGetLocation = () => {
        setLoadingLoc(true);
        setIsLocationUpdated(false)
        navigator.geolocation.getCurrentPosition(
            pos => {
                setUserState(prev => ({
                    ...prev,
                    location: {lat: pos.coords.latitude, lng: pos.coords.longitude},
                }));
                setIsLocationUpdated(true);
                setLoadingLoc(false);
            },
            () => setLoadingLoc(false)
        );
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setUserState(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("user update", userState);
        updateUser(userState, {
            onSuccess: (data) => {
                console.log("success",data);
                onClose();
                reactQueryClient.invalidateQueries({ queryKey: ["user", "profile"] });
                // Optionally show a success toast/message
            },
            onError: (err: any) => {
                alert(err?.info?.error || "Failed to update profile");
            },
        });
    };

    const handleChangeInterests = (newInterests: string[]) => {
        // Enforce max 3
        if (newInterests.length > 3) {
            alert("You can only select up to 3 interests.");
            // Optionally: ignore extra, or just keep first three
            setUserState(prev => ({
                ...prev,
                interests: newInterests.slice(0, 3),
            }));
            return;
        }
        setUserState(prev => ({
            ...prev,
            interests: newInterests,
        }));
    };


    const handleRemoveInterest = (interest: string) => {
        setUserState(prev => ({
            ...prev,
            interests: prev.interests.filter(i => i !== interest),
        }));
    };
    if (!open) return null;

    return (
        <div onClick={onClose} className={styles.backdrop}>
            <div onClick={e => e.stopPropagation()} className={styles.dialog}>
                <div className={styles.avatarRow}>
                    <div className={styles.avatar}>
                        <Image className={`${styles.icon}`} src="/icons/user.svg" alt="search" width={80}
                               height={80}/>
                    </div>
                </div>
                <h2 className={styles.user_header}>{userState.username}</h2>
                <Tabs tabs={TABS} value={tab} onChange={val => setTab(val as string)} />
                {
                    tab === "profile" &&
                    <>
                        <h2 className={styles.header}>Edit Profile</h2>
                        <div className={styles.form_dialog}>
                            <form onSubmit={handleSubmit}>
                                <FloatingInput
                                    type="text"
                                    label="Full Name"
                                    name="name"
                                    value={userState.name}
                                    onChange={handleChange}
                                    required
                                />
                                <FloatingInput
                                    type="email"
                                    label="Email"
                                    name="email"
                                    value={userState.email}
                                    onChange={handleChange}
                                    required
                                />

                                {/* Interests as chips */}
                                <FloatingMultiSelect
                                    label="Interests"
                                    value={userState.interests}
                                    options={INTEREST_OPTIONS}
                                    onChange={handleChangeInterests}
                                    placeholder="Add interests..."
                                />
                                <div className={styles.locationRow}>
                                    <button
                                        type="button"
                                        onClick={handleGetLocation}
                                        disabled={loadingLoc}
                                        className={styles.saveBtn}
                                    >
                                        {
                                            loadingLoc ? "Locating..." :
                                                userState.location ? "Update My Location" : "Use My Location"
                                        }
                                    </button>
                                    {
                                        isLocationUpdated &&
                                        <div className={styles.locationInfo}>
                                            Your current location is updated successfully.
                                        </div>
                                    }
                                </div>
                                <div className={styles.actions}>
                                    <button type="button" onClick={onClose} className={styles.cancelBtn}>
                                        Cancel
                                    </button>
                                    <button type="submit" className={styles.saveBtn}>
                                        {isPending ? "Locating..." : "Save Changes"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                }

                {
                    tab === "achievements" &&
                    <>
                        <AchievementsTab/>
                    </>
                }

            </div>
        </div>

    );
}
