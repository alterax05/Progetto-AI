import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FC } from "react";
import { Bar } from "react-chartjs-2";
import { H1, H2 } from "@/components/typografy/heading";
import { P } from "@/components/typografy/p";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

interface DataGraphComparison {
  label: string;
  total: number;
  correct: number;
}

function TPSI() {
  const comparisonModels = useQuery({
    queryKey: ["comparison"],
    queryFn: async () => {
      const response = await fetch("/api/research/comparison");
      return (await response.json()) as DataGraphComparison[];
    },
  });

  const comparisonMNIST = useQuery({
    queryKey: ["comparison", "MNIST"],
    queryFn: async () => {
      const response = await fetch("/api/research/comparison/MNIST");
      return (await response.json()) as DataGraphComparison[];
    },
  });

  const comparisonQuickDraw = useQuery({
    queryKey: ["comparison", "QuickDraw"],
    queryFn: async () => {
      const response = await fetch("/api/research/comparison/QuickDraw");
      return (await response.json()) as DataGraphComparison[];
    },
  });

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  ChartJS.defaults.color = "white";

  const Graph: FC<{ graphData: DataGraphComparison[]; title: string }> = ({
    graphData,
    title,
  }) => {
    if (!graphData) return null;
    const data = {
      labels: graphData.map((info) => info.label),
      datasets: [
        {
          label: "Total",
          data: graphData.map((info) => info.total),
          backgroundColor: "rgb(255, 99, 132, 1)",
        },
        {
          label: "Correct",
          data: graphData.map((info) => info.correct),
          backgroundColor: "rgb(54, 162, 235, 1)",
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false, // Allows the chart to resize based on the container size
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: title,
        },
      },
    };
    return <Bar options={options} data={data} />;
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center anim_gradient text-white p-8 space-y-5">
      <H1 className="text-center">
        Progetto TPSI: Riconoscimento di Disegni e Numeri
      </H1>
      <P>
        In questo progetto sono state sviluppate due intelligenze artificiali
        (AI) in grado di riconoscere disegni e numeri. Entrambe si basano su una
        rete neurale convoluzionale (CNN). La prima AI utilizza un modello di
        apprendimento profondo basato sul dataset{" "}
        <a
          href="https://en.wikipedia.org/wiki/MNIST_database"
          target="_blank"
          className="text-teal-300 hover:underline"
        >
          MNIST
        </a>{" "}
        per riconoscere cifre scritte a mano. La seconda utilizza il dataset di{" "}
        <a
          href="https://quickdraw.withgoogle.com/"
          target="_blank"
          className="text-teal-300 hover:underline"
        >
          Quick, Draw!
        </a>{" "}
        per riconoscere 20 tipi di disegno differenti. Entrambe usano PyTorch
        come framework di deep learning.
      </P>
      <H2>Descrizione dei Modelli AI</H2>
      <P>
        <strong>
          Modello di apprendimento profondo per l'individuazione di disegni:
        </strong>{" "}
        Questo modello è stato addestrato su un dataset di immagini di disegni.
        Il modello è in grado di riconoscere e classificare 20 dei 345 tipi di
        disegni. L'accuratezza di riconoscimento del modello è superiore al 92%
        e risultato molto affidabile durante il test con persone. Qui sotto è
        possibile visualizzare il notebook di Google Colab utilizzato per
        addestrare il modello.
      </P>
      <a
        href="https://colab.research.google.com/github/alterax05/Progetto-AI/blob/master/modello-ai/QuickDraw-drawing-recognition/train-model.ipynb"
        target="_blank"
        className="text-teal-300 hover:underline"
      >
        <img
          src="https://colab.research.google.com/assets/colab-badge.svg"
          alt="Open in Colab"
        />
      </a>
      <P>
        <strong>Modello OCR per il riconoscimento di numeri:</strong> Questo
        modello è stato addestrato su un dataset di immagini di numeri scritti a
        mano in diversi font e stili. (MNIST) Il modello è in grado di
        riconoscere e classificare i numeri da 0 a 9. L'accuratezza di
        riconoscimento del modello è superiore al 95%. Qui sotto è possibile
        visualizzare il notebook di Google Colab utilizzato per addestrare il
        modello.
      </P>
      <a
        href="https://colab.research.google.com/github/alterax05/Progetto-AI/blob/master/modello-ai/MNIST-digit-recognition/train-model.ipynb"
        target="_blank"
        className="text-teal-300 hover:underline"
      >
        <img
          src="https://colab.research.google.com/assets/colab-badge.svg"
          alt="Open in Colab"
        />
      </a>
      <H2>Utilizzo di Pytorch</H2>
      <P>
        Entrambi i modelli sono stati implementati utilizzando il framework di
        deep learning PyTorch. Essa è una libreria open-source che offre
        supporto per lo sviluppo di reti neurali, facilitando la definizione,
        l'addestramento e l'implementazione di modelli di machine learning.
        Grazie a "PyTorch" e "Gooogle Colab" è stato possibile addestrare i
        modelli usando la potenza di calcolo delle GPU, accellerando cosi il
        processo. Infatti si è passati da un tempo di addestramento di 30 minuti
        a 7 minuti nel caso di "Quick, Draw". Per implementare i modelli sul Web
        ci siamo avvalsi del framework "React" e della libreria "ONNX". ONNX è
        un formato di file open-source per la rappresentazione di modelli di
        machine learning.
      </P>
      <H2>Problemi Riscontrati</H2>
      <P>
        Durante lo sviluppo di questo progetto sono stati riscontrati diversi
        problemi. Il problema principale è stato l'elevato numero di errori da
        parte del modello MNIST. Ciò può essere dovuto a alcuni fattori come
        overfitting, underfitting o semplicemente a un dataset di addestramento
        non abbastanza ampio. Inoltre il modello MNIST è più semplice rispetto a
        quello di Quick, Draw! e quindi è più facile che commetta errori. Esso
        ha meno filti convoluzionali e meno layer di pooling. Non avendo
        individuato ancora la causa possibile dei problemi avevamo preso in
        consideranzione l'idea di passare ad un'altra libreria di deep learning
        come TensorFlow, ma non è stato possibile per mancanza di tempo. A
        differenza di PyTorch, TensorFlow supporta nativate l'ambiente web con
        la libreria TensorFlow.js.
      </P>
      <H2>Risultati dei modelli</H2>
      <div className="w-full h-80 flex justify-center items-center">
        {!comparisonModels.isLoading && comparisonModels.data ? (
          <Graph
            graphData={comparisonModels.data}
            title="Confronto tra i modelli AI"
          />
        ) : (
          <LoaderCircle className="h-16 w-16 animate-spin" />
        )}
      </div>
      <div className="flex lg:flex-row lg:space-x-2 flex-col">
        <div>
          <P>
            Percentuale di successo di MNIST:{" "}
            {comparisonModels.data
              ? (
                  (comparisonModels.data[0].correct /
                    comparisonModels.data[0].total) *
                  100
                ).toFixed(2) + "%"
              : comparisonModels.isLoading
              ? "Caricamento"
              : 0 + "%"}
          </P>
        </div>
        <div>
          <P>
            Percentuale di successo di Quick, Draw!:{" "}
            {comparisonModels.data
              ? (
                  (comparisonModels.data[1].correct /
                    comparisonModels.data[1].total) *
                  100
                ).toFixed(2) + "%"
              : comparisonModels.isLoading
              ? "Caricamento"
              : 0 + "%"}
          </P>
        </div>
      </div>
      <div className="w-full h-80 flex justify-center items-center">
        {!comparisonQuickDraw.isLoading && comparisonMNIST.data ? (
          <Graph
            graphData={comparisonMNIST.data}
            title="Performance del modello MNIST"
          />
        ) : (
          <LoaderCircle className="h-16 w-16 animate-spin" />
        )}
      </div>
      <div className="w-full h-80 flex justify-center items-center">
        {!comparisonQuickDraw.isLoading && comparisonQuickDraw.data ? (
          <Graph
            graphData={comparisonQuickDraw.data}
            title="Performance del modello QuickDraw"
          />
        ) : (
          <LoaderCircle className="h-16 w-16 animate-spin" />
        )}
      </div>
      <H2>Possibili Miglioramenti</H2>
      <P>
        Con le conoscenze attuali non è chiaro come migliorare ulteriormente il
        modello. Alcuni fattori che potrebbero ottimizzare ulteriormente
        l'intelligenza artificiale sono: aumentare il dataset di addestramento e
        provare ad utilizzare altri modelli, magari pre-allenati, come VGG16 o
        ResNet50. Inoltre sarebbe utile usare il sistema di feedback per
        validare le previsioni del AI, sostanzialmente implementando l'approccio
        di RFHL (Reinforcement learning from human feedback).
      </P>
      <P>
        <b>Michele Porcellato e Giovanni De Quattro</b>
      </P>
    </div>
  );
}

export default TPSI;
