import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '@/queries/projectsQuery';
import Spinner from '../Spinner/Spinner';
import ProjectCard from '../ProjectCard/ProjectCard';
import { ProjectsProps } from '@/utils/ClientType';

export default function Projects(){

    const { loading, data, error } = useQuery<ProjectsProps>(GET_PROJECTS);


    if(loading) return <Spinner/>
    if(error) return <p>Alguma coisa está errada</p>

    return(
            <div className='row w-[90%] mx-auto' > 
                {data?.projects.map(( project ) => (
                    <ProjectCard key={project.id} project={project}/>
                ))}
            </div>
        ) 
}