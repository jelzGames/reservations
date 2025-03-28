"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn  } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/protected";

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType) {
      router.push("/protected/dashboard");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: true, 
      username,
      password,
      callbackUrl: callbackUrl
    });

    if (result?.error) {
      alert("Invalid username or password");
    } else {
      //router.push("/");
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem("userType", "guest");
    router.push("/protected/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>

      <div className="flex flex-col space-y-4 w-80">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
        />
        <button onClick={handleLogin} className="p-2 bg-blue-500 text-white rounded">
          Login
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button onClick={handleGuestLogin} className="p-2 bg-gray-500 text-white rounded">
          Guest
        </button>

        <button onClick={() => signIn("google")} className="p-2 bg-red-500 text-white rounded">
          <span>🔵 </span>Google
        </button>
      </div>
    </div>
  );
}
