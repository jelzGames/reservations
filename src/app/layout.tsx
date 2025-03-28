import { Suspense } from "react";
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
     <Suspense fallback={<div>Loading...</div>}>
         
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
    </Suspense>
  );
}
