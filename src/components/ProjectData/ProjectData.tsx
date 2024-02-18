'use client'

import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "@/queries/projectsQuery";
import Spinner from "../Spinner/Spinner";
import ClientInfo from "../ClientInfo/ClientInfo";

interface ParamsProps{
    params: string | string[]
}

export default function ProjectData({ params }: ParamsProps){
    const { loading, data, error } = useQuery(GET_PROJECT,{
        variables: { id: params }
    });

    const colorStatus = {
        color: 'black'
    }

    if(data?.project.status === 'NOT STARTED'){
        colorStatus.color = 'black'
    } else if(data?.project.status === 'IN PROGRESS'){
        colorStatus.color = 'blue'
    } else if(data?.project.status === 'COMPLETED'){
        colorStatus.color = 'green'
    }

    if(loading) return <Spinner/>
    if(error) return <p>Algo está errado</p>

     return(
        <>
            {!loading && !error && (
                <div>
                    <h1 className="text-3xl text-center">{ data.project.name }</h1>
                    <p className="mt-3 text-2xl">{ data.project.description }</p>
                    <h5 className="mt-5 text-2xl font-semibold" >Project Status:</h5>
                    <p style={colorStatus} className="lead font-semibold text-2xl" > { data.project.status }</p>
                    <ClientInfo client={data.project.client} />
                </div>
            )}
        </>
     )
}