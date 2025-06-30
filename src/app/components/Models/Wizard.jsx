// File: src/app/components/Models/Wizard.jsx
"use client"
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Wizard(props) {
    const { nodes, materials } = useGLTF('/models/An_anime_style_young__0630024801_texture-transformed.glb');

        const modelRef = useRef();

  useFrame((state) => {
    modelRef.current.position.y =
      -1 + Math.sin(state.clock.elapsedTime) * 0.15;
  });
    return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        ref={modelRef}
        scale={1.25}
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material}
        // rotation={[-Math.PI / 2, 0, 0]}
        
      />
    </group>
  )
}

useGLTF.preload('/An_anime_style_young__0630024801_texture-transformed.glb')