

import styles from "./Gallery.module.scss";
// import projectsData from "../../ProjectsData/projects.json"
import { useEffect, useState } from "react";
import ProjectModel from "../../Models/project-model";

interface GalleryProps {
    open: (projectId: number) => void;
    projects: ProjectModel[];
}

function Gallery(props: GalleryProps): JSX.Element {

    // const [projects, setProject] = useState<ProjectModel[]>()
    const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

    // //Get projects list
    // useEffect(() => {
    //     setProject(projectsData);
    //     // console.log(projects);
    // }, []);

    const handleProjectClick = (projectIndex: number | null) => {
        setSelectedProjectIndex(projectIndex);
        projectIndex && props.open(projectIndex); // Open the drawer after setting the selected index       
        console.log("project index: " + projectIndex);
        console.log("selected project index: " + selectedProjectIndex);

    };

    return (
        <div className={styles.Gallery}>
            {props.projects?.map((p) =>
                <a
                    className={styles.projectThumbnail}
                    key={p.projectId}
                    onClick={() => handleProjectClick(p.projectId)}>
                    <img
                        src={`/Images/Thumbnails/${p.thumbnail}`}
                        alt={p.thumbnail} />
                    <p className={styles.thumbnailTitle}>{p.title}</p>
                </a>)}
        </div>
    );
}

export default Gallery;
