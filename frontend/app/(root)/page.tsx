"use client"

import Gallery from "@/components/Gallery/Gallery";
import "../globals.scss";
import Drawer from "@/components/Drawer/Drawer";
import { useEffect, useState } from "react";
import ProjectModel from "@/Models/project-model";
import projectsData from "../../ProjectsData/projects.json"


export default function Home() {

  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  // const [projects, setProject] = useState<ProjectModel[]>()

   //Get projects list
//    useEffect(() => {
//     setProject(projectsData);
//     console.log(projects);
// }, []);

  const openDrawer = (projectId: number) => {
    setSelectedProjectIndex(projectId);
    setShowDrawer(true);
  };

  const closeDrawer = () => {
    setShowDrawer(false);
  };

  // function openDrawer() {
  //   setShowDrawer(true);
  // }

  // function closeDrawer() {
  //   setShowDrawer(false);
  // }

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
        <h1>I’m Roey and this is my work</h1>
        <p>UI/UX | Motion | Code | Storytelling</p>
      </div>

      <Gallery open={openDrawer} projects={projectsData} />

      {/* {showDrawer && <Drawer
        close={closeDrawer}
        selectedProjectIndex={selectedProjectIndex}
        projects={projects} />} */}
    </div>
  );
}
