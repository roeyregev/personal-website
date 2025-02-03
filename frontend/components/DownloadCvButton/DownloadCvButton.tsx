"use client";

import styles from './DownloadCvButton.module.scss'
import IconDownload from '../Icons/IconDownload'
import { motion } from 'framer-motion';
import notificationService from '@/services/NotificationService';

const DownloadCvButton = () => {
    const fileName = "roey_regev_cv.pdf";

    const handleDownload = () => {
        const url = `${fileName}`;
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // //includes notification:
    // const handleDownload = () => {
    //     try {
    //         const url = `${fileName}`;
    //         const link = document.createElement("a");
    //         link.href = url;
    //         link.download = fileName;
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //         notificationService.success('CV downloaded successfully!');
    //     } catch (error) {
    //         console.error('Download failed:', error);
    //         notificationService.error('Failed to download CV. Please try again.');
    //     }
    // };

    const popAnimation = {
        tap: {
            scale: 0.95,
            transition: {
                type: "spring",
                stiffness: 500,
                damping: 10,
                duration:0.1
            }
        }
    };

    return (
        <motion.div
            className={styles.downloadCvButton}
            onClick={handleDownload}
            whileTap="tap"
            variants={popAnimation}
        >
            <span className={styles.regularText}>Download CV</span>
            <div className={styles.downloadBtn}>
                <IconDownload className={styles.downloadIcon} />
            </div>
        </motion.div >
    );
};

export default DownloadCvButton;