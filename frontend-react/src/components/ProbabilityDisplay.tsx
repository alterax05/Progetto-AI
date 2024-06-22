import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator.tsx";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";

function ProbabilityDisplay({
  outputModel,
  setMaxClass,
  selectedModel,
  isLoading,
}: {
  outputModel: Float32Array | null;
  setMaxClass: React.Dispatch<React.SetStateAction<string>>;
  selectedModel: boolean;
  isLoading: boolean;
}) {
  const classes = selectedModel
    ? [
        "Torre Eiffel",
        "Aereo",
        "Ambulanza",
        "Mela",
        "Asparagi",
        "Banana",
        "Palla da baseball",
        "Palla da basket",
        "Torta di compleanno",
        "Tazza da caffè",
        "Elefante",
        "Chitarra",
        "Faro",
        "Pinguino",
        "Arcobaleno",
        "Pupazzo di neve",
        "Maglietta",
        "Televisione",
        "Tenda",
        "Triangolo",
      ]
    : Array(10)
        .fill(0)
        .map((_, index) => index.toString());

  const predictedProbability = outputModel
    ? [...outputModel]
        .map((value, index) => ({
          value: classes[index],
          prob: value,
        }))
        .sort((a, b) => b.prob - a.prob)
        .map((value, _, array) => {
          return {
            value: value.value,
            prob:
              value.prob +
              Math.max(
                array[array.length - 1].prob,
                -array[array.length - 1].prob
              ),
          };
        })
        .map((value, _, array) => {
          const total = array.reduce((acc, value) => acc + value.prob, 0) ?? 1;
          return {
            value: value.value,
            prob: (value.prob / total) * 100,
          };
        })
    : classes.map((value) => ({ value: value, prob: 0 }));

  useEffect(() => {
    setMaxClass(predictedProbability[0].value);
  }, [predictedProbability, setMaxClass]);

  return (
    <>
    <div className="flex space-x-4">
      {isLoading ? <LoaderCircle className="animate-spin w-4"/> : <h4 className="text-base font-medium">Probabilità</h4>}
    </div>          
    <ScrollArea className="h-72 w-full rounded-md border">
      <div className="p-4">
        {predictedProbability.map((value, index) => (
          <div key={index}>
            <div className="text-sm">
              <b>{value.value.toString()}</b>:{" "}
              {value.prob.toFixed(2).toString()}
              <Progress
                className="w-full h-2 mt-2 rounded-md"
                value={value.prob}
              />
            </div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
    </>
  );
}

export default ProbabilityDisplay;
