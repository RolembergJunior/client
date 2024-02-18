'use client'

import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../../queries/clientsQuery"
import ClientRow from '../../components/ClientRow/ClientRow';
import Spinner from "../Spinner/Spinner";
import Header from "../Header/Header";
import Projects from "../Projects/Projects";
import { ClientProps } from "@/utils/Types";

export default function Clients(){

    const {loading, error, data} = useQuery<ClientProps>(GET_CLIENTS);


    if(loading) return <Spinner/>
    if(error) return <p>Alguma coisa deu errado</p>

    return(
        <div className="relative">
            { !loading && !error && (
            <>
                <Header/>
                <Projects/>
                <table className="table w-[90%] mt-16 mx-auto">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.clients.map(client => (
                                <ClientRow key={client.id} client={client}/>
                            ))}
                        </tbody>
                    </table>
            </>
        )}
        </div>   
    )
}