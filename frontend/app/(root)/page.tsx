"use client"

import styles from './page.module.scss';
import Gallery from "@/components/Gallery/Gallery";
import Drawer from "@/components/Drawer/Drawer";
import { Suspense, lazy, useEffect, useState } from "react";
import projectsData from "../../ProjectsData/projects.json"
// import Footer from '@/components/Footer/Footer';
import { AnimatePresence } from 'framer-motion';
import { useDrawerContext } from '@/app/DrawerContext';
import { Loader } from '@/components/Loader/Loader';

// Lazy load non-critical components
const Footer = lazy(() => import('@/components/Footer/Footer'));
// const Drawer = lazy(() => import("@/components/Drawer/Drawer"));


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
{/* 
      AnimatePresence handles the exit animation */}
      <AnimatePresence mode="wait">
        {showDrawerNew && <Drawer
          close={closeDrawer}
          selectedProjectIndex={selectedProjectIndex}
          projects={projectsData} />}
      </AnimatePresence>

      {/* <div> {!showDrawerNew && <Footer />} </div> */}
      <div>
        {!showDrawerNew && (
          <Suspense fallback={<Loader />}>
            <Footer />
          </Suspense>
        )}
      </div>

    </div>
  );
}