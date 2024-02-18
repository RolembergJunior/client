import { useState } from "react";
import AddClientsModal from "../AddClientsModal/AddClientsModal";
import AddProjectModal from "../AddProjectModal/AddProjectModal";
import { GoPlus } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { useParams, usePathname } from "next/navigation";
import EditModal from "../EditModal/EditModal";
import { MdModeEdit } from "react-icons/md";


export default function Header(){
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalAddProject, setIsOpenModalAddProject] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const path = usePathname();
    const params = useParams();

    return(
        <header className="relatie flex justify-between items-center">
            <div>
                <a href="/" className='flex items-center gap-2 p-4'>
                    <img src='./Logo.png' alt="Logo" width={50}/>
                    <div>Projeto Manager</div>
                </a>
            </div>
            { path === '/' ? 
                <div className="flex gap-2">
                    <div className="flex items-center btn btn-primary cursor-pointer" onClick={() => setIsOpenModal(true)}>
                    <FaUser className="icon"/>
                    <p>Add clientes</p>
                    </div>
                    <div className="flex items-center btn btn-primary cursor-pointer mr-4" onClick={() => setIsOpenModalAddProject(true)}>
                    <GoPlus className="icon" />
                    <p>Add Projects</p>
                    </div>
                </div> : null }
            { path === `/${params.slug}` ? 
            <div onClick={() => setIsOpenEditModal(true)} className="btn btn-primary  mr-4">
                <MdModeEdit className="icon"/>
            </div> : null }
            { isOpenModal ? 
                    <div className="absolute top-32 left-[25%] flex flex-col justify-center bg-white shadow-xl bg-opacity-70 w-[50%] h-[450px] rounded-lg z-10" >
                        <AddClientsModal isModalOpen={isOpenModal} setIsModalOpen={setIsOpenModal} />
                    </div> : null}
            { isOpenModalAddProject ? 
                    <div className="absolute top-32 left-[25%] flex flex-col justify-center bg-white shadow-xl bg-opacity-70 w-[50%] h-[400px] rounded-lg z-10">
                        <AddProjectModal modalIsOpen={isOpenModalAddProject} setModalIsOpen={setIsOpenModalAddProject} /> 
                    </div>
                : null  }
            { isOpenEditModal ? 
                <div className="absolute top-32 left-[25%] flex flex-col justify-center bg-white shadow-xl bg-opacity-70 w-[50%] h-[450px] rounded-lg z-10">
                    <EditModal params={params.slug} modalIsOpen={isOpenEditModal} setModalIsOpen={setIsOpenEditModal}/>
                </div> : null}
        </header>
    )
}