"use client"
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
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
  <div>hello
    <UserButton afterSignOutUrl="/"/>
     <Button>hello</Button></div>
  );
}
