
import animationData from '../../assets/animations/toggle.json'; // Adjust path as needed
import styles from "./Toggle.module.scss"
import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import { useTheme } from '@/app/ThemeContext';


function Toggle() {
    const { isDark, toggleTheme } = useTheme();
    const lottieRef = useRef<any>(null);

    const handleToggle = () => {
        if (lottieRef.current) {
            if (isDark) {
                lottieRef.current.playSegments([1, 14], true);
            } else {
                lottieRef.current.playSegments([15, 28], true);
            }
        }
        toggleTheme();
    }

    // Set initial animation state
    useEffect(() => {
        if (lottieRef.current) {
            lottieRef.current.goToAndStop(isDark ? 28 : 1, true);
        }
    }, []);

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

export default Toggle;




    // const [isDark, setIsDark] = useState<boolean>(true);

    // const handleToggle = () => {
    //     setIsDark(!isDark);
    //     console.log("state: " + isDark)

    //     if (isDark) {
    //         lottieRef.current.playSegments([1, 14], true); // Play frames 1-14
    //     } else {
    //         lottieRef.current.playSegments([15, 28], true); // Play frames 15-28
    //     }
    // }