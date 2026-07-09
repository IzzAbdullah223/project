import { prisma } from "../db/prisma.js";

export async function createProject(name:string,userId:string){

    const baseSlug = slugify(name)
    let slug = baseSlug
    let attempt = 0;
    while(await prisma.project.findUnique({where:{slug}})){
        attempt++;
        slug = `${baseSlug}-${attempt}`
    }


    const project = await prisma.project.create({
        data:{
            name,
            slug,
            memberships:{
                create:{
                    
                    userId,
                    role:"OWNER"
                }
            }
        }
    })

    return project
}

function slugify(name:string):string{
    return name.toLocaleLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
}