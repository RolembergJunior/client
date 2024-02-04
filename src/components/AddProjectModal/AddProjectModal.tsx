'use client'

import { useMutation, useQuery } from "@apollo/client";
import { Dispatch, SetStateAction, useState } from "react";
import { ADD_PROJECT } from "@/mutations/addProject"; 
import { BsCardText } from "react-icons/bs";
import { TbProgress } from "react-icons/tb";
import { GET_PROJECTS } from "@/queries/projectsQuery";
import { FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { GET_CLIENTS } from "@/queries/clientsQuery";
import { ClientProps } from "@/utils/ClientType";


interface PropsProjectModal{
    modalIsOpen: boolean,
    setModalIsOpen: Dispatch<SetStateAction<boolean>>
}

interface ProjectProps{
    projects: { id:string, name: string, description: string, status: string,  }[]
}


export default function AddProjectModal({ modalIsOpen, setModalIsOpen }:PropsProjectModal){
    const [name, setName ] = useState('');
    const [ descripton, setDescription ] = useState('');
    const [ status, setStatus ] = useState('');
    const [ clientId, setClientId ] = useState('');
    const { loading, data, error } = useQuery<ClientProps>(GET_CLIENTS);
    const [ addProject ] = useMutation(ADD_PROJECT, {
        variables: { name, descripton, clientId },
        update(cache, { data: { addProject } }) {
            const { projects }:ProjectProps = cache.readQuery({query: GET_PROJECTS });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] }
            });
        } 
    })

    function onHandleSubmit(e){
        e.preventDefault();
        console.log(name, descripton, typeof(clientId), 'dados')
        if(!name || !descripton ){
            return alert('Por favor, preencha os campos')
        }
        addProject(name, descripton, clientId);

        setName('');
        setDescription('');
        setStatus('');
        setClientId('');
    }


    if (modalIsOpen) return(
        <>
            <div className="absolute top-24 left-[25%] flex flex-col justify-center bg-slate-400 bg-opacity-70 w-[50%] h-[500px] rounded-lg z-10" >
                        <IoMdClose onClick={() => setModalIsOpen(false)} className="absolute top-2 left-[95%] text-center cursor-pointer" size={35}/>
                        <form className="m-auto" onSubmit={(e) => onHandleSubmit(e)}>
                        <h1 className="text-center text-2xl mt-12">PREENCHA OS DADOS DO CLIENTE</h1>
                            <div className="flex flex-col mb-3">
                                <FaUser/>
                                <label className="form-label" htmlFor="name" >Nome Projeto</label>
                                <input onChange={(e) => setName(e.target.value)} value={name} placeholder="Projeto XXXX" type="text" className="w-[800px] rounded-md p-2" id="InputName" aria-describedby="emailHelp"/>
                            </div>
                            <div className="flex flex-col mb-3">
                                <BsCardText />
                                <label className="form-label" htmlFor="description">Descrição</label>
                                <input onChange={(e) => setDescription(e.target.value)} value={descripton} placeholder="Projeto de um..." type="text" className="w-[800px] rounded-md p-2" id="InputEmail"/>

                            </div>
                            {/* <div className="flex flex-col mb-3">
                                <TbProgress />
                                <label className="form-check-label" htmlFor="status">Status</label>
                                <select name="satus" id="status">
                                    <option value="">NOT STARTED</option>
                                    <option value="">IN PROGRESS</option>
                                    <option value="">COMPLETED</option>
                                </select>
                            </div> */}
                            <div className="flex flex-col mb-3">
                                <TbProgress />
                                <label className="form-check-label" htmlFor="clientId">Id do Cliente</label>
                                <select onChange={(e) => setClientId(e.target.value)} name="clients" id="status">
                                    { data?.clients.map( client => (
                                        <option key={client.id} value={client.id}>
                                            { client.name }
                                        </option>
                                    ) ) }
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
            </div>
        </>
    )
}