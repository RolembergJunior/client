'use client'

import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "@/queries/projectsQuery";
import Spinner from "../Spinner/Spinner";
import ClientInfo from "../ClientInfo/ClientInfo";
import Header from "../Header/Header";

interface ParamsProps{
    params: string
}

export default function ProjectData({ params }: ParamsProps){
    const { loading, data, error } = useQuery(GET_PROJECT,{
        variables: { id: params }
    });

    if(loading) return <Spinner/>
    if(error) return <p>Algo está errado</p>

     return(
        <>
            {!loading && !error && (
                <div>
                    <h1 className="text-3xl text-center">{ data.project.name }</h1>
                    <p className="mt-3 text-2xl">{ data.project.description }</p>
                    <h5 className="mt-5 text-2xl font-semibold" >Project Status:</h5>
                    <p className="lead font-normal text-2xl" > Completed { data.project.status }</p>
                    <ClientInfo client={data.project.client} />
                </div>
            )}
        </>
     )
}