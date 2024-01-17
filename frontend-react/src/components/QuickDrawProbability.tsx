import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator.tsx";

function QuickDrawProbability({outputModel}: {outputModel: Float32Array | null}) {
  const classes = [
    'Torre Eiffel',
    'Tenda',
    'Aereo',
    'Ambulanza',
    'Mela',
    'Asparagi',
    'Banana',
    'Palla da baseball',
    'Palla da basket',
    'Torta di compleanno',
    'Maglietta',
    'Triangolo',
    'Elefante',
    'Chitarra',
    'Arcobaleno',
    'Faro',
    'Televisione',
    'Pupazzo di neve',
    'Pinguino',
    'Tazza da caffè'
  ];

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
              ((value.prob - array[array.length - 1].prob) /
                (array[0].prob - array[array.length - 1].prob)) *
              100,
          };
        })
    : classes.map((value) => ({value: value, prob: 0 }));

  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Probabilità</h4>
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
  );
}

export default QuickDrawProbability;
