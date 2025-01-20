"use client";

import Link from "next/link";
import styles from "./NavbarYariv.module.scss";
import { useState, useRef, useEffect } from "react";
import { animate, motion } from "framer-motion";
import Toggle from "../Toggle/Toggle";
import { usePathname } from 'next/navigation'


type TabId = "myWork" | "about";

interface UnderlineProperties {
    width: number;
    left: number;
    height: number;
    opacity: number
}

const NavbarYariv = () => {
    const initialPath = usePathname();
    const getInitialActiveTab = (): TabId => initialPath === "/" ? "myWork" : "about";
    const ref = useRef<HTMLDivElement>(null);
    const [activeById, setActiveById] = useState<TabId>(getInitialActiveTab());

    const tabs = [
        { id: "myWork" as const, name: "My work", href: "/" },
        { id: "about" as const, name: "About", href: "/about" },
    ];

const [underlineProperties, setUnderlineProperties] = useState<UnderlineProperties | null>(null);

const getTabProperties = (tabId: TabId): UnderlineProperties => {
    const element = document.getElementsByClassName(tabId)[0] as HTMLDivElement;
    return {
        // width: (element?.offsetWidth)*0.8 || 0,
        width: (element?.offsetWidth) || 0,
        left: element?.offsetLeft || 0,
        height: 4,
        opacity: 0,
    };
};

useEffect(() => {
    const initialProperties = getTabProperties(activeById);
    setUnderlineProperties(initialProperties);

    const handleResize = () => {
      setUnderlineProperties(getTabProperties(activeById));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeById]);


    return (
        <div  className={styles.NavbarYariv}>
            <div 
            className={styles.tabsFlex} 
            ref={ref}>
                {tabs.map((tab) => (
                    <Link
                        href={tab.href}
                        key={tab.id}
                        className={`${styles.tab + " " + tab.id} ${activeById === tab.id ? styles.activeTab : ''}`}
                        onClick={() => {
                            setActiveById(tab.id);
                            // setUnderlineProperties(getTabProperties(tab.id));
                        }}
                    >
                        <motion.span className={styles.tabSpan}>{tab.name}</motion.span>
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
          }} // Map keys explicitly
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






    //------------------------------------------------------------

    // New handler for navigation
    // const handleNavigation = (tab: { id: string; href: string }, e: React.MouseEvent) => {
    //     e.preventDefault(); // Prevent default Link behavior
    //     setActiveById(tab.id);
        
    //     // If navigating from about page to home, add the 'from' parameter
    //     if (initialPath === '/about' && tab.href === '/') {
    //         router.push('/?from=about');
    //     } else {
    //         router.push(tab.href);
    //     }
    // };


    //Compatible onClick function:
     // onClick={(e) => handleNavigation(tab, e)}

    //------------------------------------------------------------



// const initialActiveTab = () => initialPath === "/" ? "myWork" : "about";
// const [activeById, setActiveById] = useState<TabId>(initialActiveTab);

    // const [underlineProperties, setUnderlineProperties] = useState<any>({
    //     width: 0,
    //     left: 0,
    //     height: 0,
    // })

    // const getTabElement = (tabClassname: string) => {
    //     const element = ref.current?.getElementsByClassName(tabClassname)[0];
    //     return element as HTMLDivElement;
    // }

    // useEffect(() => {
    //     const activeTab = getTabElement(activeById);
    //     // console.log(activeTab);
    //     setUnderlineProperties({
    //         width: activeTab?.offsetWidth,
    //         left: activeTab?.offsetLeft,
    //         height: 4,
    //     })
    // }, [activeById])
