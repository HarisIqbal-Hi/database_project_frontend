import {ChangeEvent, useState} from "react";
import styles from "@/components/auth/AuthForm.module.scss";
import {useRegister} from "@/features/auth/hooks/useRegister";
import FloatingInput from "@/components/ui/FloatingInput";
import { useRouter } from 'next/navigation'

interface RegisterFormError {
    name?: string;
    email?: string;
    password?: string;
    userName?: string;
}

interface RegisterForm {
    userName: string;
    name: string;
    email: string;
    password: string;
}

export default function RegisterForm() {
    const router = useRouter();
    const register = useRegister();
    const [form, setForm] = useState<RegisterForm>({
        name: "",
        userName: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<RegisterFormError>();
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    function validateRegister({name, email, password, userName}: RegisterFormError) {
        const newErrors: RegisterFormError = {};
        if (!name) newErrors.name = "Name is required";
        if (!userName) newErrors.userName = "User name is required";
        else if (userName.length < 2) newErrors.userName = "Username must be at least 5 characters";
        else if (userName.length > 8) newErrors.userName = "Username must be less then 8 characters";
        if (!email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email address";
        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault();
        if (!validateRegister(form)) return
        await register.mutateAsync(form,
            {
                onSuccess: (data) => {
                    router.push("/places")
                    // Example: redirect to home, or show toast
                    console.log("data", data);
                    // Or toast.success('Welcome back!');
                },
                onError: (error: Error) => {
                    // Show custom error (from thrown Error or backend)
                    setMessage(error.message);
                    console.error(error);
                },
            })
        console.log(form)
    }

    function handleValueChangeEvent(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const name = (event.target as HTMLInputElement).name;
        const value = event.target.value;
        console.log(name, value);
        setForm({...form, [name]: value})
        setErrors(error => ({
            ...error,
            [name as string]: undefined
        }))
    }

    return (
        <form onSubmit={handleSignup}>
            <FloatingInput
                label="User Name"
                type="text"
                name="userName"
                value={form.userName}
                error={!!errors?.userName}
                errorMsg={errors?.userName}
                onChange={handleValueChangeEvent}
            />
            <FloatingInput
                label="Your Full Name"
                type="name"
                name="name"
                value={form.name}
                error={!!errors?.name}
                errorMsg={errors?.name}
                onChange={handleValueChangeEvent}
            />

            <FloatingInput
                label="Your Email"
                type="email"
                name="email"
                value={form.email}
                error={!!errors?.email}
                errorMsg={errors?.email}
                onChange={handleValueChangeEvent}
            />

            <FloatingInput
                label="Password"
                name="password"
                type="password"
                value={form.password}
                error={!!errors?.password}
                errorMsg={errors?.password}
                onChange={handleValueChangeEvent}
            />
            <button onClick={handleSignup} className={styles['AuthForm-btn']} type="submit" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
            </button>
            {message && <div style={{marginTop: 10, color: '#e04b3d'}}>{message}</div>}
        </form>
    );
}
