import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function SneakerModel({ modelUrl }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentRef = mountRef.current;
    const { clientWidth: width, clientHeight: height } = currentRef;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(width, height);
    currentRef.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    const loader = new GLTFLoader();
    loader.load(modelUrl, (gltf) => {
      scene.add(gltf.scene);
    }, undefined, (error) => {
      console.error('An error happened', error);
    });

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      currentRef.removeChild(renderer.domElement);
    };
  }, [modelUrl]);

  return <div ref={mountRef} style={{ width: '100%', height: '400px' }} />;
}

export default SneakerModel;
