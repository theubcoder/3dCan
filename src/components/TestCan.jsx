'use client';

export default function TestCan() {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <mesh position={[0, 0, 0]} scale={2}>
        <cylinderGeometry args={[1, 1, 3, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
}