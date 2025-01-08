"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.scss";
import Link from "next/link";
import Underline from "../Underline/Underline";
import { motion } from "framer-motion";

const NavBar: React.FC = () => {
    const pathname = usePathname();
    const tabsRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const tabsContainerRef = useRef<HTMLDivElement | null>(null);
    const [underlineProps, setUnderlineProps] = useState({ left: 0, width: 0, targetLeft: 0, targetWidth: 0 });

    useEffect(() => {
        const updateUnderline = () => {
            if (tabsContainerRef.current) {
                const containerRect = tabsContainerRef.current.getBoundingClientRect();
                const activeTab = tabsRef.current.find((tab) => tab?.dataset.path === pathname);

                if (activeTab) {
                    const tabRect = activeTab.getBoundingClientRect();
                    const left = tabRect.left - containerRect.left;
                    const width = tabRect.width;

                    // Update both target and current properties
                    setUnderlineProps({
                        left, // current position
                        width, // current width
                        targetLeft: left, // target position
                        targetWidth: width, // target width
                    });

                    //   setUnderlineProps(prevProps => ({
                    //     ...prevProps,
                    //     targetLeft: left,
                    //     targetWidth: width,
                    //   }));
                }
            }
        };

        updateUnderline(); // Initial update
        window.addEventListener('resize', updateUnderline); // Update on resize

        return () => window.removeEventListener('resize', updateUnderline); // Clean up event listener
    }, [pathname]);


    useEffect(() => {
        if (tabsContainerRef.current) {
            const containerRect = tabsContainerRef.current.getBoundingClientRect();
            const firstTab = tabsRef.current[0];
            if (firstTab) {
                const firstTabRect = firstTab.getBoundingClientRect();
                setUnderlineProps({
                    left: firstTabRect.left - containerRect.left,
                    width: firstTabRect.width,
                    targetLeft: firstTabRect.left - containerRect.left, // Set initial target to the first tab
                    targetWidth: firstTabRect.width,
                });
            }
        }
    }, []);

    return (
        <div className={styles.navbar}>
            <div className={styles.tabs} ref={tabsContainerRef}>
                <Link
                    href="/"
                    className={styles.tab}
                    data-path="/"
                    ref={(el) => { if (el) tabsRef.current[0] = el; }}
                >
                    My Work
                </Link>
                <Link
                    href="/about"
                    className={styles.tab}
                    data-path="/about"
                    ref={(el) => { if (el) tabsRef.current[1] = el; }}
                >
                    About
                </Link>

                <Underline {...underlineProps} />
            </div>
        </div>
    );
};

export default NavBar;




// "use client"

// import React, { useEffect, useRef, useState } from "react";
// import { usePathname } from "next/navigation";
// import styles from "./NavBar.module.scss";
// import Link from "next/link";
// import Toggle from "../Toggle/Toggle";
// import Underline from "../Underline/Underline";



// function NavBar() {

//     // const [activeTab, setActiveTab] = useState("/");
//     const pathname = usePathname();
//     const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
//     const tabsRef = useRef<(HTMLAnchorElement | null)[]>([]);
//     const tabsContainerRef = useRef<HTMLDivElement | null>(null);

//     useEffect(() => {
//         const activeTab = tabsRef.current.find((tab) => tab?.dataset.path === pathname);

//         if (activeTab && tabsContainerRef.current) {
//             const tabRect = activeTab.getBoundingClientRect();
//             const containerRect = tabsContainerRef.current.getBoundingClientRect();

//             // Calculate position relative to the container
//             const offsetLeft = tabRect.left - containerRect.left;

//             setUnderlineStyle({
//                 width: tabRect.width,
//                 left: offsetLeft,
//             });
//         }
//     }, [pathname]);

//     const isAbout = pathname === "/about";
//     const isMyWork = pathname === "/";

//     return (
//         <div className={styles.navbar}>
//             <div className={styles.tabs} ref={tabsContainerRef}>
//                 <Link
//                     href="/"
//                     className={styles.tab}
//                     data-path="/"
//                     ref={(el) => {
//                         tabsRef.current[0] = el; // Assign to ref array
//                     }}
//                 >
//                     My Work
//                 </Link>

//                 <Link
//                     href="/about"
//                     className={styles.tab}
//                     data-path="/about"
//                     ref={(el) => {
//                         tabsRef.current[1] = el; // Assign to ref array
//                     }}
//                 >
//                     About
//                 </Link>


//                 {/* UNDERLINE */}
//                 {/* <div
//                     className={styles.underline}
//                     style={{
//                         width: underlineStyle.width,
//                         left: underlineStyle.left,
//                     }}
//                 /> */}

//                 <Underline
//                     width={underlineStyle.width}
//                     left={underlineStyle.left}
//                     isActive={isAbout || isMyWork}
//                     isAbout={isAbout}
//                 />
//             </div>
//         </div >
//     );
// }

// export default NavBar