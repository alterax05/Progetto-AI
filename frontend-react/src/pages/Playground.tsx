import { InferenceSession, Tensor } from "onnxruntime-web";
import { Button } from "@/components/ui/button.tsx";
import { useRef, useEffect, useState, MouseEvent } from "react";
import pica from "pica";
import modelQuickDrawUrl from "../../../modello-ai/QuickDraw-drawing-recognition/model.onnx?url";
import modelNMNISTDigitUrl from "../../../modello-ai/MNIST-digit-recognition/model.onnx?url";
import QuickDrawProbability from "@/components/QuickDrawProbability";
import MNISTProbability from "@/components/MNISTProbability";
import { Switch } from "@/components/ui/switch.tsx";
import { Label } from "@/components/ui/label.tsx";
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"

function Playground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedModel, setSelectedModel] = useState(false); //False = QuickDraw, True = MNIST
  const [outputModel, setOutputModel] = useState<Float32Array | null>(null);

  const { toast } = useToast();

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
    let model: string = selectedModel ? modelQuickDrawUrl : modelNMNISTDigitUrl;
    return InferenceSession.create(model, {
      executionProviders: ["webgl"],
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
    //Create floatArray from alphaChannel
    const float32Data = new Float32Array(dims[1] * dims[2] * dims[3]);
    for (let i = 0; i < alphaChannel.length; i++) {
      float32Data[i] = alphaChannel[i] / 255.0;
    }
    //Create the tensor object from onnxruntime-web.
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
      setOutputModel(outputTensor.data as Float32Array);
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
    setOutputModel(null);
  };

  return (

    <div>
      <h1 className="flex justify-center text-5xl m-14">
        <b>Playground</b>
      </h1>
      <div className="flex flex-row items-center justify-evenly">
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          className="bg-slate-200 rounded-md"
        />
        <div className="flex flex-col items-center justify-center space-y-5">
          <div className="flex items-center space-x-2">
            <Label htmlFor="model-selector">MNIST</Label>
            <Switch
              id="model-selector"
              value={selectedModel.toString()}
              onClick={() => {
                clearCanvas();
                setOutputModel(null);
                setSelectedModel(!selectedModel);
              }}
            />
            <Label htmlFor="model-selector">Quick! Draw</Label>
          </div>
          {selectedModel && <QuickDrawProbability outputModel={outputModel} />}
          {!selectedModel && <MNISTProbability outputModel={outputModel} />}
            <Button onClick={clearCanvas} variant="destructive" className="w-full">
              <b>Elimina</b>
            </Button>
          <div className="space-x-2">
            <Button disabled={outputModel != null} onClick={() => {toast({title:"Ciao"})}}>
              <ThumbsUp className="mr-2 h-4 w-4"/>
              Corretto
            </Button>
            <Button disabled={outputModel == null} variant={"outline"}> 
              <ThumbsDown className="mr-2 h-4 w-4" />
              Sbagliato
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playground;
