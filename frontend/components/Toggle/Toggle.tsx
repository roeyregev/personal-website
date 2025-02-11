
import animationData from '../../assets/animations/toggle.json'; 
import styles from "./Toggle.module.scss"
import { useEffect, useRef } from 'react';
// import Lottie from 'lottie-react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react'; // Import type
import { useTheme } from '@/app/ThemeContext';


function Toggle() {
    const { isDark, toggleTheme } = useTheme();
    // const lottieRef = useRef<any>(null);
    const lottieRef = useRef<LottieRefCurrentProps | null>(null); // Type reference properly

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
        const ref = lottieRef.current;
        if (ref) {
            ref.goToAndStop(isDark ? 28 : 1, true);
        }
    }, []); // No dependencies
    
   
    // useEffect(() => {
    //     if (lottieRef.current) {
    //         lottieRef.current.goToAndStop(isDark ? 28 : 1, true);
    //     }
    // }, []);

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