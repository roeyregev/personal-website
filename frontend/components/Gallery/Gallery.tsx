import styles from "./Gallery.module.scss";
import { useState } from "react";
import ProjectModel from "../../Models/project-model";
import Image from 'next/image';

interface GalleryProps {
    callback: (projectId: number) => void;
    projects: ProjectModel[];
}

function Gallery(props: GalleryProps): JSX.Element {

    const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

    const handleProjectClick = (projectIndex: number | null) => {
        console.log(selectedProjectIndex);
        setSelectedProjectIndex(projectIndex);
    
        if (projectIndex !== null) {
            props.callback(projectIndex);
        }
    };

    
    // const handleProjectClick = (projectIndex: number | null) => {
    //     console.log(selectedProjectIndex);
    //     setSelectedProjectIndex(projectIndex);
    //     projectIndex && props.callback(projectIndex);
    // };

    return (
        <div className={styles.Gallery}>
            {props.projects?.map((p) =>
                <a
                    className={styles.projectThumbnail}
                    key={p.projectId}
                    onClick={() => handleProjectClick(p.projectId)}>
                    <Image
                        className={styles.galleryImage}
                        src={`/images/Thumbnails/${p.thumbnail}`}
                        alt={p.thumbnail}
                        width={300}
                        height={300}
                        priority={p.projectId <= 6}
                    />
                    <p className={styles.thumbnailTitle}>{p.title}</p>
                </a>)}
        </div>
    );
}

export default Gallery;
