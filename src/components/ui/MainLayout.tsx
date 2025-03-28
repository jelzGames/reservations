"use client";
/*
import { useSession } from "next-auth/react";
import TopBar from "@/components/ui/TopBar";
import RightSidebar from "@/components/ui/RightSidebar";
*/

export default function MainLayout({ children }: { children: React.ReactNode }) {
  
  //const { status } = useSession();
/*
  if (status === "loading") {
      return <p>Cargando sesión...</p>; 
  }
*/
  return (
    <>
      <div className="flex flex-1">
        <main className="flex-1 p-6">{children}</main>
      </div>
    </>  
  );
}
