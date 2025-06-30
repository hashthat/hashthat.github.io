"use client";

import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Wizard from "./Models/Wizard";
import { Environment } from "@react-three/drei";

// This component renders a 3D model of a wizard using React Three Fiber and Drei.
const RenderModel = ({ className }) => {
  return (
    <Canvas className={className}>
      <Suspense fallback={null}>
        <Wizard position={[0, 1.5, 0]} scale={1.5} />
      </Suspense>
      <Environment preset="forest" />

      <directionalLight position={[10, 10, 5]} intensity={1} />
    </Canvas>
  );
};

export default RenderModel;

// Note: Ensure that the model file path in the Wizard component is correct and accessible.