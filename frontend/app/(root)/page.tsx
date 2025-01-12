"use client"

import styles from './page.module.scss';
import Gallery from "@/components/Gallery/Gallery";
import Drawer from "@/components/Drawer/Drawer";
import { useEffect, useState } from "react";
import projectsData from "../../ProjectsData/projects.json"
import Footer from '@/components/Footer/Footer';


export default function Home() {

  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  // const [projects, setProject] = useState<ProjectModel[]>()

  const openDrawer = (projectId: number) => {
    setSelectedProjectIndex(projectId);
    setShowDrawer(true);
  };

  const closeDrawer = () => {
    setShowDrawer(false);
  };

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

  return (
    <div className="MainPage">
      <div className="heroText">
        <h1 className={styles.title}>I’m Roey. <br /> This is my work.</h1>
        <p className={styles.secondaryTitle} >UI/UX | Motion | Storytelling | (Code)</p>
      </div>

      {!showDrawer && <Gallery callback={openDrawer} projects={projectsData} />}

      {showDrawer && <Drawer
        close={closeDrawer}
        selectedProjectIndex={selectedProjectIndex}
        projects={projectsData} />}

        {/* <footer className={styles.footer}> &copy; 2025 | All rights reserved to me!</footer> */}
    <Footer/>
    </div>
  );
}
