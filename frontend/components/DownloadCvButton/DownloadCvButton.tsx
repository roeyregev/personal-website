// DownloadCvButton.tsx
"use client";

import styles from './DownloadCvButton.module.scss'
import IconDownload from '../Icons/IconDownload'
import { motion } from 'framer-motion';

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