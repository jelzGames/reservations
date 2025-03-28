'use client';

import { useEffect, useState } from 'react';
import { ISessionData } from "../../interfaces/session"
import { IRental } from "@/interfaces/session"

export function useSession() {
  const [session, setSession] = useState<ISessionData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadSession = async () => {
    const res = await fetch('/api/session');
    const data = await res.json();
    setSession(data);
    setLoading(false);
  };

  useEffect(() => {
    loadSession();
  }, []);

  const addRental = async (rental: IRental) => {
    await fetch('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo: 'rental', data: rental }),
    });
    await loadSession(); 
  };

  const updateRental = async (uuid: string, updatedData: Partial<IRental>) => {
    const res = await fetch('/api/session', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tipo: 'rental',
        uuid,
        data: updatedData,
      }),
    });
  
    const result = await res.json();
    if (result.success) {
      console.log('Rental updated!');
    } else {
      console.error('Failed to update rental');
    }
  };

  return {
    session,
    loading,
    reload: loadSession,
    addRental, 
    updateRental
  };

}


  

