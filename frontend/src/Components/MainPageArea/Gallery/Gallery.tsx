import "./Gallery.css";
import projectsData from "../../../ProjectsData/projects.json"
import { useEffect, useState } from "react";
import ProjectModel from "../../../Models/project-model";

interface DrawerProps {
    open: Function;
}

function Gallery(props: DrawerProps): JSX.Element {

    const [projects, setProject] = useState<ProjectModel[]>()

    //Get projects list
    useEffect(() => {
        setProject(projectsData);
        console.log(projects);

        // Cleanup function
        return () => {
            // Perform any necessary cleanup here
            console.log("Cleaning up...");
        }
    }, []);


    return (
        <div className="Gallery">
            {projects?.map(p => <a
                className="projectThumbnail" key={p.projectId} onClick={() => props.open()}>  
                <img src={`/Images/Thumbnails/${p.thumbnail}`} alt={p.thumbnail} />
                <p>{p.title}</p>
            </a>)}
        </div>

    );
}

export default Gallery;
