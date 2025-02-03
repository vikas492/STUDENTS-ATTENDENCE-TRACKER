"use client"                  
import { Button } from "@/components/ui/button";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    useEffect(()=>{
      redirect('/api/auth/login?post_login_redirect_url=/Dashboard')
    },[])
 
  );
}
