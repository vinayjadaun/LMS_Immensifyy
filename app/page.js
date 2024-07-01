"use client"
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { Loader, LoaderCircleIcon, LoaderIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function Home() {
  const router=useRouter();

  const {user,isSignedIn,isLoaded}=useUser();

  useEffect(()=>{
    
      if(user){
        router.push('/dashboard');
        
      }else{
        isLoaded&&router.push('/cources')
      }
  },[user])

 
  return (
  <div className="h-[700px] max-w-dvh flex items-center justify-center">
    <LoaderCircleIcon className="h-[50px] w-[50px] animate-spin"/>
    </div>
  );
}
