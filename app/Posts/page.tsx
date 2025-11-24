import {prisma} from "@/lib/db";
import Link from "next/link";
import { createPost } from "@/actions/action";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { deletePost } from "@/actions/action";

  
export default async function  Page() {
   // auth check
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    return redirect("/api/auth/login");
  }

  // Fetch posts from the database
  const posts = await prisma.post.findMany();
   
    return (
        <div className="text-center pt-13">

      <h1 className="text-4xl capitalise font-mono font-extrabold mb-5">
        Posts
      </h1>
      <p className="text-[19px] "></p>
      <ul>
        {posts.map((post) =>(
          <li key={post.id} className="text-l font-bold text-base leading-relaxed text-gray-800 my-2 px-1 mb-4">
            <Link href={`/Posts/${post.id}`}>{post.title}</Link>

    <form action={deletePost.bind(null, post.id)} className="inline ml-3">
      <button
        type="submit"
        className="bg-yellow-300 text-white font-mono px-3 py-1 rounded"
      >
        Delete
      </button>
    </form>
    </li>
        ))}
      </ul>

  
      <form action={createPost} className="max-w-[400px] mx-auto mt-26">
        <input
    type="text"
    placeholder="Title"
    name="title"
    className="border p-2 mb-2 w-full"
  />
  <textarea
    placeholder="Content"
    name="content"
    className=" border p-4 mb-2 w-full"
  ></textarea>
  <button
    type="submit"
    className="bg-blue-400 text-white px-5 py-2 rounded-md "
  >
    Create Task
  </button>
  

</form>

    </div>
    );

}