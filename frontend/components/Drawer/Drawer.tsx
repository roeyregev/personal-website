import ReactDOM from "react-dom";
import styles from "./Drawer.module.scss";
import IconClose from "../Icons/IconClose";
import IconArrow from "../Icons/IconArrow";
import ProjectModel from "@/Models/project-model";
import { useState } from "react";

interface DrawerProps {
    close: () => void;
    selectedProjectIndex: number | null;
    projects: ProjectModel[];
}

function Drawer({ close, selectedProjectIndex, projects }: DrawerProps): JSX.Element | null {

    //find the relevant project by its id
    const [selectedProject, setSelectedProject] = useState<ProjectModel | null>(projects.find(project => project.projectId === selectedProjectIndex) || null);
    console.log("initial project:");
    console.log(selectedProject);

    const portalRoot = document.getElementById("portal");
    if (!portalRoot) return null; // Don't render if the portal isn't available


    const nextProject = () => {
        if (selectedProject?.projectId) {
            const nextProject =
                projects.find((project) => project.projectId === selectedProject.projectId + 1) ||
                projects.find((project) => project.projectId === 1);
            setSelectedProject(nextProject || null);
        }
    };

    const previousProject = () => {
        if (selectedProject?.projectId) {
            const previousProject =
                projects.find((project) => project.projectId === selectedProject.projectId - 1) ||
                projects.find((project) => project.projectId === Math.max(...projects.map(p => p.projectId)));
            setSelectedProject(previousProject || null);
        }
    };
    





    return ReactDOM.createPortal(
        <>
            <div className={styles.Drawer}>
                <div className={styles.dragLine}></div>
                <div className={styles.navIcons}>
                    <div className={styles.blankIcon}><p className={styles.blank}>blank</p></div>
                    <div className={styles.changePageFlex}>
                        <div className={styles.previousIcon} onClick={previousProject}><IconArrow /></div>
                        <div className={styles.navIcon} onClick={nextProject}><IconArrow /></div>
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

                    {/* images: */}
                    {selectedProject?.images && selectedProject?.images.length > 0 && (
                        <div className={styles.imagesContainer}>
                            {selectedProject?.images?.map((item) =>
                                <div className={styles.box} key={selectedProject.projectId + "." + selectedProject.images?.indexOf(item)}>
                                    <img className={styles.projectImage} src={"/images/" + item.imageName} alt={item.imageName} />
                                    <p className={styles.imageDescription}>{item.imageDescription}</p>
                                </div>)}
                        </div>
                    )}

                    {/* videos: */}
                    {selectedProject?.videos && selectedProject?.videos.length > 0 && (
                        <div className={styles.videoContainer}>
                            {selectedProject?.videos?.map((item) =>
                                <div className={styles.box} key={selectedProject.projectId + "." + selectedProject.videos?.indexOf(item)}>
                                    <div className={styles.iframeContainer}>
                                        <iframe
                                            className={styles.projectVideo}
                                            src={item.videoLink}
                                            title={item.videoDescription}
                                            // frameBorder="0"
                                            // width={1920}
                                            // height={1080}
                                            // allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                    <p className={styles.videoDescription}>{item.videoDescription}</p>
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
