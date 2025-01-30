"use client"

import styles from './page.module.scss';
import Gallery from "@/components/Gallery/Gallery";
import { Suspense, lazy, useEffect, useState } from "react";
import projectsData from "../../ProjectsData/projects.json"
import { AnimatePresence } from 'framer-motion';
import { useDrawerContext } from '@/app/DrawerContext';
import { Loader } from '@/components/Loader/Loader';
import dynamic from 'next/dynamic';
// import Drawer from "@/components/Drawer/Drawer";
// import Footer from '@/components/Footer/Footer';

// Lazy load non-critical components
const Footer = dynamic(() => import('@/components/Footer/Footer'), {
  loading: () => <Loader />
});

// Preload the Drawer component
const Drawer = dynamic(() => import("@/components/Drawer/Drawer"), {
  ssr: false,
  loading: () => null
});

export default function Home() {

  const { showDrawerNew, setShowDrawerNew } = useDrawerContext();
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

  const openDrawer = (projectId: number) => {
    setSelectedProjectIndex(projectId);
    setShowDrawerNew(true);
  };

  const closeDrawer = () => {
    setShowDrawerNew(false);
  };

  // Preload the Drawer component when the page loads -- NEW****
  useEffect(() => {
    const preloadDrawer = () => {
      const drawerPromise = import("@/components/Drawer/Drawer");
    };
    preloadDrawer();
  }, []);

  // Effect to create the portal div if it doesn't exist
  useEffect(() => {
    window.scrollTo(0, 0);
    // Create the portal div if it doesn't exist
    const portalDiv = document.createElement('div');
    portalDiv.setAttribute('id', 'portal');
    document.body.appendChild(portalDiv);

    // Cleanup function to remove the portal div when the component unmounts
    return () => {
      document.body.removeChild(portalDiv);
    };
  }, []);


  return (
    <div
      className={styles.mainPage}>
      <div className={styles.heroText}>
        <h1 className={`${styles.title} ${styles.fadeIn}`}>I’m Roey. <br /> This is my work.</h1>
        <p className={`${styles.secondaryTitle} ${styles.fadeIn}`} >UI/UX | Motion | Storytelling | (Code)</p>
      </div>

      <div className={`${styles.galleryWrapper} ${styles.fadeIn}`}>
        {!showDrawerNew && <Gallery callback={openDrawer} projects={projectsData} />}
      </div>

      {/* AnimatePresence handles the exit animation */}
      <AnimatePresence mode="wait">
        {showDrawerNew && <Drawer
          close={closeDrawer}
          selectedProjectIndex={selectedProjectIndex}
          projects={projectsData} />}
      </AnimatePresence>

      <div> {!showDrawerNew && <Footer />} </div>
    </div>
  );
}