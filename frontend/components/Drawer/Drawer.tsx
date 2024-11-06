import ReactDOM from "react-dom";
import styles from "./Drawer.module.scss";
import IconClose from "../Icons/IconClose";
import IconArrow from "../Icons/IconArrow";
import { transform } from "next/dist/build/swc/generated-native";
import ProjectModel from "@/Models/project-model";


interface DrawerProps {
    close: () => void;
    selectedProjectIndex: number | null;
    projects: ProjectModel[];
}

function Drawer({ close, selectedProjectIndex, projects }: DrawerProps): JSX.Element | null {
    
    const portalRoot = document.getElementById("portal");
    if (!portalRoot) return null; // Don't render if the portal isn't available

    console.log("Drawer prop: " + selectedProjectIndex);

    return ReactDOM.createPortal(
        <>
            <div className={styles.Drawer}>
                <div className={styles.dragLine}></div>
                <div className={styles.navIcons}>
                    <div className={styles.blankIcon}><p className={styles.blank}>blank</p></div>
                    <div className={styles.changePageFlex}>
                        <div className={styles.previousIcon}><IconArrow /></div>
                        <div className={styles.navIcon} ><IconArrow /></div>
                    </div>
                    <div className={styles.navIcon} onClick={close}><IconClose /></div>
                </div>

                <div className="projectContentContainer">
                    <h2>Number: {selectedProjectIndex} </h2>
                    <div className="tagsContainer">

                    </div>
                    <div className="description">

                    </div>
                    <div className="content">

                    </div>

                </div>
            </div>
        </>,
        portalRoot
    );
}

export default Drawer;
