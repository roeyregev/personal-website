class ProjectModel {
    public projectId!: number;
    public title!: string;
    public thumbnail!: string;
    public text!: string;
    public images?: {}[];
    public videos?: {}[];
    public tags?: string[];
}


export default ProjectModel