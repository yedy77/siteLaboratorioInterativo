import "./App.css";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import ImageMesh from "./ImageMesh";
import Overlay from "./Overlay";
import { useState, useRef } from "react";
import Grid from "./Grid";

function App() {
  let _zoom = 23.6;
  const [images, setImages] = useState([
    {
      front: "images/front1.jpg",
      back: "images/back1.jpg",
      width: 14.1,
      height: 10,
      rotation: 0,
      xPos: -32,
      yPos: 15.15,
    },
    {
      front: "images/front2.jpg",
      back: "images/back2.jpg",
      width: 14.1,
      height: 10,
      rotation: 0,
      xPos: -17.7,
      yPos: 15.15,
    },
    {
      front: "images/front3.jpg",
      back: "images/back3.jpg",
      width: 14.1,
      height: 10,
      rotation: 0,
      xPos: -3.4,
      yPos: 15.15,
    },
    {
      front: "images/front4.jpg",
      back: "images/back4.jpg",
      width: 14.1,
      height: 10,
      rotation: 0,
      xPos: 10.9,
      yPos: 15.15,
    },
    {
      front: "images/front5.jpg",
      back: "images/back5.jpg",
      width: 14.1,
      height: 10,
      rotation: 0,
      xPos: -32,
      yPos: 5.05,
    },
    {
      front: "images/front6.jpg",
      back: "images/back6.jpg",
      width: 14.1,
      height: 10,
      rotation: 0,
      xPos: -17.7,
      yPos: 5.05,
    },
    {
      front: "images/front7.jpg",
      back: "images/back7.jpg",
      width: 14.1,
      height: 10,
      rotation: 0,
      xPos: -3.4,
      yPos: 5.05,
    },
    {
      front: "images/front8.jpg",
      back: "images/back8.jpg",
      width: 14.1,
      height: 10,
      rotation: 0,
      xPos: 10.9,
      yPos: 5.05,
    },
    {
      front: "images/front9.jpg",
      back: "images/back9.jpg",
      width: 14.1,
      height: 10,
      rotation: 0,
      xPos: -32,
      yPos: -5.05,
    },
    {
      front: "images/front10.jpg",
      back: "images/back10.jpg",
      width: 14.1,
      height: 10,
      rotation: 0,
      xPos: -17.7,
      yPos: -5.05,
    },
    {
      front: "images/front11.jpg",
      back: "images/back11.jpg",
      width: 14.1,
      height: 10,
      rotation: 0,
      xPos: -3.4,
      yPos: -5.05,
    },
    {
      front: "images/front12.jpg",
      back: "images/back12.jpg",
      width: 14.1,
      height: 10,
      rotation: 0,
      xPos: 10.9,
      yPos: -5.05,
    },
    {
      front: "images/front13.jpg",
      back: "images/back13.jpg",
      width: 14.1,
      height: 10,
      rotation: 0,
      xPos: -32,
      yPos: -15.15,
    },
    {
      front: "images/front14.jpg",
      back: "images/back14.jpg",
      width: 14.1,
      height: 10,
      rotation: 0,
      xPos: -17.7,
      yPos: -15.15,
    },
    {
      front: "images/front15.jpg",
      back: "images/back15.jpg",
      width: 14.1,
      height: 10,
      rotation: 0,
      xPos: -3.4,
      yPos: -15.15,
    },
    {
      front: "images/front16.jpg",
      back: "images/back16.jpg",
      width: 14.1,
      height: 10,
      rotation: 0,
      xPos: 10.9,
      yPos: -15.15,
    },
    
    

  ]);

  // Create an array of refs for the images
  const imageRefs = useRef([]);

  const handleChangeImage = (index, field, value) => {
    const newImages = [...images];
    newImages[index][field] = value;
    setImages(newImages);
  };

  const resetImages = () => {
    imageRefs.current.forEach((ref) => {
      if (ref) {
        ref.resetRotation();
      }
    });
  };

  const adjustImages = () => {
    imageRefs.current.forEach((ref) => {
      if (ref) {
        ref.adjustRotation();
      }
    });
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Canvas orthographic>
        {images.map((image, index) => (
          <ImageMesh
            key={index}
            front={image.front}
            back={image.back}
            width={image.width}
            height={image.height}
            xPos={image.xPos}
            yPos={image.yPos}
            index={index}
            handleChangeImage={handleChangeImage}
            ref={(el) => (imageRefs.current[index] = el)}
          />
        ))}

        {/* <Grid x={2} y={1}>
          {(i, j) => (
            
          )}
        </Grid> */}
        <OrthographicCamera
          makeDefault
          position={[0, 0, 15]}
          zoom={_zoom}
          near={0.01}
          far={1000}
          fov={50}
        />

        <OrbitControls enableRotate={false} />
        <ambientLight intensity={1.5} />
      </Canvas>
      <Overlay resetImages={resetImages} adjustImages={adjustImages} />
    </div>
  );
}

export default App;
