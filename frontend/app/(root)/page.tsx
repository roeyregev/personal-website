"use client"

import Gallery from "@/components/Gallery/Gallery";
import "../globals.scss";
import Drawer from "@/components/Drawer/Drawer";
import { useState } from "react";


export default function Home() {

  const [showDrawer, setShowDrawer] = useState<boolean>(false);

    function openDrawer() {
        setShowDrawer(true);
    }

    function closeDrawer(){
        setShowDrawer(false);
    }


  return (
    <div className="MainPage">
      <div className="heroText">
                <h1>I’m Roey and this is my work</h1>
                <p>UI/UX | Motion | Code | Storytelling</p>
                <Gallery open={openDrawer} />
            </div>
            {showDrawer && <Drawer close={closeDrawer} />}
    </div>
  );
}
