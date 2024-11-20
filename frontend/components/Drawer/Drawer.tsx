import ReactDOM from "react-dom";
import styles from "./Drawer.module.scss";
import IconClose from "../Icons/IconClose";
import IconArrow from "../Icons/IconArrow";
import ProjectModel from "@/Models/project-model";
import { useEffect, useRef, useState } from "react";

interface DrawerProps {
    close: () => void;
    selectedProjectIndex: number | null;
    projects: ProjectModel[];
}

function Drawer({ close, selectedProjectIndex, projects }: DrawerProps): JSX.Element | null {

    // const [isScrolled, setIsScrolled] = useState(false);
    const [fontSize, setFontSize] = useState(2.6); // Starting font size in rem
    const contentRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (contentRef.current && contentRef.current.scrollTop > 0) {
    //             setIsScrolled(true);
    //         } else {
    //             setIsScrolled(false);
    //         }
    //     };

    //     const contentElement = contentRef.current;
    //     contentElement?.addEventListener("scroll", handleScroll);

    //     return () => {
    //         contentElement?.removeEventListener("scroll", handleScroll);
    //     };
    // }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (contentRef.current) {
                const maxFontSize = 2.6; // Maximum font size in rem
                const minFontSize = 1.6; // Minimum font size in rem
                const scrollTop = contentRef.current.scrollTop;

                // Adjust font size based on scroll position (example formula)
                const newFontSize = Math.max(
                    minFontSize,
                    maxFontSize - scrollTop * 0.03 // Adjust the multiplier to control sensitivity
                );
                setFontSize(newFontSize);
            }
        };

        const contentElement = contentRef.current;
        contentElement?.addEventListener("scroll", handleScroll);

        return () => {
            contentElement?.removeEventListener("scroll", handleScroll);
        };
    }, []);

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
        <div className={styles.Drawer}>

            {/* Drawer navigation panel */}
            <div className={styles.drawerTop}>
                <div className={styles.dragLine}></div>
                <div className={styles.navIcons}>
                    <div className={styles.blankIcon}><p className={styles.blank}>blank</p></div>
                    <div className={styles.changePageFlex}>
                        <div className={styles.previousIcon} onClick={previousProject}><IconArrow /></div>
                        <div className={styles.navIcon} onClick={nextProject}><IconArrow /></div>
                    </div>
                    <div className={styles.navIcon} onClick={close}><IconClose /></div>
                </div>
            </div>

            {/* Drawer content */}

            <div className={styles.projectContentContainer} ref={contentRef}>

                <div className= {styles.titleContainer} >
                    <h2 className= {styles.title} style={{ fontSize: `${fontSize}rem`}}>
                        {selectedProject?.title}
                    </h2>
                </div>

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
                    <div className={styles.videosListContainer}>
                        {selectedProject?.videos?.map((item) =>
                            <div className={styles.box} key={selectedProject.projectId + "." + selectedProject.videos?.indexOf(item)}>
                                <div className={styles.iframeContainer}>
                                    <iframe
                                        className={styles.projectVideo}
                                        src={item.videoLink}
                                        title={item.videoDescription}
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                {item.videoDescription && <p className={styles.videoDescription}>{item.videoDescription}</p>}
                            </div>)}
                    </div>
                )}
            </div>
        </div>,
        portalRoot
    );
}

export default Drawer;
