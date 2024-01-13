import { InferenceSession } from "onnxruntime-web";
import { useEffect, useRef } from "react";


function Playground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const loadAndRunModel = async () => {
      const session = await InferenceSession.create("@/model.onnx");
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        ctx.lineWidth = 28;
        ctx.lineJoin = "round";
        ctx.font = "28px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#212121";

        function drawLine(fromX, fromY, toX, toY) {
          // Draws a line from (fromX, fromY) to (toX, toY).
          ctx.beginPath();
          ctx.moveTo(fromX, fromY);
          ctx.lineTo(toX, toY);
          ctx.closePath();
          ctx.stroke();
          updatePredictions();
        }
        async function updatePredictions() {
          // Get the predictions for the canvas data.
          const imgData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
          const input = new onnx.Tensor(
            new Float32Array(imgData.data),
            "float32"
          );

          const outputMap = await sess.run([input]);
          const outputTensor = outputMap.values().next().value;
          const predictions = outputTensor.data;
          const maxPrediction = Math.max(...predictions);

          for (let i = 0; i < predictions.length; i++) {
            const element = document.getElementById(`prediction-${i}`);
            element.children[0].children[0].style.height = `${
              predictions[i] * 100
            }%`;
            element.className =
              predictions[i] === maxPrediction
                ? "prediction-col top-prediction"
                : "prediction-col";
          }
        }
      }
    };

    loadAndRunModel();
  }, []);

  return (
    <div>
      <h1>Playground</h1>
      <canvas id="canvas" width="500" height="500" className=""></canvas>
    </div>
  );
}

export default Playground;
