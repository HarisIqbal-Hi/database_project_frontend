// You can put this in /components/user/types.ts or with the dialog component

export interface User {
    id: string;
    full_name: string;
    username: string;
    email: string;
    interests: string[];
    location?: { lat: number; lng: number }; // optional, add/modify fields as needed
    // Add other user fields as needed
}

export interface EditProfileDialogProps {
    open: boolean;
    onClose: () => void;
    user: User;
}
