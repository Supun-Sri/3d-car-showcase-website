import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, SSAO } from '@react-three/postprocessing';
import Model from './RealisticModel'; // We'll create this component next
import * as THREE from 'three';
import { BlendFunction } from 'postprocessing';
// The main App component containing the R3F canvas
function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        shadows
        camera={{ position: [0, 1.5, 4], fov: 50 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <color attach="background" args={['#111']} />
        
        {/* OrbitControls for camera interaction */}
        <OrbitControls enableDamping dampingFactor={0.15} />

        {/* Lighting from an HDRI environment map */}
        <Environment preset="forest" background />

        {/* The 3D model component wrapped in Suspense for loading */}
        <Suspense fallback={null}>
          <Model />
        </Suspense>

        {/* Post-processing effects for realism */}
        <EffectComposer enableNormalPass multisampling={8}>
          <SSAO
            radius={0.05}
            intensity={10}
            blendFunction={BlendFunction.MULTIPLY}
          />
          <Bloom
            luminanceThreshold={0.5}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>

      </Canvas>
    </div>
  );
}

export default App;