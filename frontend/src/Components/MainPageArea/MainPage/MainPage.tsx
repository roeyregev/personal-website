import { useState } from "react";
import Drawer from "../Drawer/Drawer";
import Gallery from "../Gallery/Gallery";
import "./MainPage.css";

function MainPage(): JSX.Element {

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

export default MainPage;
