import Image from "next/image";
import cosmic from "../../public/background/CosmicJellyfish.png";
// import RenderModel from "./components/Models/Wizard";
import dynamic from 'next/dynamic';
import Navigation from "./components/navigation";

// Dynamically import the RenderModel component to avoid SSR issues
const RenderModel = dynamic(() => import('./components/RenderModel'), {
  ssr: false,
});
// This is the main page of the Next.js application.
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <Image src= {cosmic} alt="Cosmic"
      sizes="100vw"
      priority
      fill
      className="-z-50 w-full object-cover object-center opacity-65"/>

    <Navigation /> 
    
    <div className="w-full h-screen">
      {<RenderModel />}
      
      <footer className="absolute bottom-0 left-0 right-0 p-4 text-center">
        <p className="text-sm">© 2023 My Portfolio. All rights reserved.</p>
      </footer>
    </div>
    </main>
  );
}
