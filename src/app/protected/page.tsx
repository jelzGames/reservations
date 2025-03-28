"use client"; 

import { useSession } from '@/app/Hooks/useSession';
import TopBar from '@/components/ui/TopBar';
import Image from 'next/image';

export default function RentalsPage() {
  const { session } = useSession();

  return (
    <main style={{
      minHeight: "100vh",
      backgroundImage: `url('/images/reservations.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      color: "white",
      padding: "4rem 2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <TopBar pathBack='/'/>
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 0,
      }} />

      <div style={{
        width: "1000px",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1.5rem",
        justifyContent: "center",
        zIndex: 1,
      }}>
        {session?.data.rooms.map((room)  => (
          <div key={room.id.toString()} style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            color: "#333",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
            <Image
              src={room.image}
              alt={room.name}
              width={300}
              height={180}
              style={{ width: "100%", objectFit: "cover", borderRadius: 0 }}
            />
            <div style={{ padding: "0.75rem" }}>
              <h3 style={{ margin: "0 0 0.5rem" }}>{room.name}</h3>
              <p style={{ margin: "0 0 1rem", color: "#555" }}>€{room.price.toString()}/night</p>
              <a
                href={`/protected/reservations/reserve?id=${room.id}`}
                style={{
                  display: "inline-block",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#b85c38",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "5px",
                  fontWeight: "bold"
                }}
              >
                Reserve
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}


/*
"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ProtectedHomePage() {
  
  const { data: session } = useSession();
  if (!session) {
    redirect("/login");
  }
  
  return (
    
  )
}*/