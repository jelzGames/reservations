'use client';

import { useSession } from '@/app/Hooks/useSession';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useState } from "react";
import TopBar from '@/components/ui/TopBar';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function RentalList() {
  const { session, reload } = useSession();
  const [rentalToDelete, setRentalToDelete] = useState<string | null>(null);
  const router = useRouter();
  const rentals = session?.data.rentals ?? [];

  const formatDate = (date: Date | string | null) => {
    if (!date) return '-';
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-GB');
  };

  const getRoomById = (roomId: number) =>
    session?.data.rooms.find((room) => room.id === roomId);

  const handleDelete = async (uuid: string) => {
      await fetch('/api/session', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo: 'rental', uuid }),
      });
      setRentalToDelete(null);
      reload();
  };

  const edit = (uuid: string) => {
    router.push(`/protected/reservations/edit?uuid=${uuid}`);
  };

  return (
    <>

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
          <TopBar pathBack='/protected'/>
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
        minWidth: '800px' ,
        zIndex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
        width: "72%",
      }}>
      <h2
            style={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              textAlign: "center",
              paddingBottom: "2rem"
            }}
          >
            My Reservations
          </h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px'}}>
        <thead>
          <tr style={{ background: '#f0f0f0', textAlign: 'left' }}>
            <th>Reservation</th>
            <th>Image</th>
            <th>Name</th>
            <th>Guests</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Nights</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {rentals.map((rental) => {
                const room = getRoomById(rental.id);
                return (
                    <tr key={rental.uuid} style={{ borderBottom: '1px solid #ddd' }}>
                    <td>{rental?.uuid}</td>
                    <td>
                      <Image
                        src={room?.image || ""}
                        alt={room?.name || ""}
                        width={60}
                        height={40}
                        style={{ objectFit: 'cover', borderRadius: '4px' }}
                        />
                    </td>
                    <td>{room?.name}</td>
                    <td>{rental.guests.toString()}</td>
                    <td>{formatDate(rental.chekin)}</td>
                    <td>{formatDate(rental.cheout)}</td>
                    <td>{rental.nights.toString()}</td>
                    <td>
                        <button
                        style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '0.5rem' }}
                        title="Edit"
                        onClick={() => edit(rental.uuid)}
                        >
                        <FaEdit color="#007bff" />
                        </button>
                        <button
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        title="Delete"
                        onClick={() => setRentalToDelete(rental.uuid)}
                        >
                        <FaTrashAlt color="#dc3545" />
                        </button>
                    </td>
                    </tr>
                )
            })}

        </tbody>
      </table>
    </div>
      {rentalToDelete && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              width: '90%',
              maxWidth: '400px',
              textAlign: 'center',
              animation: 'fadeIn 0.2s ease-in-out',
            }}
          >
            <h2 style={{ marginBottom: '1rem', color: '#dc3545' }}>🗑️ Reservation {rentalToDelete}</h2>
            <p style={{ marginBottom: '2rem', color: '#333', fontSize: '1.1rem' }}>
              Are you sure you want to delete this rental?
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <button
                onClick={() => handleDelete(rentalToDelete)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setRentalToDelete(null)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: '#f0f0f0',
                  color: '#333',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
    
    </>
  );
}
