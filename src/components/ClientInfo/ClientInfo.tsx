import { FaEnvelope, FaIdBadge, FaPhone } from "react-icons/fa";


export default function ClientInfo({ client }){
    return(
        <>
            <h1 className="text-2xl my-5 font-bold">Client Information</h1>
                <ul className="list-group">
                    <li className="list-group-item flex items-center gap-2">
                        <FaIdBadge className="icon" />
                        { client.name }
                    </li>
                    <li className="list-group-item flex items-center gap-2">
                        <FaEnvelope className="icon" />
                        { client.email }
                    </li>
                    <li className="list-group-item flex items-center gap-2">
                        <FaPhone className="icon" />
                        { client.phone }
                    </li>
                </ul>
            
        </>
    )
}