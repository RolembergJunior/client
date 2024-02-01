'use client'

import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../../queries/clientsQuery"
import ClientRow from '../../components/ClientRow/ClientRow';
import Spinner from "../Spinner/Spinner";
import Header from "../Header/Header";

export default function Clients(){

    const {loading, error, data} = useQuery(GET_CLIENTS);


    if(loading) return <Spinner/>
    if(error) return <p>Alguma coisa deu errado</p>

    return(
        <div className="relative">
            { !loading && !error && (
            <>
                <Header/>
                <table className="table table-auto mt-3">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.clients.map(clients => (
                                <ClientRow key={clients.id} clients={clients}/>
                            ))}
                        </tbody>
                    </table>
            </>
        )}
        </div>   
    )
}