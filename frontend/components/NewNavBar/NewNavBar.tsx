"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NewNavBar.module.scss";
import { useState, useRef, useEffect, ReactNode } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Toggle from "../Toggle/Toggle";


// Type definitions
interface Position {
    [key: string]: any
    // left: number;
    // width: number;
    // opacity: number;
    // scale?: number;
    // scaleY: number[];
    // origin: string;
}

interface TabProps {
    tabName: string;
    setPosition: (position: Position) => void;
    theHref: string;
    isActive: boolean;
}

interface CursorProps {
    position: Position;
}

// Main Component
const NewNavBar = () => {
    return (
        <div className={styles.newNavBar}>
            <TabsContainer />
            <Toggle/>
        </div>
    );
};

// Tabs Container Component
const TabsContainer = () => {
    const pathname = usePathname();
    const [position, setPosition] = useState<Position>({
        left: 0,
        width: 0,
        opacity: 1,
        originX:0
        
    });

    const tabs = [
        { id:"my work", name: "My work", href: "/" },
        { id:"about", name: "About", href: "/about" },
    ];

    return (
        <div className={styles.tabsContainer}>
            {tabs.map((tab) => (
                <Tab
                    key={tab.id}
                    theHref={tab.href}
                    setPosition={setPosition}
                    isActive={pathname === tab.href}
                    tabName = {tab.name}
                /> 

            ))}
            <Cursor position={position} />
           
        </div>
    );
};

// Tab Component
const Tab = ({ tabName, setPosition, theHref, isActive }: TabProps) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const [animate, setAnimate] = useState<any>({scale:1}); 

    useEffect(() => {
        if (isActive && ref.current) {
            const { offsetLeft, offsetWidth } = ref.current;
            setPosition({
                left: offsetLeft,
                width: offsetWidth,
                opacity: 1,
                scale: 1,
            });
            setAnimate({scale:1})
        }
    }, [isActive, setPosition]);

    return (
       
            <Link
            href={theHref}
            ref={ref}
            data-href={theHref}
            className={styles.tab}
          
        >
             <motion.div 
             animate={animate}>
                {tabName}
            </motion.div>
            </Link>
        
    );
};

// Cursor Component
const Cursor = ({ position }: CursorProps) => {
    return (
        <motion.div
            // initial={false} // Prevent motion from applying to initial render
            animate={position as any}
            initial = {position}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                
            }}
            className={styles.cursor}
        />
    );
};

export default NewNavBar;










// let tabs = [
//     { id: "my work", label: "My work", href: "/" },
//     { id: "about", label: "About", href: "/about" }
//   ];
  
//   // Main Component
//   const NewNavBar = () => {
//       return (
//           <div className={styles.newNavBar}>
//               <TabsContainer />
//           </div>
//       );
//   };
  
//   const TabsContainer = () => {
  
//     let [activeTab, setActiveTab] = useState(tabs[0].id);
  
//     return (
//       <div className={styles.tabsContainer}>
//         {tabs.map((tab) => (
//           <Link
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                className={`${
//                   activeTab === tab.id ? "" : styles.tab
//                 } relative rounded-full px-3 py-1.5 text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2`}
//               //   style={{
//               //     WebkitTapHighlightColor: "transparent",
//               //   }}
//                 href={tab.href}        >
//             {activeTab === tab.id && (
              
//               <motion.span
//                 layoutId="cursor"
//                 className={styles.cursor}
//                 transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
//               />
//             )}
//             {tab.label}
//           </Link>
//         ))}
//       </div>
//     );
//   }
  
//   export default NewNavBar;