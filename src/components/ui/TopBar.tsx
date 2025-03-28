"use client";
//import { useSession, signIn, signOut } from "next-auth/react";
import { FaArrowLeft, FaClipboardList } from 'react-icons/fa'; 

export default function TopBar({ pathBack }: { pathBack: string })  {
  //const { data: session, status } = useSession();

  return (
    <div style={{
      width: "100%",
      maxWidth: "1000px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 0",
      zIndex: 1,
    }}>
    
      <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "white" }}>
          Enchanted Cabins
      </div>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <a href={pathBack} style={{ display: "flex", alignItems: "center", color: "white", textDecoration: "none", fontWeight: "500" }}>
          <FaArrowLeft style={{ marginRight: "0.5rem" }} />
          Back
        </a>
        <a href="/protected/reservations/myreservations" style={{ display: "flex", alignItems: "center", color: "white", textDecoration: "none", fontWeight: "500" }}>
          <FaClipboardList style={{ marginRight: "0.5rem" }} />
          My Reservations
        </a>
      </div>
    </div>
  );
  /*
  return (
    
    session ?
    (
        <header className="w-full h-16 bg-gray-800 text-white flex items-center px-6">
        <div className="flex-1">
            <h1 className="text-lg font-bold">Mi Aplicación</h1>
        </div>
        {session ? (
            <button onClick={() => signOut()} className="bg-red-500 px-4 py-2 rounded">
            Cerrar sesión
            </button>
        ) : (
            <button onClick={() => signIn("google")} className="bg-blue-500 px-4 py-2 rounded">
            Iniciar sesión
            </button>
        )}
        </header>
    )
    : null
  );*/
}
