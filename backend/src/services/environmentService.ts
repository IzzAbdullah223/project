import { prisma } from "../db/prisma.js";

export async function createEnvironment(projectId:string,name:string,key:string,userId:string){
    const membership = await prisma.membership.findUnique({
        where:{userId_projectId:{userId,projectId} },
    })

    if(!membership){
        throw new Error('FORBIDDEN')
    }

    const environment = await prisma.environment.create({
        data:{
            name,
            key,
            projectId
        }
    })

    return environment
}