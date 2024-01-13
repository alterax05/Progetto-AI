import { InferenceSession, Tensor } from "onnxruntime-web";

import {Button} from "@/components/ui/button.tsx";

import React, { useRef, useEffect } from 'react';

function Playground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const inferenceSession =  async () => { return await InferenceSession.create("@/model.onnx")};

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 500;
      canvas.height = 500;
      //canvas.style.width = `${window.innerWidth}px`;
      //canvas.style.height = `${window.innerHeight}px`;

      const context = canvas.getContext('2d');
      if (context) {
        context.scale(1, 1);
        context.lineCap = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 5;
        contextRef.current = context;
      }
    }
  }, []);

  const updatePredictions = async () => {
    if (contextRef.current && canvasRef.current) {
      const image  = contextRef.current.getImageData(0, 0, canvasRef.current.width , canvasRef.current.height).data;
      const input = new Tensor("float32", new Float32Array(image), [1, 1, 28, 28]);
      const session = await inferenceSession();
      const predictions = await session.run({ input });
      console.log(predictions);
    }
  };

  const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    if (contextRef.current) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
  };

  const finishDrawing = () => {
    if (contextRef.current) {
      contextRef.current.closePath();
    }
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    if (contextRef.current) {
      contextRef.current.lineTo(offsetX, offsetY);
    }
    if (contextRef.current) {
      contextRef.current.stroke();
    }
    updatePredictions();
  };

  const clearCanvas = () => {
    const context = contextRef.current;
    const canvas = canvasRef.current;
    if (context && canvas) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div>
    <h1 className="text-5xl m-16">
        <b>Playground</b>
      </h1>
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
      className="border-2 border-black rounded-md"
    />
    <Button className="" onClick={clearCanvas}>
      <b>Elimina</b>
    </Button>
    </div>
  );
}

export default Playground;
