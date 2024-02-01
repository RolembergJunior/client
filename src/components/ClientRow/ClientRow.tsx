import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENTS } from '../../mutations/deleteClient';
import { GET_CLIENTS } from "@/queries/clientsQuery";

export default function ClientRow({ clients }){
    const [deleteClient] = useMutation(DELETE_CLIENTS, {
        variables: { id: clients.id },
        update(cache, { data: { deleteClient } }) {
            const { clients } = cache.readQuery({
                query: GET_CLIENTS});
                cache.writeQuery({
                    query: GET_CLIENTS,
                    data: { clients: clients.filter( client => client.id !== deleteClient.id )},
                });
        }
    });

    return(
        <tr>
            <td>{ clients.name }</td>
            <td>{ clients.email }</td>
            <td>{ clients.phone }</td>
            <td>
                <button onClick={deleteClient} className="btn btn-danger btn-sm">
                    <FaTrash/>
                </button>
            </td>
        </tr>
    )
}