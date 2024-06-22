import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import { cn } from "@/lib/utils";

interface DrawingCanvasProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  onFinishDrawing: () => void;
}

const DrawingCanvas = forwardRef<HTMLCanvasElement, DrawingCanvasProps>(
  (props, ref) => {
    const isDrawingRef = useRef(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const { onFinishDrawing, className, ...rest } = props;

    // Expose methods to parent component
    useImperativeHandle(ref, () => canvasRef.current!, [onFinishDrawing]);

    const setSizeCanvas = () => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d", { willReadFrequently: true });

      if (canvas && context) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 15;
      }
    };

    useEffect(() => {
      window.addEventListener('resize', setSizeCanvas);

      return () => {
        window.removeEventListener('resize', setSizeCanvas);
      };
    }, []);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      setSizeCanvas();

      const handleTouchMove = (e: TouchEvent) => draw(e);
      const handleTouchStart = (e: TouchEvent) => startDrawing(e);

      canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
      canvas.addEventListener('touchstart', handleTouchStart, { passive: false });

      return () => {
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchstart', handleTouchStart);
      };
    }, []);
    
    const startDrawing = (event: MouseEvent | TouchEvent) => {
      let canvasOffsetX, canvasOffsetY;
      if (event instanceof TouchEvent) {
        event.preventDefault();
        const { clientX, clientY } = event.touches[0];
        const rect = canvasRef.current!.getBoundingClientRect();
        canvasOffsetX = clientX - rect.left;
        canvasOffsetY = clientY - rect.top;
      } else {
        const { offsetX, offsetY } = event;
        canvasOffsetX = offsetX;
        canvasOffsetY = offsetY;
      }
      const context = canvasRef.current?.getContext("2d", { willReadFrequently: true });
      isDrawingRef.current = true;
      if (context) {
        context.beginPath();
        context.moveTo(canvasOffsetX, canvasOffsetY);
      }
      else{
        console.log("context is null");
      }
    };

    const finishDrawing = () => {
      if(isDrawingRef.current === false) return;
      isDrawingRef.current = false; // Update the mutable reference
      canvasRef.current?.getContext("2d", { willReadFrequently: true })?.closePath();
      onFinishDrawing();
    };

    const draw = (event: MouseEvent | TouchEvent) => {
      if (!isDrawingRef.current) return; // Check the mutable reference

      let canvasOffsetX, canvasOffsetY;
      if (event instanceof TouchEvent) {
        event.preventDefault();
        const { clientX, clientY } = event.touches[0];
        const rect = canvasRef.current!.getBoundingClientRect();
        canvasOffsetX = clientX - rect.left;
        canvasOffsetY = clientY - rect.top;
      } else if (event instanceof MouseEvent) {
        const { offsetX, offsetY } = event;
        canvasOffsetX = offsetX;
        canvasOffsetY = offsetY;
      }

      const context = canvasRef.current?.getContext("2d", { willReadFrequently: true });
      if (context && canvasOffsetX && canvasOffsetY) {
        context.lineTo(canvasOffsetX, canvasOffsetY);
        context.stroke();
      }
    };

    return (
      <canvas
        onMouseDown={(e) => startDrawing(e.nativeEvent)}
        onMouseUp={finishDrawing}
        onMouseMove={(e) => draw(e.nativeEvent)}
        onMouseOut={finishDrawing}
        onDragExit={finishDrawing}
        onTouchEnd={finishDrawing}
        onTouchCancel={finishDrawing}
        ref={canvasRef}
        className={cn(
          "bg-slate-200 rounded-md h-[40vh] w-[40vh] mb-4 lg:h-[70vh] lg:w-[70vh] lg:mb-0",
          className
        )}
        {...rest}
      />
    );
  }
);

export default DrawingCanvas;
