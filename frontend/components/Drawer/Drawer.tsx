import ReactDOM from "react-dom";
import styles from "./Drawer.module.scss";
import IconClose from "../Icons/IconClose";
import IconArrow from "../Icons/IconArrow";
import ProjectModel from "@/Models/project-model";

interface DrawerProps {
    close: () => void;
    selectedProjectIndex: number | null;
    projects: ProjectModel[];
}

function Drawer({ close, selectedProjectIndex, projects }: DrawerProps): JSX.Element | null {

    const portalRoot = document.getElementById("portal");
    if (!portalRoot) return null; // Don't render if the portal isn't available

    //find the relevant project by its id
    const selectedProject = projects.find(project => project.projectId === selectedProjectIndex);
    console.log(selectedProject);

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

                <div className={styles.projectContentContainer}>
                    <h2 className={styles.title}>{selectedProject?.title} </h2>

                    <div className={styles.tagsContainer}>
                        {selectedProject?.tags?.map((t) => <span className={styles.tag} key={selectedProject.projectId + "." + selectedProject.tags?.indexOf(t)}>{t}</span>)}
                    </div>
                    <div className={styles.description}>
                        {selectedProject?.text}
                    </div>

                    {selectedProject?.images && selectedProject?.images.length > 0 && (
                        <div className={styles.imagesContainer}>
                            {selectedProject?.images?.map((item) =>
                            <div className={styles.box} key={selectedProject.projectId + "." + selectedProject.images?.indexOf(item)}>
                             IMAGES 
                            </div>)}
                        </div>
                    )}

                    <div className={styles.content}>

                    </div>

                </div>
            </div>
        </>,
        portalRoot
    );
}

export default Drawer;
