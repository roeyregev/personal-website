interface Image {
    imageName: string;
    imageDescription: string;
    ratio?: string
  }
  
  interface Video {
    videoLink: string;
    videoDescription: string;
  }
class ProjectModel {
    public projectId!: number;
    public title!: string;
    public thumbnail!: string;
    public text!: string[];
    public images?: Image[];
    public videos?: Video[];
    public tags?: string[];
    public links?: string[];
}

export default ProjectModel