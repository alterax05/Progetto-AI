import { InferenceSession, Tensor } from "onnxruntime-web";

import { Button } from "@/components/ui/button.tsx";

import { useRef, useEffect, useState, MouseEvent } from "react";

import pica from "pica";

function Playground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [predictedClass, setPredictedClass] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 500;
      canvas.height = 500;
      canvas.style.width = "500px";
      canvas.style.height = "500px";

      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (context) {
        context.scale(1, 1);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 20;
        contextRef.current = context;
      }
    }
  }, []);

  const inferenceSession = async () => {
    return await InferenceSession.create("/model.onnx", {
      executionProviders: ["webgl"],
      graphOptimizationLevel: "all",
    });
  };

  function imageDataToTensor(
    imageBuffer: Uint8ClampedArray,
    dims: number[]
  ): Tensor {
    //Get only the alpha channel
    const alphaChannel = new Array<number>();
    for (let i = 0; i < imageBuffer.length; i += 4) {
      alphaChannel.push(imageBuffer[i + 3]);
    }
    // 2. transpose the image data from [28, 28, 1]
    const float32Data = new Float32Array(dims[1] * dims[2] * dims[3]);
    for (let i = 0; i < alphaChannel.length; i++) {
      float32Data[i] = alphaChannel[i] / 255.0;
    }
    // 3. create the tensor object from onnxruntime-web.
    const inputTensor = new Tensor("float32", float32Data, dims);
    return inputTensor;
  }

  const updatePredictions = async () => {
    if (contextRef.current && canvasRef.current) {
      const image = contextRef.current.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      if (!image) {
        return;
      }
      const resizeImageData = new Uint8ClampedArray(
        await pica().resizeBuffer({
          src: new Uint8Array(image.data.buffer),
          width: image.width,
          height: image.height,
          toWidth: 28,
          toHeight: 28,
        })
      );

      const input = imageDataToTensor(resizeImageData, [1, 1, 28, 28]);
      const session = await inferenceSession();
      const feeds: Record<string, Tensor> = {};
      feeds[session.inputNames[0]] = input;
      const outputMap = await session.run(feeds);
      const outputTensor = outputMap[session.outputNames[0]];
      const outputData = outputTensor.data as Float32Array;
      const predictedClass = outputData.indexOf(Math.max(...outputData));
      setPredictedClass(predictedClass);
    }
  };
  const startDrawing = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
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
    updatePredictions();
  };

  const draw = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
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
  };

  const clearCanvas = () => {
    const context = contextRef.current;
    const canvas = canvasRef.current;
    if (context && canvas) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
    setPredictedClass(null);
  };

  return (
    <div>
      <h1 className="text-5xl m-16">
        <b>Playground</b>
      </h1>
      <p>{predictedClass}</p>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        className="border-2 border-black rounded-md"
      />
      <Button onClick={clearCanvas}>
        <b>Elimina</b>
      </Button>
    </div>
  );
}

export default Playground;
