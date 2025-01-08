
import animationData from '../../assets/animations/toggle.json'; // Adjust path as needed
import styles from "./Toggle.module.scss"
import { useRef, useState } from 'react';
import Lottie from 'lottie-react';

function Toggle() {

    const [isDark, setIsDark] = useState<boolean>(true);
    const lottieRef = useRef<any>(null);

    const handleToggle = () => {
        setIsDark(!isDark);
        console.log("state: " + isDark)

        if (isDark) {
            lottieRef.current.playSegments([1, 14], true); // Play frames 1-14
        } else {
            lottieRef.current.playSegments([15, 28], true); // Play frames 15-28
        }
    }

    return (
        <div className={styles.toggle}>
            <Lottie
                className={styles.player}
                animationData={animationData}
                loop={false}
                autoplay={false}
                lottieRef={lottieRef}
                onClick={handleToggle}
            />
        </div>
    );
}

export default Toggle