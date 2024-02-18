'use client'

import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '@/queries/projectsQuery';
import Spinner from '../Spinner/Spinner';
import ProjectCard from '../ProjectCard/ProjectCard';
import {  ProjectsProps } from '@/utils/Types';

export default function Projects(){

    const { loading, data, error } = useQuery<ProjectsProps>(GET_PROJECTS);


    if(loading) return <Spinner/>
    if(error) return <p>Alguma coisa está errada</p>

    const projectsNonDeleted = data?.projects.filter( project => project.client )


    return(
            <div className="flex flex-wrap gap-4 w-[90%] mx-auto" > 
                {projectsNonDeleted?.map(( project ) => (
                    <ProjectCard key={project.id} project={project}/>
                ))}
            </div>
        ) 
}