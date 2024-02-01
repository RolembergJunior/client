import { DiVim } from "react-icons/di";


export default function Spinner(){
    return(
        <div className="relative d-flex justify-content-center bg-black bg-opacity-25 h-screen w-[100%] ">
            <div className="absolute spinner-border top-[40%] w-10 h-10" role="status">
                <span className="sr-only" ></span>
            </div>
        </div>
    )
}