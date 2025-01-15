import ReactDOM from "react-dom";
import styles from "./Drawer.module.scss";
import IconClose from "../Icons/IconClose";
import IconArrow from "../Icons/IconArrow";
import ProjectModel from "@/Models/project-model";
import { useEffect, useRef, useState } from "react";
import { animate, AnimatePresence, easeIn, motion } from "framer-motion";

interface DrawerProps {
    close: () => void;
    selectedProjectIndex: number | null;
    projects: ProjectModel[];
}

function Drawer({ close, selectedProjectIndex, projects }: DrawerProps): JSX.Element | null {

    const [isClosing, setIsClosing] = useState(false);
    const [fontSize, setFontSize] = useState(2.6); // Starting font size in rem
    const contentRef = useRef<HTMLDivElement>(null);


    //Sticky title font size change on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (contentRef.current) {
                const maxFontSize = 2.6; // Maximum font size in rem
                const minFontSize = 1.6; // Minimum font size in rem
                const scrollTop = contentRef.current.scrollTop;

                // Adjust font size based on scroll position
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

    // Framer Motion Variants for Animation
    const drawerVariants = {
        hidden: {
            y: "20%", // Start off-screen at the bottom
            opacity: 0, // Fully transparent
            left: 0
        },
        visible: {
            y: 0,       // Slide to its final position
            opacity: 1, // Fully visible
            transition: { duration: 0.25, ease: "easeOut" }, // Smooth animation
            left: 0
        },
        exit: {
            y: "20%", // Slide back down
            opacity: 0, // Fade out
            transition: { duration: 0.2, ease: "easeOut" }, // Faster exit
            left: 0
        },
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(close, 1);
    };

    const closeIconVariants = {
        initial: {
            rotate: -45,
            scale: 0.5
        },
        animate: {
            rotate: 0,
            scale: 1,

            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        },
        exit: {
            rotate: 45,
            scale: 0,

            transition: {
                duration: 0.3,
                ease: "easeIn"
            }
        },
        hover: {
            scale: 0.9,
            rotate: 90,

            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }

        },
        tap: {
            scale: 1.1,
            rotate: 180,
            transition: {
                // times: [0,0.3,0.5,1],
                duration: 0.1,
                ease: "easeInOut"
            }
        }
    };

    const nextButtonVariants = {
        initial: {
            x: -20,
            opacity: 0
        },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1,
            x: 2,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
            }
        },
        tap: {
            x: 5,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        }
    };
    const prevButtonVariants = {
        initial: {
            x: 20,
            opacity: 0,
            rotate: 180

        },
        animate: {
            x: 0,
            opacity: 1,
            rotate: 180,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1,
            x: -2,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
            }
        },
        tap: {
            x: -5,
            rotate: 180,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        }
    };

    return ReactDOM.createPortal(
        <motion.div
            className={styles.Drawer}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={drawerVariants}

            onAnimationComplete={(definition) => {
                if (definition === "exit") {
                    close(); // Call the close function after the exit animation completes
                }
            }}
        >

            {/* Drawer navigation panel */}
            <div className={styles.drawerTop}>
                <div className={styles.dragLine}></div>
                <div className={styles.navIcons}>
                    <div className={styles.blankIcon}><p className={styles.blank}>blank</p></div>
                    <div className={styles.changePageFlex}>
                        <motion.div
                            className={styles.previousIcon}
                            onClick={previousProject}
                            variants={prevButtonVariants}
                            initial="initial"
                            animate="animate"
                            whileTap="tap"
                            whileHover="hover"
                        >
                            <IconArrow />
                        </motion.div>
                        <motion.div
                            className={styles.navIcon}
                            onClick={nextProject}
                            variants={nextButtonVariants}
                            initial="initial"
                            animate="animate"
                            whileTap="tap"
                            whileHover="hover"
                        >
                            <IconArrow />
                        </motion.div>
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key="closeIcon"
                            className={styles.navIcon}
                            onClick={handleClose}
                            variants={closeIconVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <IconClose />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Drawer content */}

            <div className={styles.projectContentContainer} ref={contentRef}>

                <div className={styles.titleContainer} >
                    <h2 className={styles.title} style={{ fontSize: `${fontSize}rem` }}>
                        {selectedProject?.title}
                    </h2>
                </div>

                <div className={styles.tagsContainer}>
                    {selectedProject?.tags?.map((t) => <span className={styles.tag} key={selectedProject.projectId + "." + selectedProject.tags?.indexOf(t)}>{t}</span>)}
                </div>

                <div className={styles.description}>
                    {selectedProject?.text?.map((par) =>
                        <div className={styles.mainText} key={selectedProject.projectId + "." + selectedProject.text?.indexOf(par)}>
                            <p className={styles.paragraph}>{par}</p>
                        </div>)}
                    <div className={styles.threeDots}>
                        <div className={styles.dot}></div>
                        <div className={styles.bigDot}></div>
                        <div className={styles.dot}></div>
                    </div>
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
        </motion.div>,
        portalRoot
    );
}

export default Drawer;
