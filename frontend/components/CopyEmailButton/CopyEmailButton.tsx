"use client"; // This makes only this component a Client Component

import styles from './CopyEmailButton.module.scss'
import IconCopyLink from '../Icons/IconCopyLink'

const CopyEmailButton = () => {
    const email = "roeyregev@gmail.com";

    const handleCopy = () => {
        navigator.clipboard.writeText(email)
            .then(() => {
                alert("Email copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy email: ", err);
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
