import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENTS } from '../../mutations/deleteClient';
import { GET_CLIENTS } from "@/queries/clientsQuery";
import { ClientProps } from "@/utils/ClientType";

interface ClientTypes{
    client: {name: string, email: string, phone: string, id:string}
}

export default function ClientRow({ client }:ClientTypes){
    const [deleteClient] = useMutation(DELETE_CLIENTS, {
        variables: { id: client.id },
        update(cache, { data: { deleteClient } }) {
            const { clients }:ClientProps = cache.readQuery({
                query: GET_CLIENTS});
                cache.writeQuery({
                    query: GET_CLIENTS,
                    data: { clients: clients.filter( client => client.id !== deleteClient.id )},
                });
        }
    });

    return(
        <tr>
            <td>{ client.name }</td>
            <td>{ client.email }</td>
            <td>{ client.phone }</td>
            <td>
                <button onClick={deleteClient} className="btn btn-danger btn-sm">
                    <FaTrash/>
                </button>
            </td>
        </tr>
    )
}