import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PROJECT } from "@/mutations/projectMutations";
import { BsCardText } from "react-icons/bs";
import { RiMacbookLine } from "react-icons/ri";
import { TbProgress } from "react-icons/tb";
import { GET_PROJECT } from "@/queries/projectsQuery";
import { toast } from "sonner";


interface EditModalProps{
    params: string | string[];
    modalIsOpen: Boolean,
    setModalIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function EditModal({ params, modalIsOpen, setModalIsOpen }:EditModalProps){
    const [dataUpdatingInput, setDataUpdatingInput ] = useState({ name:'', description: '', status:''});
    const { name, description, status } = dataUpdatingInput
    const [updatingProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: params , name, description, status },
        refetchQueries: [{ query: GET_PROJECT, variables: { id: params } }],
    });

    function onHandleSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log( {id: params, name, description, status},  'data');
        updatingProject({ variables:{ id: params, name, description, status }});
        setDataUpdatingInput({ name:'', description: '', status:'' });
        toast.success('Editado com sucesso', { position: 'top-center', invert:true});
    }

    return(
        <div >
            { modalIsOpen ? 
                <div>
                    <form className="mx-auto p-4" onSubmit={(e) => onHandleSubmit(e)}>
                    <h1 className="text-start font-semibold text-3xl my-5">Editar Projeto</h1>
                        <div className="flex flex-col mb-3">
                            <RiMacbookLine />
                            <label>Nome do Projeto</label>
                            <input className="border p-2 rounded-md" onChange={(e) => setDataUpdatingInput({...dataUpdatingInput ,name: e.target.value })} type="text" placeholder="Projeto 2024" value={name} id="nameInput" required/>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col mb-3 w-[50%]">
                                <BsCardText />
                                <label>Descrição</label>
                                <input className="border p-2 rounded-md" onChange={(e) => setDataUpdatingInput({...dataUpdatingInput ,description: e.target.value })} type="text" placeholder="Projeto criado para ...." value={description} id="descriptionInput" required />
                            </div>
                            <div className="flex flex-col mb-3 w-[50%]">
                                <TbProgress />
                                <label>Status</label>
                                <select onChange={(e) => setDataUpdatingInput({ ...dataUpdatingInput, status: e.target.value })} className="border p-2 rounded-md" name="status" id="statusSelect" required>
                                    <option value="">Selecione</option>
                                    <option value="new">Não iniciado</option>
                                    <option value="progress">Em progresso</option>
                                    <option value="completed">Completado</option>
                                </select>
                            </div>
                        </div>
                    <div className="flex justify-end gap-4">
                        <button onClick={() => setModalIsOpen(false)} className="btn btn-secondary">Cancelar</button>
                        <button type="submit" className="btn btn-primary">Adicionar</button>
                    </div>
                </form>    
            </div>
            : null }
        </div>
    )
}