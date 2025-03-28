"use client";
import { useState, useEffect, useCallback } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useSession } from '@/app/Hooks/useSession';
import { IRoom, IRental } from "@/interfaces/session";
import { useSearchParams } from 'next/navigation';
import TopBar from '@/components/ui/TopBar'
import Image from 'next/image';


export default function ConfirmationPage() {
  const [room, setRoom] = useState<IRoom | undefined>(undefined);
  const [rental, setRental] = useState<IRental | undefined>(undefined);
  const { session } = useSession();
  const searchParams = useSearchParams();
  const rentalId = searchParams.get('uuid');

  const loadRental = useCallback(async () => {
    const rental = session?.data.rentals.find(r => r.uuid === rentalId);
    if (rental) {
        rental.chekin = rental.chekin ? new Date(rental.chekin) : null;
        rental.cheout = rental.cheout ? new Date(rental.cheout) : null;
    }
    
    setRental(rental);
    const room = session?.data.rooms.find(r => r.id === rental?.id);
    setRoom(room);
  }, [session, rentalId]);

  useEffect(() => {
    loadRental();
  }, [loadRental]);

  return (
    
    <main style={{
      minHeight: "100vh",
      backgroundImage: `url('/images/reservations.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      padding: "4rem 2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <TopBar pathBack="/protected"></TopBar>

      <div style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%", height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 0
      }} />

      <div style={{
        zIndex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
        width: "100%",
        maxWidth: "500px"
      }}>
     
        <div
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
          Reservation for {room?.name} confirmed!
          </h2>
          <Image
                src={room?.image || ""}
                alt="Room preview"
                width={300}
                height={180}
                style={{
                    width: "100%",
                    maxWidth: "300px",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    marginBottom: "1rem",
            }}
          />
          
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Check-in:</label><br />
          <p>{rental?.chekin?.toLocaleDateString()}</p>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Check-out:</label><br />
          <p>{rental?.cheout?.toLocaleDateString()}</p>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Guests:</label><br />
          <p>{rental?.guests.toString()}</p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <strong>Price per night:</strong> €{rental?.guests.toString()}<br />
          <strong>Total nights:</strong> {rental?.nights.toString()}<br />
          <strong>Total:</strong> €{rental?.total.toString()}
        </div>

      </div>
    </main>
  );
}
