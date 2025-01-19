"use client";

import { Notyf } from 'notyf';
import styles from './CopyEmailButton.module.scss'
import IconCopyLink from '../Icons/IconCopyLink'
import { useEffect, useRef } from 'react';


const CopyEmailButton = () => {
    const email = "roeyregev@gmail.com";
    const notyfRef = useRef<Notyf>();

    useEffect(() => {
        notyfRef.current = new Notyf({
            duration:30000,
            position: { x: 'center', y: 'top' },
            dismissible: false,
            ripple: true,
            types: [
                {
                    type: 'success',
                    background: 'linear-gradient(-70deg, #98FF48, #7EFFFF)',
                    icon: false,
                    className: 'custom-success',
                },
                {
                    type: 'error',
                    background: 'linear-gradient(-70deg,rgb(251, 75, 75),rgb(250, 97, 252))',
                    icon: false,
                    className: 'custom-error'
                }
            ]
        });
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(email)
            .then(() => {
                console.log("Email copied successfully");

                if (notyfRef.current) {
                    notyfRef.current.success("Email copied to clipboard!");
                } else {
                    console.error("Notyf instance not found");
                }
            })
            .catch((err) => {
                console.error("Failed to copy email: ", err);
                notyfRef.current?.error("Failed to copy email");
            });
    };


    return (
        <div className={styles.copyEmailComponent}>
            <span className={styles.email}>{email}</span>
            <div onClick={handleCopy} className={styles.copyBtn}>
                <IconCopyLink />
            </div>
        </div>
    );
};

export default CopyEmailButton;
