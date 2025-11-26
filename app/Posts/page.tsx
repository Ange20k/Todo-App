import { prisma } from "@/lib/db";
import Link from "next/link";
import { createPost, deletePost, togglePost } from "@/actions/action";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  // Auth check
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    return redirect("/api/auth/login");
  }

  // Get filter
  const params = await searchParams;
  const filter = params.filter || "all";

  // Fetch posts with filter
  const posts = await prisma.post.findMany({
    where:
      filter === "active"
        ? { completed: false }
        : filter === "completed"
        ? { completed: true }
        : {}, // "all" = no filter
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Titre */}
        <h1 className="text-4xl font-mono font-extrabold text-center mb-2">
          Posts
        </h1>
        <p className="text-center text-gray-500 mb-8">Manage your tasks</p>

        <div className="flex justify-center gap-2 mb-6">
  <Link
    href="/Posts"
    className={`px-4 py-2 rounded ${
      filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
    }`}
  >
    Toutes
  </Link>

  <Link
    href="/Posts?filter=active"
    className={`px-4 py-2 rounded ${
      filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
    }`}
  >
    Actives
  </Link>

  <Link
    href="/Posts?filter=completed"
    className={`px-4 py-2 rounded ${
      filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
    }`}
  >
    Terminées
  </Link>
</div>


        <div className="text-center mb-6">
          <p className="text-gray-600">
            {posts.filter((p) => !p.completed).length} tâche(s) restante(s) sur{" "}
            {posts.length}
          </p>
        </div>

        {/* Liste des posts */}
        <ul className="max-w-2xl mx-auto space-y-3 mb-12">
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border"
            >
              {/* Checkbox */}
              <form action={togglePost.bind(null, post.id)}>
                <button
                  type="submit"
                  className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all ${
                    post.completed
                      ? "bg-green-500 border-green-500"
                      : "border-gray-400 hover:border-green-400"
                  }`}
                >
                  {post.completed && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              </form>

              {/* Titre + Date + Catégorie */}
              <div className="flex-1">
                <Link
                  href={`/Posts/${post.id}`}
                  className={`text-lg block ${
                    post.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800 font-medium"
                  }`}
                >
                  {post.title}
                </Link>

                <div className="flex gap-2 items-center mt-1">
                  {/* Date */}
                  {post.dueDate && (
                    <span className="text-sm text-gray-500">
                       {new Date(post.dueDate).toLocaleDateString("fr-FR")}
                    </span>
                  )}

                  {/* Badge catégorie */}
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      post.category === "Urgent"
                        ? "bg-red-100 text-red-700"
                        : post.category === "Travail"
                        ? "bg-blue-100 text-blue-700"
                        : post.category === "Shopping"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {post.category === "Urgent" && "🔥"}
                    {post.category === "Travail" && "💼"}
                    {post.category === "Shopping" && "🛒"}
                    {post.category === "Personnel" && "👤"}
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Bouton Delete */}
              <form action={deletePost.bind(null, post.id)}>
                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold px-4 py-2 rounded transition-colors"
                >
                  Delete
                </button>
              </form>
            </li>
          ))}
        </ul>

        {/* Formulaire de création */}
        <form
          action={createPost}
          className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
        >
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="w-full border border-gray-300 p-3 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="date"
            name="dueDate"
            className="w-full border border-gray-300 p-3 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            name="category"
            className="w-full border border-gray-300 p-3 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Personnel">👤 Personnel</option>
            <option value="Travail">💼 Travail</option>
            <option value="Urgent">🔥 Urgent</option>
            <option value="Shopping">🛒 Shopping</option>
          </select>

          <textarea
            placeholder="Content"
            name="content"
            rows={3}
            className="w-full border border-gray-300 p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded transition-colors"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
    
  );
}