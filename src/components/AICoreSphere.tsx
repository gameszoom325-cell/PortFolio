import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AICoreSphereProps {
  isLightMode: boolean;
  className?: string;
}

export default function AICoreSphere({ isLightMode, className = "" }: AICoreSphereProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Device detection: Mobile optimization vs Desktop high-fidelity
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: isMobile ? 'default' : 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1.2) : Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for entire AI Core
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Theme Colors
    const primaryColor = isLightMode ? 0xd97706 : 0xf59e0b; // Amber
    const secondaryColor = isLightMode ? 0x0284c7 : 0x06b6d4; // Cyan
    const accentColor = isLightMode ? 0x9333ea : 0xec4899; // Pink / Magenta

    // 1. Inner Core Nucleus (faceted crystal)
    const innerGeo = new THREE.IcosahedronGeometry(1.2, isMobile ? 0 : 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      wireframe: true,
      transparent: true,
      opacity: isLightMode ? 0.65 : 0.82
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    // Inner soft solid glow sphere
    const solidGlowGeo = new THREE.SphereGeometry(0.82, isMobile ? 10 : 16, isMobile ? 10 : 16);
    const solidGlowMat = new THREE.MeshBasicMaterial({
      color: isLightMode ? 0xf59e0b : 0xff7700,
      transparent: true,
      opacity: isLightMode ? 0.2 : 0.35
    });
    const solidGlowMesh = new THREE.Mesh(solidGlowGeo, solidGlowMat);
    coreGroup.add(solidGlowMesh);

    // 2. Middle Wireframe Lattice Sphere
    const midGeo = new THREE.IcosahedronGeometry(2.0, isMobile ? 1 : 2);
    const midMat = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      wireframe: true,
      transparent: true,
      opacity: isLightMode ? 0.35 : 0.48
    });
    const midSphere = new THREE.Mesh(midGeo, midMat);
    coreGroup.add(midSphere);

    // 3. Outer Holographic Shell (low-poly cage)
    const outerGeo = new THREE.IcosahedronGeometry(2.5, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      wireframe: true,
      transparent: true,
      opacity: isLightMode ? 0.22 : 0.3
    });
    const outerSphere = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerSphere);

    // 4. Orbiting Rings (Quantum electron orbits)
    const ringGeo1 = new THREE.TorusGeometry(2.9, 0.018, isMobile ? 8 : 14, isMobile ? 48 : 80);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: isLightMode ? 0.5 : 0.7
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    coreGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.2, 0.018, isMobile ? 8 : 14, isMobile ? 48 : 80);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      transparent: true,
      opacity: isLightMode ? 0.45 : 0.65
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    coreGroup.add(ring2);

    // 5. Floating Particle Cloud (optimally reduced for mobile)
    const particleCount = isMobile ? 110 : 360;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(primaryColor);
    const color2 = new THREE.Color(secondaryColor);
    const color3 = new THREE.Color(accentColor);
    const colorPalette = [color1, color2, color3];

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.7 + Math.random() * 2.3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.08 : (isLightMode ? 0.065 : 0.085),
      vertexColors: true,
      transparent: true,
      opacity: isLightMode ? 0.65 : 0.85
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particleSystem);

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouseRef.current.targetX = (clientX / rect.width) * 2 - 1;
      mouseRef.current.targetY = -(clientY / rect.height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Damped mouse tracking with depth parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.045;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.045;

      // Gentle floating levitation oscillation
      coreGroup.position.y = Math.sin(elapsed * 1.1) * 0.16;

      // Group rotation reacting smoothly to mouse coordinates + slow idle drift
      coreGroup.rotation.y = elapsed * 0.22 + mouseRef.current.x * 0.55;
      coreGroup.rotation.x = Math.sin(elapsed * 0.12) * 0.12 - mouseRef.current.y * 0.35;

      // Camera parallax shift for realistic 3D depth
      camera.position.x = mouseRef.current.x * 0.45;
      camera.position.y = mouseRef.current.y * 0.35;
      camera.lookAt(0, coreGroup.position.y, 0);

      // Independent internal rotations
      innerCore.rotation.x = elapsed * 0.45;
      innerCore.rotation.z = elapsed * 0.35;

      // Breathing pulse animation
      const pulse = 1 + Math.sin(elapsed * 2.0) * 0.06;
      innerCore.scale.set(pulse, pulse, pulse);
      solidGlowMesh.scale.set(pulse * 0.95, pulse * 0.95, pulse * 0.95);

      midSphere.rotation.y = -elapsed * 0.25;
      outerSphere.rotation.z = elapsed * 0.15;

      ring1.rotation.z = elapsed * 0.5;
      ring2.rotation.y = elapsed * 0.38;

      particleSystem.rotation.y = -elapsed * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      solidGlowGeo.dispose();
      solidGlowMat.dispose();
      midGeo.dispose();
      midMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [isLightMode]);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full flex items-center justify-center pointer-events-none select-none ${className}`}
      style={{ minHeight: '340px' }}
      aria-hidden="true"
    />
  );
}
