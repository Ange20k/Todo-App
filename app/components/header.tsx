import{LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components"; 
import Link from"next/link";
import Image from "next/image";

export default function Header() {
    return( 
       < div className="border-black/10 border-b h-[40px] flex
       items-center justify-between px-5">
        <Link href="/">
            <Image
            src="/icons8-todo-list-64.png"
            alt="Logo Todo App"
            width={80}
            height={80}
            className="rounded-full cursor-pointer"
            priority
            />
        </Link >

        <LogoutLink className="bg-red-500 text-white px-3 py-2 rounded-full">Logout </LogoutLink>

        <ul className="flex items-center gap-4">
            <li>
                <Link href="/  ">Home </Link>
            </li>
            <li>
                <Link href="/Posts">Posts</Link>
            </li>
        </ul>
       </div>
    );

} 
