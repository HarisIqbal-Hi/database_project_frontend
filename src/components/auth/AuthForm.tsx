'use client';

import { useState } from 'react';
import styles from './AuthForm.module.scss';
import Image from 'next/image';
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

export default function AuthForm() {
    const [tab, setTab] = useState<'login' | 'register'>('login');

    return (
        <div className={styles['AuthForm-split-bg']}>
            <div className={styles['AuthForm-left']}>
                <div className={styles['AuthForm-card']}>
                    <div className={styles['AuthForm-tabs']}>
                        <div
                            className={`${styles['AuthForm-tab']} ${tab === 'login' ? styles.active : ''}`}
                            onClick={() => setTab('login')}
                        >
                            Log In
                        </div>
                        <div
                            className={`${styles['AuthForm-tab']} ${tab === 'register' ? styles.active : ''}`}
                            onClick={() => setTab('register')}
                        >
                            Registration
                        </div>
                    </div>
                    <h2 className={styles['AuthForm-title']}>Good Night!</h2>
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

