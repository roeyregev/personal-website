"use client";

import Link from "next/link";
import styles from "./NavbarYariv.module.scss";
import { useState, useRef, useEffect } from "react";
import { animate, motion } from "framer-motion";
import Toggle from "../Toggle/Toggle";
import { usePathname } from 'next/navigation';
import { useDrawerContext } from '@/app/DrawerContext';
import sparksAnimationData from '../../assets/animations/sparks.json';
import Lottie from 'lottie-react';


type TabId = "myWork" | "about";
interface UnderlineProperties {
    width: number;
    left: number;
    height: number;
    opacity: number
}

const NavbarYariv = () => {

    const { closeDrawerNew } = useDrawerContext();
    const initialPath = usePathname();
    const getInitialActiveTab = (): TabId => initialPath === "/" ? "myWork" : "about";
    const ref = useRef<HTMLDivElement>(null);
    const [activeById, setActiveById] = useState<TabId>(getInitialActiveTab());
    const [hasShadow, setHasShadow] = useState(false);
    const [underlineProperties, setUnderlineProperties] = useState<UnderlineProperties | null>(null);
    // const [clickedTab, setClickedTab] = useState<TabId | null>(null);

    const lottieRefs = {
        myWork: useRef<any>(null),
        about: useRef<any>(null)
    };

    const tabs = [
        { id: "myWork" as const, name: "My work", href: "/" },
        { id: "about" as const, name: "About", href: "/about" },
    ];

    const popAnimation = {
        scale: [1, 1.8, 1],
        transition: {
            duration: 0.4,
            times: [0, 0.3, 1],
            ease: [0.19, 1.0, 0.22, 1.0] // Elastic-like easing
        }
    };

    const getTabProperties = (tabId: TabId): UnderlineProperties => {
        const element = document.getElementsByClassName(tabId)[0] as HTMLDivElement;
        return {
            width: (element?.offsetWidth) || 0,
            left: element?.offsetLeft || 0,
            height: 3,
            opacity: 0,
        };
    };

    //set underline properties
    useEffect(() => {
        const initialProperties = getTabProperties(activeById);
        setUnderlineProperties(initialProperties);

        const handleResize = () => {
            setUnderlineProperties(getTabProperties(activeById));
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [activeById]);

    //add shadow on scroll
    useEffect(() => {
        const handleScroll = () => {
            setHasShadow(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Initialize all Lottie animations
    useEffect(() => {
        Object.values(lottieRefs).forEach(ref => {
            if (ref.current) {
                ref.current.goToAndStop(18, true);
            }
        });
    }, []);

    const handleTabClick = (tabId: TabId) => {
        // setClickedTab(tabId);
        setActiveById(tabId);
        closeDrawerNew();
        if (lottieRefs[tabId].current) {
            lottieRefs[tabId].current.playSegments([1, 18], true);
        }
    };


    return (
        <div className={`${styles.NavbarYariv} ${hasShadow ? styles.shadow : ''}`}>
            <div
                className={styles.tabsFlex}
                ref={ref}>
                {tabs.map((tab) => (
                    <Link
                        data-text={tab.name} // Add this
                        href={tab.href}
                        key={tab.id}
                        className={`${styles.tab + " " + tab.id} ${activeById === tab.id ? styles.activeTab : ''}`}
                        onClick={() => handleTabClick(tab.id)}
                    >
                        <motion.span
                            className={styles.tabText}
                            whileTap={{
                                scale: 0.9,
                                transition: {
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 15,
                                    mass: 0.8
                                }
                            }}
                            style={{ display: 'inline-block' }}
                        >
                            {tab.name}
                        </motion.span>
                        <Lottie
                            className={styles.sparks}
                            animationData={sparksAnimationData}
                            loop={false}
                            autoplay={false}
                            lottieRef={lottieRefs[tab.id]}
                        />
                    </Link>
                ))}
                {underlineProperties && (
                    <motion.div
                        className={styles.underline}
                        initial={false} // Prevent animation from zero values
                        animate={{
                            width: underlineProperties.width,
                            left: underlineProperties.left,
                            height: underlineProperties.height,
                            opacity: 1
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                        }}
                    />
                )}
            </div>
            <Toggle />
        </div>
    );
};

export default NavbarYariv;