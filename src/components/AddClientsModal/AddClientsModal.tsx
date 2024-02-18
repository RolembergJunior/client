'use client'

import { ADD_CLIENT } from "@/mutations/clientMutations";
import { GET_CLIENTS } from "@/queries/clientsQuery";
import { ClientProps } from "@/utils/Types";
import { useMutation } from "@apollo/client";
import { FormEvent, useState } from "react"
import { FaPhone, FaUser } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import {  toast } from "sonner";

interface ClientModalProps{
    isModalOpen: boolean,
    setIsModalOpen: (e:boolean) => void
}

export default function AddClientsModal({ isModalOpen, setIsModalOpen }:ClientModalProps){
    const [dataInputClient, setDataInputClient] = useState({name: '', email: '', phone:''});
    const { name, email, phone } = dataInputClient;
    const [addClient] = useMutation(ADD_CLIENT,{
        variables: { name, email, phone },
        update(cache, { data: { addClient } }){
            const { clients }:ClientProps = cache.readQuery({
                query: GET_CLIENTS})
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] }
            });
        }
    });

    function onHandleSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault();

        addClient({ variables: { name, email, phone } });
        setDataInputClient({ name: '', email: '', phone:'' });
        toast.success('Cliente adicionado com sucesso',{ position: 'top-center', invert:true})
    }

    if( isModalOpen )return(
        <div>
            <form className="mx-auto p-4" onSubmit={(e) => onHandleSubmit(e)}>
                <h1 className="text-start font-semibold text-3xl my-5">Adicionar Cliente</h1>
                    <div className="flex flex-col mb-3">
                        <FaUser/>
                        <label>Nome</label>
                        <input className="border p-2 rounded-md" onChange={(e) => setDataInputClient({...dataInputClient ,name: e.target.value })} type="text" placeholder="Rolemberg Junior" value={name} id="nameInput" required/>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col mb-3 w-[50%]">
                            <MdEmail />
                            <label>E-mail</label>
                            <input className="border p-2 rounded-md" onChange={(e) => setDataInputClient({...dataInputClient ,email: e.target.value })} type="email" placeholder="junior@gmail.com" value={email} id="emailInput" required/>
                            <div className="my-2">Nós nunca iremos compartilhar seu e-mail</div>
                        </div>
                        <div className="flex flex-col mb-3 w-[50%]">
                            <FaPhone />
                            <label> Telefone </label>
                            <input className="border p-2 rounded-md" onChange={(e) => setDataInputClient({...dataInputClient ,phone: e.target.value })} type="tel" placeholder="(xx)xxxx-xxx" value={phone} id="phoneinput" required/>
                        </div>
                    </div>
                <div className="flex justify-end gap-4">
                    <button onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Cancelar</button>
                    <button type="submit" className="btn btn-primary">Adicionar</button>
                </div>
            </form>
        </div>
    )
}