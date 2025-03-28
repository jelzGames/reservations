//"use client";
//import { SessionProvider } from "next-auth/react";
import MainLayout from "@/components/ui/MainLayout";
import "../globals.css";
import { Suspense } from "react";


export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col h-screen bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/reservations.jpg')" }}>
            {/*<SessionProvider>
              <MainLayout>{children}</MainLayout>
            </SessionProvider>*/}
          <MainLayout>{children}</MainLayout>
        </div>
      </Suspense>
  );
}


