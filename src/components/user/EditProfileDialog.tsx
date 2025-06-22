import React, {ChangeEvent, useEffect, useState} from "react";
import styles from "./EditProfileDialog.module.scss";
import {EditProfileDialogProps} from "@/components/user/types";
import FloatingInput from "@/components/ui/FloatingInput";
import Image from "next/image";
import FloatingSelect from "@/components/ui/FloatingSelect";

export default function EditProfileDialog({open, onClose, user}: EditProfileDialogProps) {
    const [userState, setUserState] = useState({
        username: user.username || "",
        name: user.full_name || "",
        email: user.email || "",
        interests: user.interests || [],
        location: user.location || null,
    });
    const [loadingLoc, setLoadingLoc] = useState(false);

    useEffect(() => {
        if (open && user) {
            console.log("user open", open);
            setUserState({
                name: user.full_name || "",
                username: user.username || "",
                email: user.email || "",
                interests: user.interests || [],
                location: user.location || null,
            });
        }
    }, [open, user]);

    const handleGetLocation = () => {
        setLoadingLoc(true);
        navigator.geolocation.getCurrentPosition(
            pos => {
                setUserState(prev => ({
                    ...prev,
                    location: {lat: pos.coords.latitude, lng: pos.coords.longitude},
                }));
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
        // TODO: submit API call with userState data
        console.log("submit", user);
        onClose();
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
                <h2 className={styles.header}>Edit Profile</h2>
                <div className={styles.form_dialog}>
                    <form onSubmit={handleSubmit}>
                        <FloatingInput
                            type="text"
                            label="Username"
                            name="username"
                            value={userState.username}
                            onChange={handleChange}
                            required
                        />
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
                        <div className={styles.interestsRow}>
                            {userState.interests.map((interest, i) => (
                                <span key={i} className={styles.interestChip}>{interest}</span>
                            ))}
                            <FloatingSelect
                                label="Interests"
                                value={"handleChange"}
                                options={[]}
                                onChange={e => {

                                }}
                            />
                        </div>

                        <div className={styles.locationRow}>
        <span>
          {userState.location
              ? `Lat: ${userState.location.lat.toFixed(4)}, Lng: ${userState.location.lng.toFixed(4)}`
              : "No location set"}
        </span>
                            <button
                                type="button"
                                onClick={handleGetLocation}
                                disabled={loadingLoc}
                                className={styles.locateBtn}
                            >
                                {loadingLoc ? "Locating..." : "Use My Location"}
                            </button>
                        </div>
                        <div className={styles.actions}>
                            <button type="button" onClick={onClose} className={styles.cancelBtn}>
                                Cancel
                            </button>
                            <button type="submit" className={styles.saveBtn}>
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>

    );
}
