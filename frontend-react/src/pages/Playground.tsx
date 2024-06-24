import { useRef, useState } from "react";
import { InferenceSession, Tensor } from "onnxruntime-web";
import pica from "pica";
import modelQuickDrawUrl from "../../../modello-ai/QuickDraw-drawing-recognition/model.onnx?url";
import modelNMNISTDigitUrl from "../../../modello-ai/MNIST-digit-recognition/model.onnx?url";
import ProbabilityDisplay from "@/components/ProbabilityDisplay";
import { Switch } from "@/components/ui/switch.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Link } from "react-router-dom";
import { ThumbsUp, ThumbsDown, MoveLeft, LoaderCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { cn } from "@/lib/utils";
import { H1 } from "@/components/typografy/heading";
import DrawingCanvas from "@/components/ui/drawing-canvas";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, buttonVariants } from "@/components/ui/button.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";

const resize = pica();

function Playground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedModel, setSelectedModel] = useState(false); // True = QuickDraw, False = MNIST
  const [outputModel, setOutputModel] = useState<Float32Array | null>(null);
  const [maxClass, setMaxClass] = useState<string>("");
  const [inferenceTime, setInferenceTime] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const reviewMutation = useMutation({
    mutationKey: ["research"],
    retry: 3,
    mutationFn: async (correct: boolean) => {
      if (correct === null) {
        throw new Error("Correct is null");
      }

      await axios.post("/api/research", {
        model: selectedModel ? "QuickDraw" : "MNIST",
        outputClass: maxClass,
        correct: correct,
        elapsedTime: inferenceTime.toFixed(0),
      });
    },
    onError: (error) => {
      console.log(error);

      toast({
        title: "Errore",
        description: "Errore durante l'invio dei dati",
      });
    },
    onSuccess: () => {
      toast({
        title: "Grazie mille!",
        description: (
          <p>
            Grazie per averci aiutato nella nostra ricerca! <br />{" "}
            <i>Michele e Giovanni</i>
          </p>
        ),
      });
      clearCanvas();
    },
  });

  const aiModel = useQuery({
    queryKey: ["ai-model", selectedModel],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      const res = await loadSession();
      return res;
    },
  });

  async function loadSession() {
    const model = selectedModel ? modelQuickDrawUrl : modelNMNISTDigitUrl;
    const newSession = await InferenceSession.create(model, {
      executionProviders: ["webgl"],
    });
    return newSession;
  }

  function imageDataToTensor(
    imageBuffer: Uint8ClampedArray,
    dims: number[]
  ): Tensor {
    // Get only the alpha channel
    const alphaChannel = new Array<number>();
    for (let i = 0; i < imageBuffer.length; i += 4) {
      alphaChannel.push(imageBuffer[i + 3]);
    }
    // Create floatArray from alphaChannel
    const float32Data = new Float32Array(dims[1] * dims[2] * dims[3]);
    for (let i = 0; i < alphaChannel.length; i++) {
      float32Data[i] = alphaChannel[i] / 255.0;
    }
    // Create the tensor object from onnxruntime-web.
    const inputTensor = new Tensor("float32", float32Data, dims);
    return inputTensor;
  }

  async function updatePredictions() {
    setLoading(true);
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { willReadFrequently: true });
    const session = aiModel.data;
    if (context && canvas && session) {
      const image = context.getImageData(0, 0, canvas.width, canvas.height);

      if (!image) {
        return;
      }

      const resizeImageData = new Uint8ClampedArray(
        await resize.resizeBuffer({
          src: new Uint8Array(image.data.buffer),
          width: image.width,
          height: image.height,
          toWidth: 28,
          toHeight: 28,
        })
      );

      const input = imageDataToTensor(resizeImageData, [1, 1, 28, 28]);
      const startTime = performance.now();

      const feeds: Record<string, Tensor> = {};
      feeds[session.inputNames[0]] = input;
      const outputMap = await session.run(feeds);
      const outputTensor = outputMap[session.outputNames[0]];
      setOutputModel(outputTensor.data as Float32Array);

      const endTime = performance.now();
      setInferenceTime(endTime - startTime);
    }
    setLoading(false);
  }

  function clearCanvas() {
    const context = canvasRef.current?.getContext("2d");
    const canvas = canvasRef.current;
    if (context && canvas) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
    setOutputModel(null);
    setMaxClass("");
  }

  return (
    <div className="flex flex-col h-screen anim_gradient text-white overflow-auto">
      <H1 className="flex justify-center m-14">Playground</H1>
      <Link
        to="/"
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "icon",
          }),
          "absolute top-5 left-5 dark:text-white text-black"
        )}
      >
        <MoveLeft className="h-5 w-5" />
      </Link>
      <div className="flex flex-col lg:flex-row items-center justify-evenly">
        {aiModel.isLoading ? (
          <Skeleton className="bg-slate-200 rounded-md h-[40vh] w-[40vh] mb-4 lg:h-[70vh] lg:w-[70vh] lg:mb-0">
            <div className="flex items-center justify-center h-full">
              <LoaderCircle className="h-10 w-10 animate-spin" color="black" />
            </div>
          </Skeleton>
        ) : (
          <DrawingCanvas ref={canvasRef} onFinishDrawing={updatePredictions} />
        )}
        <div className="flex flex-col items-center justify-center space-y-5 mb-10 lg:mb-0">
          <div className="flex items-center space-x-2">
            <Label htmlFor="model-selector">MNIST</Label>
            <Switch
              id="model-selector"
              value={selectedModel.toString()}
              onClick={() => {
                clearCanvas();
                setSelectedModel(!selectedModel);
              }}
            />
            <Label htmlFor="model-selector">Quick! Draw</Label>
          </div>
          <ProbabilityDisplay
            outputModel={outputModel}
            setMaxClass={setMaxClass}
            selectedModel={selectedModel}
            isLoading={loading}
          />
          <Button
            onClick={clearCanvas}
            disabled={outputModel == null || reviewMutation.isPending}
            variant="destructive"
            className="w-full"
          >
            <b>Elimina</b>
          </Button>
          <div className="space-x-2">
            <Button
              disabled={outputModel == null || reviewMutation.isPending}
              onClick={() => {
                reviewMutation.mutate(true);
              }}
            >
              {reviewMutation.isPending && reviewMutation.variables === true ? (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ThumbsUp className="mr-2 h-4 w-4" />
              )}
              Corretto
            </Button>
            <Button
              disabled={outputModel == null || reviewMutation.isPending}
              variant={"outline"}
              className="text-black dark:text-white"
              onClick={() => {
                reviewMutation.mutate(false);
              }}
            >
              {reviewMutation.isPending &&
              reviewMutation.variables === false ? (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ThumbsDown className="mr-2 h-4 w-4" />
              )}
              Sbagliato
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playground;
