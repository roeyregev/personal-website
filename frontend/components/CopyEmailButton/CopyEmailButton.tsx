"use client";

import styles from './CopyEmailButton.module.scss'
import IconCopyLink from '../Icons/IconCopyLink'
import notificationService from '@/services/NotificationService';

const CopyEmailButton = () => {
    const email = "roeyregev@gmail.com";
    
    const handleCopy = () => {
        navigator.clipboard.writeText(email)
            .then(() => {
                console.log("Email copied to clipboard!");
                notificationService.success("Email copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy email: ", err);
                notificationService.error(err);
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