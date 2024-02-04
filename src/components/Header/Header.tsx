import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "@/queries/clientsQuery";
import { ADD_CLIENT } from '@/mutations/addClient'
import AddProjectModal from "../AddProjectModal/AddProjectModal";
import { ClientProps } from "@/utils/ClientType";
import { GoPlus } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { FaPhone, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


export default function Header(){
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalAddProject, setIsOpenModalAddProject] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [addClient] = useMutation(ADD_CLIENT,{
        variables: { name, email, phone },
        update(cache, { data: { addClient } }) {
            const { clients }:ClientProps = cache.readQuery({query: GET_CLIENTS });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] }
            });
        } 
    });

    function onHandleSubmit(e){
        e.preventDefault();
        if(!name || !email || !phone ){
            return alert('Por favor, preencha os campos')
        }

        addClient(name, email, phone);

        setName('');
        setEmail('');
        setPhone('');
    }


    return(
        <header className="relatie flex justify-between items-center">
            <div>
                <a href="/" className='flex items-center gap-2 p-4'>
                    <img src='./Logo.png' alt="Logo" width={50}/>
                    <div>Projeto Manager</div>
                </a>
            </div>
            <div className="flex gap-2">
                <div className="flex items-center btn btn-primary cursor-pointer" onClick={() => setIsOpenModal(true)}>
                    <FaUser className="icon"/>
                    <p>Add clientes</p>
                </div>
                <div className="flex items-center btn btn-primary cursor-pointer mr-4" onClick={() => setIsOpenModalAddProject(true)}>
                    <GoPlus className="icon" />
                    <p>Add Projects</p>
                </div>
            </div>
            { isOpenModal ? 
                    <div className="absolute top-24 left-[25%] flex flex-col justify-center bg-slate-400 bg-opacity-70 w-[50%] h-[500px] rounded-lg z-10" >
                        <IoMdClose onClick={() => setIsOpenModal(false)} className="absolute top-2 left-[95%] text-center cursor-pointer" size={35}/>
                        <form className="m-auto" onSubmit={(e) => onHandleSubmit(e)}>
                        <h1 className="text-center text-2xl mt-12">PREENCHA OS DADOS DO CLIENTE</h1>
                            <div className="flex flex-col mb-3">
                                <FaUser/>
                                <label htmlFor="InputName" className="form-label">Nome</label>
                                <input onChange={(e) => setName(e.target.value)} placeholder="Rolemberg Junior" type="text" className="w-[800px] rounded-md p-2" id="InputName" aria-describedby="emailHelp"/>
                            </div>
                            <div className="flex flex-col mb-3">
                                <MdEmail />
                                <label htmlFor="InputEmail" className="form-label">E-mail</label>
                                <input onChange={(e) => setEmail(e.target.value)} placeholder="junior.45098@gmail.com" type="email" className="w-[800px] rounded-md p-2" id="InputEmail"/>
                                <div>Nós nunca iremos compartilhar seu e-mail</div>
                            </div>
                            <div className="flex flex-col mb-3">
                                <FaPhone />
                                <label className="form-check-label" htmlFor="phone">Telefone</label>
                                <input onChange={(e) => setPhone(e.target.value)} placeholder="(31)xxxx-xxxx" type="tel" className="w-[800px] rounded-md p-2" id="phone"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div> : null}
            { isOpenModalAddProject ? <AddProjectModal modalIsOpen={isOpenModalAddProject} setModalIsOpen={setIsOpenModalAddProject} /> : null }
        </header>
    )
}