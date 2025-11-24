
import UpvoteBtn from "@/app/components/upvote-btn";
import {prisma}from "@/lib/db"
import { notFound } from "next/navigation"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
 

export default async function Page({params,
}: {
     params: Promise<{ id: string }>;})  {
         // auth check
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    return redirect("/api/auth/login");
  }

  // Fetch posts from the database
    const id= (await params).id; 
    const post =await prisma.post.findUnique({
        where:{
            id:Number(id),
        },
    });
    if (!post) {
        return notFound() ;
    //<div>Article non trouvé</div>;
  }
      
    return (
        <div className="text-center pt-12">
            <h1 className="text-3xl capitalize font-bold"> {post.title}</h1>

            <p className=" text-xl fontwhitespace-pre-wrap mt-15">{post.content}</p>
            <UpvoteBtn/>

        </div> 
    );
}
