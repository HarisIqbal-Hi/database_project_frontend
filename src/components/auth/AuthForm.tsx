'use client';

import { useState } from 'react';
import styles from './AuthForm.module.scss';
import Image from 'next/image';
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import Tabs from "@/components/ui/Tabs";


const TABS = [
    { label: "Login", value: "login" },
    { label: "Registration", value: "register" },
];



export default function AuthForm() {

    const [tab, setTab] = useState("login");
    function getGreeting() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            return "Good Morning!";
        } else if (hour >= 12 && hour < 18) {
            return "Good Afternoon!";
        } else {
            return "Good Evening!";
        }
    }
    return (
        <div className={styles['AuthForm-split-bg']}>
            <div className={styles['AuthForm-left']}>
                <div className={styles['AuthForm-card']}>

                    <Tabs tabs={TABS} value={tab} onChange={val => setTab(val as string)} />;
                    <h2 className={styles['AuthForm-title']}>{getGreeting()}</h2>
                    <div className={styles['AuthForm-desc']}>
                        {tab === 'login'
                            ? 'Thank you for coming back!'
                            : 'Thank you for joining us!'}
                    </div>
                    {tab === 'login' ? <LoginForm /> : <RegisterForm />}
                    <div className={styles['AuthForm-brand']}>
                        <Image src="/logo.svg" alt="Chemnitz Icon" width={32} height={32} className={styles['AuthForm-logo']} />
                        Chemnitz <span style={{ color: '#F8A948' }}>Cultural Sites</span>
                    </div>
                </div>
            </div>
            <div className={styles['AuthForm-right']}></div>
        </div>
    );
}

