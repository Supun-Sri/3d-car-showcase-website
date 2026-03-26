import React, { useLayoutEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { applyProps } from '@react-three/fiber'; // <-- CORRECT IMPORT

export default function RealisticModel(props) {
  // Destructure 'nodes' and 'materials' from the loaded GLTF data
  const { scene, materials } = useGLTF('/model.glb');

  // useLayoutEffect ensures the properties are set before the first render
  useLayoutEffect(() => {
    // 💡 The function is used to set multiple properties on a raw Three.js object
       console.log(materials); // Log materials to inspect available materials
    if (materials.Stage_Props) {
      applyProps(materials.Stage_Props, {
        emissiveIntensity: 30,  
        toneMapped: false,
        // Example of adding other properties:  
        roughness: 0.1,
        metalness: 0.9,
      });
    }

    // You can also use it to apply props to a mesh object itself:
    if (scene.getObjectByName('mesh_name')) {
      applyProps(scene.getObjectByName('mesh_name'), {
        position: [1, 2, 3],
        visible: true,
      });
    }

    // Ensure the scene structure is visible (optional, but good practice)
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = child.receiveShadow = true;
      }
    });

  }, [materials, scene]);

  return <primitive object={scene} {...props} />;
}