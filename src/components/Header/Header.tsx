import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { FaPhone, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GET_CLIENTS } from "@/queries/clientsQuery";
import { ADD_CLIENT } from '@/mutations/addClient'


export default function Header(){
    const [isOpenModal, setIsOpenModal] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [addClient] = useMutation(ADD_CLIENT,{
        variables: { name, email, phone },
        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery({query: GET_CLIENTS });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] }
            });
        } 
    });

    useEffect(() =>{
    })

    function onHandleSubmit(e){
        e.preventDefault();
        console.log(name, email,phone)
        if(name === '' || email === '' || phone === ''){
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
            <div className="flex items-center cursor-pointer" onClick={() => setIsOpenModal(true)}>
                <FaUser className="icon" />
                <p>Add clientes</p>
            </div>
            { isOpenModal ? 
                    <div className="absolute top-24 left-[25%] flex flex-col justify-center bg-slate-400 bg-opacity-70 w-[50%] h-[500px] rounded-lg z-10" >
                        <h1 className="text-center text-2xl mt-14">PREENCHA OS DADOS DO CLIENTE</h1>
                        <form className="m-auto" onSubmit={(e) => onHandleSubmit(e)}>
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
        </header>
    )
}