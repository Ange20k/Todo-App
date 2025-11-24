
import Image from "next/image";
  
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return ( 
  
    <div className="text-center pt-14">

      <h1 className="text-4xl capitalise  font-mono font-extrabold mb-5">
        Welcome to my App !
       </h1>
      <p className="text-[18px]">This is a Next.js App.</p>

      <div className="mt-30">
        <LoginLink className = "bg-gray-400 text-white px-8 py-2 rounded-md">
          Login
        </LoginLink>
        <RegisterLink className = "bg-cyan-500 text-white px-10 py-2 rounded-md">
          Register
          </RegisterLink>
      </div>
      
    </div>
  );
  
}
  