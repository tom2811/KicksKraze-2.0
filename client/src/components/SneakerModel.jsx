import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from '@react-three/drei';

export function SneakerModel() {
  const sneaker = useGLTF('./sneakers/scene.gltf');
  return (
    <Canvas
    style={{ height: "100vh", width: "100vw"}}
      frameloop="demand"
      camera={{ position: [0, 7, 20], rotation: [-Math.PI / 2, 0, 0], fov: 45 }}
    >
      <OrbitControls autoRotate enableZoom={false} maxPolarAngle={Math.PI / 2}  enablePan={false} />
      <primitive object={sneaker.scene} scale={70.5} />
      <ambientLight intensity={8.5} />
    </Canvas>
  );
}
