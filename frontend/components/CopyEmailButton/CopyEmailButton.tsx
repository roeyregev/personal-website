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
                notificationService.error(err)
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


// const notyfRef = useRef<Notyf>();

 // const handleCopy = () => {
    //     navigator.clipboard.writeText(email)
    //         .then(() => {
    //             console.log("Email copied successfully");

    //             if (notyfRef.current) {
    //                 notyfRef.current.success("Email copied to clipboard!");
    //             } else {
    //                 console.error("Notyf instance not found");
    //             }
    //         })
    //         .catch((err) => {
    //             console.error("Failed to copy email: ", err);
    //             notyfRef.current?.error("Failed to copy email");
    //         });
    // };

    // useEffect(() => {
    //     notyfRef.current = new Notyf({
    //         duration:30000,
    //         position: { x: 'center', y: 'top' },
    //         dismissible: false,
    //         ripple: true,
    //         types: [
    //             {
    //                 type: 'success',
    //                 background: 'linear-gradient(-70deg, #98FF48, #7EFFFF)',
    //                 icon: false,
    //                 className: 'custom-success',
    //             },
    //             {
    //                 type: 'error',
    //                 background: 'linear-gradient(-70deg,rgb(251, 75, 75),rgb(250, 97, 252))',
    //                 icon: false,
    //                 className: 'custom-error'
    //             }
    //         ]
    //     });
    // }, []);

    // const handleCopy = () => {
    //     navigator.clipboard.writeText(email)
    //         .then(() => {
    //             console.log("Email copied successfully");

    //             if (notyfRef.current) {
    //                 notyfRef.current.success("Email copied to clipboard!");
    //             } else {
    //                 console.error("Notyf instance not found");
    //             }
    //         })
    //         .catch((err) => {
    //             console.error("Failed to copy email: ", err);
    //             notyfRef.current?.error("Failed to copy email");
    //         });
    // };
