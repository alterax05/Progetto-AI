import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator.tsx";
import { useEffect } from "react";

function MNISTProbability({
  outputModel,setMaxClass
}: {
  outputModel: Float32Array | null; setMaxClass: React.Dispatch<React.SetStateAction<string>>
}) {

  const predictedProbability = outputModel
    ?  [...outputModel]
    .map((value, index) => ({ key: index, value: value }))
    .sort((a, b) => b.value - a.value)
    .map((value, _ , array) => {
      return {
        key: value.key,
        value:
          ((value.value - array[array.length - 1].value) /
          (array[0].value - array[array.length - 1].value) * 100),
      };
    })
    : Array(10).fill(10).map((_, index) => ({ key: index, value: 0 }));

  useEffect(() => {
    setMaxClass(predictedProbability[0].key.toString())
  },[predictedProbability])
  
  return (
    <ScrollArea className="h-72 w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Probabilità</h4>
        {predictedProbability.map((value, index) => (
          <div key={index}>
            <div className="text-sm">
              <b>{value.key.toString()}</b>: {value.value.toFixed(2).toString()}
              <Progress
                className="w-full h-2 mt-2 rounded-md"
                value={value.value}
              />
            </div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export default MNISTProbability;
