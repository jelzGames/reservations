
"use client";

import { useState } from "react";

import Carousel from "@/components/ui/Carousel";
import ImageZoomPan from "@/components/ui/DropDownImages ";

export default function HomePage() {
  const [rederCarrusel, setRederCarrusel] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/it.png')" }}>
        <ImageZoomPan onChange={setRederCarrusel}/>
        <Carousel render={rederCarrusel}/>
    </div>
  )
}
