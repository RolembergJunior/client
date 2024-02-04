'use client'

import { useParams } from "next/navigation"
import Layout from "@/components/Layout/Layout";
import ProjectData from "@/components/ProjectData/ProjectData";
import Link from "next/link";
import Header from "@/components/Header/Header";


export default function ProjectsPage(){
    const params = useParams();
    return(
        <Layout>
            <Header/>
            <div className="mx-auto w-75 card p-5">
                <Link href='/' className="btn btn-light btn-sm w-25 d-inline ms-auto">
                    Back   
                </Link>
                <div>
                    <ProjectData params={params.slug} />
                </div>
            </div>
        </Layout>
    )
}