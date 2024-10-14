import * as THREE from "three";
import { animated, useSpring } from "@react-spring/three";
import { useDrag } from "@use-gesture/react";
import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useTexture } from "@react-three/drei";

const ImageMesh = forwardRef(({ front, back, width, height, xPos, yPos, index, handleChangeImage }, ref) => {
  const frontMesh = useRef();
  const backMesh = useRef();
  const [totalRotation, setTotalRotation] = useState(0);
  const mouseSensitivity = 0.00015;

  const textureFront = useTexture(front);
  const textureBack = useTexture(back);

  const geometry = new THREE.PlaneGeometry(width, height, 2);
  const [spring, api] = useSpring(() => ({ rotation: [0, 0, 0] }));

  const normalizeRotation = (angle) => {
    // Ensure rotation is always between 0 and 2 * Math.PI
    const twoPi = Math.PI * 2;
    
    // Handle negative rotations by converting them to positive angles
    return (angle % twoPi + twoPi) % twoPi;
  };

  const isBackwards = () => {
    const normalizedRotation = normalizeRotation(totalRotation);
  
    // Image is backwards if the rotation is closer to Math.PI (or between π/2 and 3π/2)
    return normalizedRotation > Math.PI / 2 && normalizedRotation < 3 * Math.PI / 2;
  };

  useImperativeHandle(ref, () => ({
    resetRotation: () => {
      setTotalRotation(0);  // Reset total rotation
      api.start({ rotation: [0, 0, 0], immediate: false });
      handleChangeImage(index, "rotation", 0);  // Reset rotation in state
    },
    adjustRotation: () => {
      const newRotation = isBackwards() ? Math.PI : 0;
      setTotalRotation(newRotation);
      api.start({ rotation: [0, normalizeRotation(newRotation), 0], immediate: false });
      handleChangeImage(index, "rotation", newRotation);
    }
  }));

  const bind = useDrag(({ down, movement: [mx], velocity: [vx] }) => {
    let newRotation;
    
    if (down) {
      // Rotate based on mouse movement while dragging
      newRotation = totalRotation + mx * mouseSensitivity;
    } else {
      // Rotate based on velocity when releasing
      newRotation = totalRotation + vx * 2;
    }

    newRotation = normalizeRotation(newRotation);  // Normalize rotation between 0 and 2 * Math.PI

    // Apply new rotation
    setTotalRotation(newRotation);
    api.start({
      rotation: [0, newRotation, 0],
      immediate: down,
      config: { friction: 40, tension: 200 },
    });

    // Update parent state with new rotation
    handleChangeImage(index, "rotation", newRotation);
  });

  useEffect(() => {
    frontMesh.current.rotation.y = 0;
    backMesh.current.rotation.y = 0;
  }, []);

  return (
    <>
      <animated.mesh
        {...spring}
        {...bind()}
        ref={frontMesh}
        geometry={geometry}
        position={[xPos, yPos, 0.01]}
      >
        <meshStandardMaterial
          map={textureFront}
          side={THREE.FrontSide}
          depthWrite={false}
          depthTest={false}
        />
      </animated.mesh>

      <animated.mesh
        {...spring}
        {...bind()}
        ref={backMesh}
        geometry={geometry}
        scale={[-1, 1, 1]}
        position={[xPos, yPos, -0.01]}
      >
        <meshStandardMaterial
          map={textureBack}
          side={THREE.BackSide}
          depthWrite={false}
          depthTest={false}
        />
      </animated.mesh>
    </>
  );
});

export default ImageMesh;