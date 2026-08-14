'use client'

import React, { Suspense, Component, ErrorInfo, ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage, Center, Html } from '@react-three/drei'

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.hasError = false;
    this.state = { hasError: false };
  }

  // @ts-ignore
  private hasError: boolean;

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("3D Model Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-medium text-muted-foreground">Cargando 3D...</p>
      </div>
    </Html>
  )
}

export default function ModelViewer({ modelUrl }: { modelUrl: string }) {
  return (
    <div className="w-full h-full bg-secondary/20 relative">
      <ErrorBoundary fallback={
        <div className="w-full h-full flex items-center justify-center p-4 text-center">
          <p className="text-xs text-muted-foreground">No se pudo cargar el modelo 3D.<br/>Usando vista previa.</p>
        </div>
      }>
        <Canvas shadows camera={{ position: [0, 4, 4], fov: 40 }}>
          <Suspense fallback={<Loader />}>
            <Stage intensity={0.5} environment="city" adjustCamera={0.9} shadows={{ type: 'contact', opacity: 0.7 }}>
              <Center>
                <Model url={modelUrl} />
              </Center>
            </Stage>
          </Suspense>
          <OrbitControls 
            enablePan={false} 
            minDistance={2} 
            maxDistance={5} 
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
            autoRotate 
            autoRotateSpeed={0.5}
          />
        </Canvas>
        <div className="absolute bottom-2 right-2 p-1 bg-background/50 rounded text-[10px] text-muted-foreground pointer-events-none">
          Interactúa con el modelo 3D
        </div>
      </ErrorBoundary>
    </div>
  )
}
