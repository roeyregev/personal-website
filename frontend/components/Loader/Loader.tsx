
import { motion } from "framer-motion";
import styles from "./Loader.module.scss";
import Lottie from 'lottie-react';
import loader from "../../assets/animations/loader.json"


export function Loader() {
    return (
        <div className={styles.loaderContainer}>
            <Lottie
                animationData={loader}
                loop={true}
                style={{ width: 100, height: 100 }}
                className={styles.lottieWrapper}
            />
        </div>
    );
};