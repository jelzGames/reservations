"use client";
import { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSession } from '@/app/Hooks/useSession';
import { IRoom, IRental } from "@/interfaces/session";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/ui/TopBar'
import Image from 'next/image';


export default function ReservePage() {
  const [room, setRoom] = useState<IRoom | undefined>(undefined);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState<number | undefined>(1);
  const [total, setTotal] = useState<number | undefined>(0);
  const [nights, setNights] = useState<number | undefined>(0);
  const {session, updateRental } = useSession();
  const [disabled, setDisabled] = useState<boolean | undefined>(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const rentalId = searchParams.get('uuid');
  const [errors, setErrors] = useState<{ [key: string]: boolean | null}>({});

  const loadRental = useCallback(async () => {
    const rental = session?.data.rentals.find(r => r.uuid === rentalId);
    if (rental) {
        setCheckIn(rental.chekin ? new Date(rental.chekin) : null);
        setCheckOut(rental.cheout ? new Date(rental.cheout) : null);
    }

    setGuests(rental?.guests);
    setTotal(rental?.total);
    setNights(rental?.nights);

    const room = session?.data.rooms.find(r => r.id === rental?.id);
    setRoom(room);
  }, [session, rentalId]);

  useEffect(() => {
    loadRental();
  }, [loadRental]);

  const validate = useCallback(() => {
    const newErrors = {
      checkIn: !checkIn,
      checkOut: !checkOut || (checkIn && checkOut <= checkIn),
    };
    setErrors(newErrors);
  
    return !Object.values(newErrors).includes(true);
  }, [checkIn, checkOut]);
 
  const EnableReservationButton = useCallback(() => {
    if (!checkIn || isNaN(checkIn.getTime()) ||
        !checkOut || isNaN(checkOut.getTime())) {
          setDisabled(true)
    }
    else {
      setDisabled(false)
    }
  }, [checkIn, checkOut]);

  useEffect(() => {
    validate();
    EnableReservationButton();
  }, [validate, EnableReservationButton]);

 
  useEffect(() => {
    if (checkIn && checkOut) {
      const diff = checkOut.getTime() - checkIn.getTime();
      const nightsCount = Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
      setNights(nightsCount);
      if (room && typeof room.price === 'number') {
        setTotal(nightsCount * room.price);
      } else {
        setTotal(0); 
      }
    } else {
      setNights(0);
      setTotal(0);
    }
  }, [checkIn, checkOut, room]);

  const handleReserve = () => {
    const rental: IRental = {
      uuid: String(rentalId),
      id: Number(room?.id),
      chekin: checkIn,
      cheout: checkOut,
      guests: Number(guests),
      price: Number(room?.price),
      nights:  Number(nights),
      total:  Number(total)
      
    };
  
    updateRental(String(rentalId), rental);
    router.push(`/protected/reservations/myreservations`);

  };

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
       <TopBar pathBack="/protected/reservations/myreservations"></TopBar>
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
            {room?.name}
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
          <DatePicker
            selected={checkIn}
            onChange={(date: Date | null) => setCheckIn(date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={new Date()}
            placeholderText="Select check-in date"
            dateFormat="dd/MM/yyyy"
            className={errors.checkIn ? 'input-error' : ''}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Check-out:</label><br />
          <DatePicker
            selected={checkOut}
            onChange={(date: Date | null) => setCheckOut(date)}
            selectsEnd
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn || new Date()}
            placeholderText="Select check-out date"
            dateFormat="dd/MM/yyyy"
            className={errors.checkOut ? 'input-error' : ''}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Guests:</label><br />
          <input
            type="number"
            min={1}
            max={10}
            value={Number(guests)}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <strong>Price per night:</strong> €{room?.price.toString()}<br />
          <strong>Total nights:</strong> {Number(nights)}<br />
          <strong>Total:</strong> €{Number(total)}
        </div>

        <button onClick={handleReserve} 
          disabled={disabled}
          style={{
          width: "100%",
          padding: "0.75rem",
          backgroundColor: disabled ? "gray" : "#28a745", 
          color: "white",
          fontWeight: "bold",
          fontSize: "1rem",
          border: "none",
          borderRadius: "5px",
          cursor: disabled ? "not-allowed" : "pointer",  
          opacity: disabled ? 0.6 : 1, 
        }}>
          Confirm changes
        </button>
      </div>
    </main>
  );
}
