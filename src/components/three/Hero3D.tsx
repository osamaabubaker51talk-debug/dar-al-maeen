"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function GoldenParticles({ count = 60 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null!);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
        ] as [number, number, number],
        scale: Math.random() * 0.08 + 0.02,
        speed: Math.random() * 0.3 + 0.1,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    particles.forEach((p, i) => {
      dummy.position.set(
        p.position[0] + Math.sin(time * p.speed + p.offset) * 0.5,
        p.position[1] + Math.cos(time * p.speed * 0.7 + p.offset) * 0.3,
        p.position[2]
      );
      dummy.scale.setScalar(p.scale * (1 + Math.sin(time * 2 + p.offset) * 0.3));
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#D4AF37"
        emissive="#D4AF37"
        emissiveIntensity={0.6}
        transparent
        opacity={0.7}
      />
    </instancedMesh>
  );
}

function IslamicArch() {
  const ref = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = Math.sin(time * 0.2) * 0.1;
    }
  });

  const archPoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 40; i++) {
      const t = (i / 40) * Math.PI;
      pts.push(
        new THREE.Vector3(
          Math.sin(t) * 1.5,
          Math.cos(t) * 2 + 1.5,
          0
        )
      );
    }
    return pts;
  }, []);

  const archGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(archPoints);
    return new THREE.TubeGeometry(curve, 40, 0.04, 8, false);
  }, [archPoints]);

  return (
    <group ref={ref} position={[0, -0.5, 0]}>
      <mesh geometry={archGeometry}>
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#D4AF37"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

function BookModel() {
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = Math.sin(time * 0.5) * 0.15 + 0.3;
      group.current.position.y = Math.sin(time * 0.8) * 0.1;
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Book cover */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[1.2, 1.6, 0.05]} />
        <meshStandardMaterial color="#1B5E20" roughness={0.5} />
      </mesh>
      {/* Book spine */}
      <mesh position={[-0.6, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.05, 1.6, 0.17]} />
        <meshStandardMaterial color="#14451a" roughness={0.5} />
      </mesh>
      {/* Pages */}
      <mesh position={[0.02, 0, -0.02]}>
        <boxGeometry args={[1.15, 1.55, 0.12]} />
        <meshStandardMaterial color="#F5F0E6" roughness={0.9} />
      </mesh>
      {/* Gold decoration on cover */}
      <mesh position={[0, 0, 0.09]}>
        <ringGeometry args={[0.2, 0.25, 32]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#D4AF37"
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Gold line decorations */}
      <mesh position={[0, 0.35, 0.09]}>
        <boxGeometry args={[0.8, 0.015, 0.005]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.35, 0.09]}>
        <boxGeometry args={[0.8, 0.015, 0.005]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-3, 2, 3]} intensity={0.5} color="#D4AF37" />
        <pointLight position={[3, -2, 2]} intensity={0.3} color="#D4AF37" />

        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <BookModel />
        </Float>

        <IslamicArch />
        <GoldenParticles />
      </Canvas>
    </div>
  );
}
