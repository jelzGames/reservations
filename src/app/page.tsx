
"use client";

import { useState } from "react";

//import Carousel from "@/components/ui/Carousel";
//import ImageZoomPan from "@/components/ui/DropDownImages ";
import DropDownImagesSSR from "@/components/ui/DropDownImagesSSR";

export default function HomePage() {
  const [rederCarrusel, setRederCarrusel] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/it.png')" }}>
        {/*<ImageZoomPan onChange={setRederCarrusel}/>
            <Carousel render={rederCarrusel}/>*/}
        <DropDownImagesSSR onChange={setRederCarrusel}/>
    </div>
  )
}
