import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { NextRequest, NextResponse } from 'next/server';
import { IRoom, IRental } from "../../../interfaces/session"

const rooms: IRoom[] = [
  { id: 0, name: "Cabin Aurora", price: 120, image: "/images/cabin-001.jpg" },
  { id: 1, name: "Cabin Sunset", price: 100, image: "/images/cabin-002.jpg" },
  { id: 2, name: "Cabin Lakeview", price: 130, image: "/images/cabin-003.jpg" },
  { id: 3, name: "Cabin Forest", price: 90, image: "/images/cabin-004.jpg" },
  { id: 4, name: "Cabin Mountain", price: 110, image: "/images/cabin-005.jpg" },
  { id: 5, name: "Cabin Cozy", price: 95, image: "/images/cabin-006.jpg" },
  { id: 6, name: "Cabin Ocean", price: 150, image: "/images/cabin-007.jpg" },
  { id: 7, name: "Cabin Breeze", price: 105, image: "/images/cabin-008.jpg" },
];

declare global {
  interface GlobalThis {
    sessionCleanerStarted?: boolean;
  }
}

type SessionData = {
  rooms: IRoom[];
  rentals: IRental[];
  lastAccess: number;
};

const memoryDB: Record<string, SessionData> = {};

export async function GET() {
  cleanSeesionData();
  const cookieStore = await cookies(); 
  
  let sessionId = cookieStore.get('sessionId')?.value;

  if (!sessionId) {
    sessionId = uuidv4();
    (await cookies()).set('sessionId', sessionId, {
      path: '/',
      maxAge: 60 * 60 * 1,
    });
  }

  if (!memoryDB[sessionId]) {
    memoryDB[sessionId] = createDefaultSessionData(
      rooms,
      []
    );
  }

  return NextResponse.json({
    sessionId,
    data: memoryDB[sessionId],
  });
}

export async function POST(req: NextRequest) {
  const { tipo, data } = await req.json();

  const cookieStore = await cookies();
  let sessionId = cookieStore.get('sessionId')?.value;
  
  if (!sessionId) {
    sessionId = uuidv4();
    (await cookies()).set('sessionId', sessionId, {
      path: '/',
      maxAge: 60 * 60 * 1,
    });
  }

  if (!memoryDB[sessionId]) {
    memoryDB[sessionId] = createDefaultSessionData(
      rooms,
      []
    );
  }

  if (tipo === 'rental') {
    memoryDB[sessionId].rentals.push(data as IRental);
  } else {
    return NextResponse.json({ error: 'Invalid tipo' }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { tipo, uuid } = await req.json();
  const cookieStore = await cookies();
  let sessionId = cookieStore.get('sessionId')?.value;

  if (!sessionId) {
    sessionId = uuidv4();
    (await cookies()).set('sessionId', sessionId, {
      path: '/',
      maxAge: 60 * 60 * 1,
    });
  }

  if (!memoryDB[sessionId]) {
    memoryDB[sessionId] = createDefaultSessionData(
      rooms,
      []
    );
  }

  if (tipo === 'rental') {
    memoryDB[sessionId].rentals = memoryDB[sessionId].rentals.filter(r => r.uuid !== uuid);
  }

  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  const { tipo, uuid, data } = await req.json();
  const cookieStore = await cookies();
  let sessionId = cookieStore.get('sessionId')?.value;

  if (!sessionId) {
    sessionId = uuidv4();
    (await cookies()).set('sessionId', sessionId, {
      path: '/',
      maxAge: 60 * 60 * 1,
    });
  }

  if (!memoryDB[sessionId]) {
    memoryDB[sessionId] = createDefaultSessionData(
      rooms,
      []
    );
  }

  if (tipo === 'rental') {
    const rentals = memoryDB[sessionId].rentals;
    const index = rentals.findIndex(r => r.uuid === uuid);
    if (index !== -1) {
      rentals[index] = { ...rentals[index], ...data }; 
    }
  }

  return NextResponse.json({ success: true });
}

function createDefaultSessionData(
  rooms: IRoom[] = [],
  rentals: IRental[] = []
): SessionData {
  return {
    rooms,
    rentals,
    lastAccess: Date.now()
  };
}

const SESSION_TIMEOUT = 60 * 60 * 1000; 

function cleanSeesionData()
{
  if ((globalThis as Record<string, unknown>).sessionCleanerStarted) return;
  (globalThis as Record<string, unknown>).sessionCleanerStarted = true;
 
  setInterval(() => {
    const now = Date.now();
    for (const [sessionId, session] of Object.entries(memoryDB)) {
      if (now - session.lastAccess > SESSION_TIMEOUT) {
        delete memoryDB[sessionId];
        console.log(`⏳ Session expired: ${sessionId}`);
      }
    }
  }, 5 * 60 * 1000); 
}
