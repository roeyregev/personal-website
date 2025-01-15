"use client"

import styles from './page.module.scss';
import Gallery from "@/components/Gallery/Gallery";
import Drawer from "@/components/Drawer/Drawer";
import { useEffect, useState } from "react";
import projectsData from "../../ProjectsData/projects.json"
import Footer from '@/components/Footer/Footer';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';


export default function Home() {

  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Check if coming from about page
  const fromAbout = searchParams.get('from') === 'about';

  const openDrawer = (projectId: number) => {
    setSelectedProjectIndex(projectId);
    setShowDrawer(true);
  };

  const closeDrawer = () => {
    setShowDrawer(false);
  };

  // Effect to handle first load detection
  useEffect(() => {
    // Use sessionStorage to detect first load
    const hasVisited = sessionStorage.getItem('hasVisitedHome');
    if (!hasVisited) {
      setIsFirstLoad(true);
      sessionStorage.setItem('hasVisitedHome', 'true');
    } else {
      setIsFirstLoad(false);
    }
  }, []);

  // Effect to create the portal div if it doesn't exist
  useEffect(() => {
    // Create the portal div if it doesn't exist
    const portalDiv = document.createElement('div');
    portalDiv.setAttribute('id', 'portal');
    document.body.appendChild(portalDiv);

    // Cleanup function to remove the portal div when the component unmounts
    return () => {
      document.body.removeChild(portalDiv);
    };
  }, []);


  // Animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: isFirstLoad ? 20 : 0,
      x: fromAbout ? 0 : 0,
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  const contentVariants = {
    initial: {
      opacity: 0,
      y: isFirstLoad ? 20 : 0,
      x: fromAbout ? 0 : 0,
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };


  return (
    <motion.div
      className="MainPage"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <motion.div 
      className="heroText"
      initial="initial"
      animate="animate"
      variants={contentVariants}
      >
        <h1 className={styles.title}>I’m Roey. <br /> This is my work.</h1>
        <p className={styles.secondaryTitle} >UI/UX | Motion | Storytelling | (Code)</p>
      </motion.div>

      <motion.div
        variants={contentVariants}
      >
        {!showDrawer && <Gallery callback={openDrawer} projects={projectsData} />}
      </motion.div>

      {/* AnimatePresence handles the exit animation */}
      <AnimatePresence mode="wait">
        {showDrawer && <Drawer
          close={closeDrawer}
          selectedProjectIndex={selectedProjectIndex}
          projects={projectsData} />}
      </AnimatePresence>

      <motion.div 
      variants={contentVariants}
      >
        {!showDrawer && <Footer />}
      </motion.div>
    </motion.div>

  );
}
