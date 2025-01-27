import styles from "./Gallery.module.scss";
import {useState } from "react";
import ProjectModel from "../../Models/project-model";

interface GalleryProps {
    callback: (projectId: number) => void;
    projects: ProjectModel[];
}

function Gallery(props: GalleryProps): JSX.Element {

    const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

    const handleProjectClick = (projectIndex: number | null) => {
        setSelectedProjectIndex(projectIndex);
        projectIndex && props.callback(projectIndex); // Open the drawer after setting the selected index       
    };

    return (
        <div className={styles.Gallery}>
            {props.projects?.map((p) =>
                <a
                    className={styles.projectThumbnail}
                    key={p.projectId}
                    onClick={() => handleProjectClick(p.projectId)}>
                    <img
                        src={`/images/Thumbnails/${p.thumbnail}`}
                        alt={p.thumbnail} />
                    <p className={styles.thumbnailTitle}>{p.title}</p>
                </a>)}
        </div>
    );
}

export default Gallery;
