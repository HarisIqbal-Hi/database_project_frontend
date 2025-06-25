import {ChangeEvent, useState} from "react";
import styles from "@/components/auth/AuthForm.module.scss";
import {useLogin} from "@/features/auth/hooks/useLogin";
import FloatingInput from "@/components/ui/FloatingInput";
import { useRouter } from 'next/navigation'

interface LoginFormError {
    email?: string;
    password?: string;
}

export default function LoginForm() {
    const router = useRouter()
    const login = useLogin();
    const [form, setForm] = useState({email: '', password: ''});
    const [errors, setErrors] = useState<LoginFormError>();
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    function validateLogin({ email, password }: LoginFormError) {
        const newErrors: LoginFormError = {}
        if (!email) newErrors.email = "Email is required";
        // else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email address";
        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validateLogin(form)) return;
        await login.mutateAsync(form,
            {
                onSuccess: (data) => {
                    router.push("/places")
                },
                onError: (error: Error) => {
                    setMessage(error.message);
                    console.error(error);
                },
            })
        console.log(form);
    }


    function handleValueChangeEvent(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const name = (event.target as HTMLInputElement).name;
        const value = event.target.value;
        setForm(form => ({...form, [name]: value}))
        setErrors(error => ({
            ...error,
            [name as string]: undefined
        }))
    }


    return (
        <form onSubmit={handleSubmit}>

            <FloatingInput
                label="Username"
                type="text"
                name="email"
                value={form.email}
                error={!!errors?.email }
                errorMsg={errors?.email}
                onChange={handleValueChangeEvent}
            />

            <FloatingInput
                label="Password"
                type="password"
                name="password"
                value={form.password}
                error={!!errors?.password }
                errorMsg={errors?.password}
                onChange={handleValueChangeEvent}
            />
            <button onClick={handleSubmit} className={styles['AuthForm-btn']} type="submit" disabled={loading}>
                {login.isPending ? 'Logging in...' : 'Login'}
            </button>
            {message && <div style={{marginTop: 10, color: '#e04b3d'}}>{message}</div>}
        </form>
    );
}