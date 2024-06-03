import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
} from "react";
import { cn } from "@/lib/utils"


interface DrawingCanvasProps
  extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  onFinishDrawing: () => void;
}

const DrawingCanvas = forwardRef<HTMLCanvasElement, DrawingCanvasProps>(
  (props, ref) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const canvas = (ref as React.RefObject<HTMLCanvasElement>).current;

    const { onFinishDrawing, className, ...rest } = props;

    function startup() {
      canvas?.addEventListener('touchmove', (e) => draw(e), { passive: false });
      canvas?.addEventListener('touchstart', (e) => startDrawing(e), { passive: false });
      canvas?.addEventListener('touchend', finishDrawing);
      canvas?.addEventListener('touchcancel', finishDrawing)
    }

    useEffect(() => {
      const context = canvas?.getContext("2d", { willReadFrequently: true });
      if (!canvas || !context) {
        return;
      }
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      context.lineCap = "round";
      context.strokeStyle = "black";
      context.lineWidth = 15;
      contextRef.current = context;
      startup();
    }, [canvas?.clientHeight, canvas?.clientWidth]);
    
    const startDrawing = (event : MouseEvent | TouchEvent) => {
      let canvasOffsetX, canvasOffsetY;
      if(event instanceof TouchEvent) {
        event.preventDefault();
        const { clientX, clientY } = event.touches[0];
        const rect = canvas!.getBoundingClientRect();
        canvasOffsetX = clientX - rect.left;
        canvasOffsetY = clientY - rect.top;
      }else{
        const { offsetX, offsetY } = event;
        canvasOffsetX = offsetX;
        canvasOffsetY = offsetY;
      }
      if (contextRef.current) {
        contextRef.current.beginPath();
        contextRef.current.moveTo(canvasOffsetX, canvasOffsetY);
        setIsDrawing(true);
      }
      console.log(isDrawing);
    };

    const finishDrawing = () => {
      if (contextRef.current) {
        contextRef.current.closePath();
      }
      setIsDrawing(false);
      onFinishDrawing();
    };

    const draw = (event: MouseEvent | TouchEvent) => {
      let canvasOffsetX, canvasOffsetY;
      if(event instanceof TouchEvent){
        event.preventDefault();
        const { clientX, clientY } = event.touches[0];
        const rect = canvas!.getBoundingClientRect();
        canvasOffsetX = clientX - rect.left;
        canvasOffsetY = clientY - rect.top;
      }
      else if(event instanceof MouseEvent && isDrawing){
        const { offsetX, offsetY } = event;
        canvasOffsetX = offsetX;
        canvasOffsetY = offsetY;
      }
      if (contextRef.current && canvasOffsetX && canvasOffsetY) {
        contextRef.current.lineTo(canvasOffsetX, canvasOffsetY);
        contextRef.current.stroke();
      }
    };

    return (
      <canvas
        onMouseDown={(e) => startDrawing(e.nativeEvent)}
        onMouseUp={finishDrawing}
        onMouseMove={(e) => draw(e.nativeEvent)}
        onMouseOut={finishDrawing}
        onDragExit={finishDrawing}
        ref={ref}
        className={cn("bg-slate-200 rounded-md h-[40vh] w-[40vh] mb-4 lg:h-[70vh] lg:w-[70vh] lg:mb-0", className)}
        {...rest}
      />
    );
  }
);

export default DrawingCanvas;
