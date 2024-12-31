"use client";

import styles from './DownloadCvButton.module.scss'
import IconDownload from '../Icons/IconDownload'

const DownloadCvButton = () => {
 
        const fileName = "roey_regev_cv.pdf";

        const handleDownload = () => {
            const url = `${fileName}`; // Construct the URL for the public directory
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        return (
            <div className={styles.downloadCvButton}>
                <span className={styles.regularText}>Download my CV</span>
                <div onClick={handleDownload} className={styles.downloadBtn}>
                    <IconDownload />
                </div>
            </div>
        );
    };

    export default DownloadCvButton;