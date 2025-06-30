"use client";
import cosmic from "../../../public/background/CosmicJellyfish.png";
import Navigation from "../components/navigation";
import { projectsData } from "../data";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <Image
        src={cosmic}
        alt="Cosmic"
        sizes="100vw"
        priority
        fill
        className="-z-50 w-full object-cover object-center opacity-65"
      />

      <Navigation />

      <div className="w-full min-h-screen flex flex-col items-center py-20 px-4">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: project.id * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="h-48 relative bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                <div className="text-5xl text-white/30 font-bold">
                  {project.name.charAt(0)}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white mb-2">
                  {project.name}
                </h2>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-400">
                    {new Date(project.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-white text-sm font-medium transition-colors"
                  >
                    View Project
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <footer className="w-full p-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} My Portfolio. All rights reserved.
        </p>
      </footer>
    </main>
  );
}