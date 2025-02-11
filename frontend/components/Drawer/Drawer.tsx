import ReactDOM from "react-dom";
import styles from "./Drawer.module.scss";
import IconClose from "../Icons/IconClose";
import IconArrow from "../Icons/IconArrow";
import ProjectModel from "@/Models/project-model";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "../../components/Loader/Loader";
import Image from 'next/image';

interface DrawerProps {
    close: () => void;
    selectedProjectIndex: number | null;
    projects: ProjectModel[];
}

function Drawer({ close, selectedProjectIndex, projects }: DrawerProps): JSX.Element | null {

    const [isClosing, setIsClosing] = useState(false);
    const [fontSize, setFontSize] = useState(2.2); // Starting font size in rem
    const contentRef = useRef<HTMLDivElement>(null);

    //loading state for skeleton purpose:
    const [imageLoadingState, setImageLoadingState] = useState<Record<string, boolean>>({});

    // Add a state to track loading iframes
    const [loadingIframes, setLoadingIframes] = useState<Record<string, boolean>>({});

    //find the relevant project by its id
    const [selectedProject, setSelectedProject] = useState<ProjectModel | null>(projects.find(project => project.projectId === selectedProjectIndex) || null);

    const handleIframeLoad = (videoIndex: number) => {
        setLoadingIframes(prev => ({
            ...prev,
            [videoIndex]: false
        }));
    };

    // When selected project changes, reset loading states
    useEffect(() => {
        if (selectedProject?.videos) {
            const newLoadingState: Record<string, boolean> = {};
            selectedProject.videos.forEach((_, index) => {
                newLoadingState[index] = true;
            });
            setLoadingIframes(newLoadingState);
        }
    }, [selectedProject]);

    //skeleton:
    // When a new project is selected, reset image loading states
    useEffect(() => {
        if (selectedProject?.images) {
            const newLoadingState: Record<string, boolean> = {};
            selectedProject.images.forEach((_, index) => {
                newLoadingState[index] = true;
            });
            setImageLoadingState(newLoadingState);
        }
    }, [selectedProject]);

    // Reset scroll position when selected project changes
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
    }, [selectedProject]);

    //Sticky title font size change on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (contentRef.current) {
                const maxFontSize = 2.2; // Maximum font size in rem
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
        console.log(isClosing);
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
            scale: 1.05,
            x: 2,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
            }
        },
        tap: {
            scale: 1.05,
            x: 20,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
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
            scale: 1.05,
            x: -2,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
            }
        },
        tap: {
            scale: 1.05,
            x: -20,
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
                    <h2 className={styles.projectTitle} style={{ fontSize: `${fontSize}rem` }}>
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

                    {/* links */}
                    {selectedProject?.links && selectedProject.links.length > 0 && (
                        <div className={styles.linksContainer}>
                            {selectedProject.links.map((link, index) => (
                                <div
                                    className={styles.link}
                                    key={`${selectedProject.projectId}.${index}`}
                                >
                                    <a href={link} target="_blank" rel="noopener noreferrer">Go to site</a>

                                </div>
                            ))}
                        </div>
                    )}

                    <div className={styles.threeDots}>
                        <div className={styles.dot}></div>
                        <div className={styles.bigDot}></div>
                        <div className={styles.dot}></div>
                    </div>
                </div>

                {/* images: */}
                {selectedProject?.images && selectedProject?.images.length > 0 && (
                    <div className={styles.imagesContainer}>
                        {selectedProject.images.map((item, index) => {
                            const isGif = item.imageName.toLowerCase().endsWith(".gif");
                            const isWide = item.ratio === "wide"; // Check if the image has "ratio": "wide"
                            return (
                                <div
                                    className={`${styles.box} ${isGif ? styles.gifBox : ""} ${isWide ? styles.wide : ""}`}
                                    key={`${selectedProject.projectId}.${index}`}
                                >
                                    {imageLoadingState[index] && <div className={styles.skeleton}></div>} {/* Skeleton loader */}

                                    {/* <img
                                        className={`${styles.projectImage} ${isGif ? styles.gifImage : ""}`}
                                        src={`/images/${item.imageName}`}
                                        alt={item.imageName}
                                        onLoad={() => setImageLoadingState((prev) => ({ ...prev, [index]: false }))} // Hide skeleton on load
                                        style={{ display: imageLoadingState[index] ? "none" : "block" }} // Hide image while loading
                                    /> */}

                                    <Image
                                        className={`${styles.projectImage} ${isGif ? styles.gifImage : ""}`}
                                        src={`/images/${item.imageName}`}
                                        alt={item.imageName}
                                        width={isWide ? 1000 : 600}
                                        height={isWide ? 1000 : 600}
                                        unoptimized // Disables Next.js compression
                                        onLoadingComplete={() => setImageLoadingState((prev) => ({ ...prev, [index]: false }))}
                                        priority={index === 0}
                                    />


                                    {item.imageDescription && (
                                        <p className={styles.imageDescription}>{item.imageDescription}</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* videos: */}
                {selectedProject?.videos && selectedProject?.videos.length > 0 && (
                    <div className={styles.videosListContainer}>
                        {selectedProject?.videos?.map((item, index) => (
                            <div
                                className={styles.box}
                                key={selectedProject.projectId + "." + selectedProject.videos?.indexOf(item)}
                            >
                                <div className={styles.iframeContainer}>
                                    {loadingIframes[index] && <Loader />}
                                    <iframe
                                        className={styles.projectVideo}
                                        src={item.videoLink}
                                        title={item.videoDescription}
                                        allowFullScreen
                                        onLoad={() => handleIframeLoad(index)}
                                    />
                                </div>
                                {item.videoDescription && (
                                    <p className={styles.videoDescription}>{item.videoDescription}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </motion.div>,
        portalRoot
    );
}

export default Drawer;