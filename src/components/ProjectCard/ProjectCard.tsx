import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from '@/mutations/projectMutations';
import { FaTrash } from "react-icons/fa";
import { GET_PROJECTS } from "@/queries/projectsQuery";
import { ProjectsProps } from "@/utils/Types";
import { toast } from "sonner";

interface ProjectProps{
    project: { id: string, name:string, description: string, status: string, clientId: string }
}

export default function ProjectCard({ project }:ProjectProps){
    const [deleteProject] = useMutation(DELETE_PROJECT,{
        variables: {id: project.id},
        update(cache, { data: { deleteProject } }) {
            const { projects }:ProjectsProps = cache.readQuery({
                query: GET_PROJECTS});
                cache.writeQuery({
                    query: GET_PROJECTS,
                    data: { projects: projects.filter( project => project.id !== deleteProject.id )},
                });
        }
    });

    function onHandleDeleteProject(){
        deleteProject();
        toast.success('Projeto excluído com sucesso!',{ position: 'top-center', invert:true});
    }

    return(
        <div className="flex w-[32%]">
            <div className="border p-4 w-full rounded-md">
                <div className="">
                        <div className="flex justify-between items-center">
                            <h5 className="card-title">{ project.name }</h5>
                            <div className="flex justify-around gap-3">
                                <a className="btn btn-light" href={`/${project.id}`}>View</a>
                                <button onClick={() => onHandleDeleteProject()} className="btn btn-danger btn-sm px-3">
                                    <FaTrash className="mx-auto" />
                                </button>
                            </div>
                        </div>
                    <p className="small">Status: <strong>{ project.status }</strong></p>
                </div>
                <div className="flex justify-end w-full">
                </div>
            </div>
        </div>
    )
}