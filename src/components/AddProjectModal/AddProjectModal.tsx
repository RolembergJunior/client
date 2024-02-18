'use client'

import { useMutation, useQuery } from "@apollo/client";
import { FormEvent, useState } from "react";
import { ADD_PROJECT } from "@/mutations/projectMutations"; 
import { BsCardText } from "react-icons/bs";
import { TbProgress } from "react-icons/tb";
import { GET_PROJECTS } from "@/queries/projectsQuery";
import { FaUsers } from "react-icons/fa";
import { GET_CLIENTS } from "@/queries/clientsQuery";
import { ClientProps, ProjectsProps } from "@/utils/Types";
import { RiMacbookLine } from "react-icons/ri";
import { toast } from "sonner";


interface PropsProjectModal{
    modalIsOpen: boolean,
    setModalIsOpen: (e:boolean) => void
}

export default function AddProjectModal({ modalIsOpen, setModalIsOpen }:PropsProjectModal){
    const [dataInputProject, setDataInputProject ] = useState({ name: '', description: '', status: '', clientId: ''});
    const { name, description, clientId, status } = dataInputProject;
    const { loading, data, error } = useQuery<ClientProps>(GET_CLIENTS);
    const [addProject] = useMutation(ADD_PROJECT, {
        variables:{ name, description, status, clientId },
        update(cache, { data: { addProject } }){
            const { projects }:ProjectsProps = cache.readQuery({ query: GET_PROJECTS })
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] }
            })
        }
    })

    function onHandleSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        addProject({ variables:{ name, description, clientId, status } });
        setDataInputProject({ name: '', description: '', status: '', clientId: '' });
        toast.success('Projeto criado com sucesso!', { position: 'top-center', invert:true})
    }


    if (modalIsOpen) return(
    <div>
        <form className="mx-auto p-4" onSubmit={(e) => onHandleSubmit(e)}>
            <h1 className="text-start font-semibold text-3xl my-5">Adicionar Projeto</h1>
                <div className="flex flex-col mb-3">
                    <RiMacbookLine />
                    <label>Nome do Projeto</label>
                    <input className="border p-2 rounded-md" onChange={(e) => setDataInputProject({...dataInputProject ,name: e.target.value })} type="text" placeholder="Rolemberg Junior" value={name} id="nameInput" required/>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col mb-3 w-[50%]">
                        <BsCardText />
                        <label>Descrição</label>
                        <input className="border p-2 rounded-md" onChange={(e) => setDataInputProject({...dataInputProject ,description: e.target.value })} type="text" placeholder="Projeto criado para ...." value={description} id="descriptionInput" required />
                    </div>
                    <div className="flex flex-col mb-3 w-[50%]">
                        <TbProgress />
                        <label>Status</label>
                        <select onChange={(e) => setDataInputProject({ ...dataInputProject, status: e.target.value })} className="border p-2 rounded-md" name="status" id="statusSelect" required>
                            <option value="">Selecione</option>
                            <option value="new">Não iniciado</option>
                            <option value="progress">Em progresso</option>
                            <option value="completed">Completado</option>
                        </select>
                    </div>
                    <div className="flex flex-col mb-3 w-[50%]">
                        <FaUsers className="icon" />
                        <label>Cliente</label>
                        <select onChange={(e) => setDataInputProject({ ...dataInputProject, clientId: e.target.value })} className="border p-2 rounded-md" name="clients" id="clientSelect" required >
                            <option value='' >Selecione</option>
                            { data?.clients.map( client => (
                                <option key={client.id} value={ client.id }>{ client.name }</option>
                            ) ) }    
                        </select>   
                    </div>
                </div>
            <div className="flex justify-end gap-4">
                <button onClick={() => setModalIsOpen(false)} className="btn btn-secondary">Cancelar</button>
                <button type="submit" className="btn btn-primary">Adicionar</button>
            </div>
        </form>
    </div>
    )
}