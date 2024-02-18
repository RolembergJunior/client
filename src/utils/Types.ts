
export interface ClientProps{
    clients:{ name: string, email:string, phone: string, id:string }[] 
}

export interface ProjectsProps{
    projects: { id: string, name:string, description: string, status: string, clientId: string, client: { id: string, name: string, email: string, phone: string } }[]
}