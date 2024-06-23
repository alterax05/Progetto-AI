// TPSI.jsx
import { Heading, VStack, Box, Text, Link, Image } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect } from "react";
import { useState } from "react";
import { Bar } from "react-chartjs-2";

interface DataGraphComparison {
  label: string;
  total: number;
  correct: number;
}

function TPSI() {
  let [dataGraphComparison, setDataGraphComparison] = useState<
    DataGraphComparison[]
  >([]);

  useEffect(() => {
    /*fetch("/api/research/comparison")
      .then((response) => response.json())
      .then((data) => setDataGraphComparison(data));
      */

    setDataGraphComparison([
      {
        "label": "Aereo",
        "total": 5,
        "correct": 5
      },
      {
        "label": "Ambulanza",
        "total": 1,
        "correct": 1
      },
      {
        "label": "Asparagi",
        "total": 3,
        "correct": 3
      },
      {
        "label": "Banana",
        "total": 2,
        "correct": 2
      },
      {
        "label": "Chitarra",
        "total": 2,
        "correct": 2
      },
      {
        "label": "Elefante",
        "total": 1,
        "correct": 1
      },
      {
        "label": "Maglietta",
        "total": 1,
        "correct": 1
      },
      {
        "label": "Mela",
        "total": 5,
        "correct": 5
      },
      {
        "label": "Palla da baseball",
        "total": 2,
        "correct": 2
      },
      {
        "label": "Palla da basket",
        "total": 1,
        "correct": 1
      },
      {
        "label": "Pupazzo di neve",
        "total": 1,
        "correct": 1
      },
      {
        "label": "Tazza da caffè",
        "total": 1,
        "correct": 1
      },
      {
        "label": "Televisione",
        "total": 2,
        "correct": 2
      },
      {
        "label": "Torre Eiffel",
        "total": 2,
        "correct": 2
      },
      {
        "label": "Torta di compleanno",
        "total": 1,
        "correct": 1
      },
      {
        "label": "Triangolo",
        "total": 4,
        "correct": 4
      }
    ]);
    }, []);


  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  ChartJS.defaults.color = "white";

  const DataGraphComparisonComponent = () => {
    const data = {
      labels: dataGraphComparison.map((info) => info.label),
      datasets: [
        {
          label: "Total",
          data: dataGraphComparison.map((info) => info.total),
          backgroundColor: "rgb(255, 99, 132, 1)",
        },
        {
          label: "Correct",
          data: dataGraphComparison.map((info) => info.correct),
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
          text: "Confronto tra i modelli AI",
        },
      },
    };
    return <Bar options={options} data={data} />;
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center anim_gradient text-white">
      <VStack width="80%" spacing={8} align="center" justify="center" p={8}>
        <Heading as="h1" size="2xl" textAlign="center">
          Progetto TPSI: Riconoscimento di Disegni e Numeri
        </Heading>
        <Box mt={8}>
          <Text>
            In questo progetto sono state sviluppate due intelligenze
            artificiali (AI) in grado di riconoscere disegni e numeri. Entrambe
            si basano su una rete neurale convoluzionale (CNN). La prima AI
            utilizza un modello di apprendimento profondo basato sul dataset{" "}
            <Link
              href="https://en.wikipedia.org/wiki/MNIST_database"
              isExternal
              color={"teal.300"}
            >
              {" "}
              MNIST{" "}
            </Link>{" "}
            per riconoscere cifre scritte a mano. La seconda utilizza il dataset
            di{" "}
            <Link
              href="https://quickdraw.withgoogle.com/"
              isExternal
              color="teal.300"
            >
              Quick, Draw!
            </Link>{" "}
            per riconoscere 20 tipi di disegno differenti. Entrambe usano
            PyTorch come framework di deep learning.
          </Text>
        </Box>
        <Box>
          <Heading as="h2" size="xl" mb={4}>
            Descrizione dei Modelli AI
          </Heading>
          <Box mb={8}>
            <Text mb={4}>
              <strong>
                Modello di apprendimento profondo per l'individuazione di
                disegni:
              </strong>{" "}
              Questo modello è stato addestrato su un dataset di immagini di
              disegni. Il modello è in grado di riconoscere e classificare 20
              dei 345 tipi di disegni. L'accuratezza di riconoscimento del
              modello è superiore al 92% e risultato molto affidabile durante il
              test con persone. Qui sotto è possibile visualizzare il notebook
              di Google Colab utilizzato per addestrare il modello.
            </Text>
            <Link
              href="https://colab.research.google.com/github/alterax05/Progetto-AI/blob/master/modello-ai/QuickDraw-drawing-recognition/train-model.ipynb"
              target="_blank"
            >
              <Image
                src="https://colab.research.google.com/assets/colab-badge.svg"
                alt="Open In Colab"
              />
            </Link>
          </Box>
          <Box>
            <Text mb={4}>
              <strong>Modello OCR per il riconoscimento di numeri:</strong>{" "}
              Questo modello è stato addestrato su un dataset di immagini di
              numeri scritti a mano in diversi font e stili. (MNIST) Il modello
              è in grado di riconoscere e classificare i numeri da 0 a 9.
              L'accuratezza di riconoscimento del modello è superiore al 95%.
              Qui sotto è possibile visualizzare il notebook di Google Colab
              utilizzato per addestrare il modello.
            </Text>
            <Link
              href="https://colab.research.google.com/github/alterax05/Progetto-AI/blob/master/modello-ai/MNIST-digit-recognition/train-model.ipynb"
              target="_blank"
            >
              <Image
                src="https://colab.research.google.com/assets/colab-badge.svg"
                alt="Open In Colab"
              />
            </Link>
          </Box>
        </Box>
        <Box>
          <Heading as="h2" size="xl" mb={4}>
            Utilizzo di PyTorch
          </Heading>
          <Text>
            Entrambi i modelli sono stati implementati utilizzando il framework
            di deep learning PyTorch. Essa è una libreria open-source che offre
            supporto per lo sviluppo di reti neurali, facilitando la
            definizione, l'addestramento e l'implementazione di modelli di
            machine learning. Grazie a "PyTorch" e "Gooogle Colab" è stato
            possibile addestrare i modelli usando la potenza di calcolo delle
            GPU, accellerando cosi il processo. Infatti si è passati da un tempo
            di addestramento di 30 minuti a 7 minuti nel caso di "Quick, Draw".
            Per implementare i modelli sul Web ci siamo avvalsi del framework
            "React" e della libreria "ONNX". ONNX è un formato di file
            open-source per la rappresentazione di modelli di machine learning.
          </Text>
        </Box>
        <Box>
          <Heading as="h2" size="xl" mb={4}>
            Problemi Riscontrati
          </Heading>
          <Text>
            Durante lo sviluppo di questo progetto sono stati riscontrati
            diversi problemi. Il problema principale è stato l'elevato numero di
            errori da parte del modello MNIST. Ciò può essere dovuto a alcuni
            fattori come overfitting, underfitting o semplicemente a un dataset
            di addestramento non abbastanza ampio. Inoltre il modello MNIST è
            più semplice rispetto a quello di Quick, Draw! e quindi è più facile
            che commetta errori. Esso ha meno filti convoluzionali e meno layer
            di pooling. Non avendo individuato ancora la causa possibile dei
            problemi avevamo preso in consideranzione l'idea di passare ad
            un'altra libreria di deep learning come TensorFlow, ma non è stato
            possibile per mancanza di tempo. A differenza di PyTorch, TensorFlow
            supporta nativate l'ambiente web con la libreria TensorFlow.js.
          </Text>
        </Box>
        <Box>
          <Heading as="h2" size="xl" mb={4}>
            Possibili Miglioramenti
          </Heading>
          <Text>
            Con le conoscenze attuali non è chiaro come migliorare ulteriormente
            il modello. Alcuni fattori che potrebbero ottimizzare ulteriormente
            l'intelligenza artificiale sono: aumentare il dataset di
            addestramento e provare ad utilizzare altri modelli, magari
            pre-allenati, come VGG16 o ResNet50. Inoltre sarebbe utile usare il
            sistema di feedback per validare le previsioni del AI,
            sostanzialmente implementando l'approccio di RFHL (Reinforcement
            learning from human feedback).
          </Text>
        </Box>
        <Heading as="h2" size="xl" mb={4}>
          Grafici
        </Heading>
        <div className="w-full h-80">
          <DataGraphComparisonComponent />
        </div>
        <div className="flex lg:flex-row lg:space-x-2 flex-col">
        <Text >
          Percentuale di successo di MNIST:{" "}
          {(DataGraphComparisonComponent().props.data.datasets[1].data[0] /
            DataGraphComparisonComponent().props.data.datasets[0].data[0]) *
            100}
          %
        </Text>
        <Text >
          Percentuale di successo di Quick, Draw!:{" "}
          {(DataGraphComparisonComponent().props.data.datasets[1].data[1] /
            DataGraphComparisonComponent().props.data.datasets[0].data[1]) *
            100}
          %
        </Text>
        </div>
        <div className="w-full h-80">
          <DataGraphComparisonComponent />
        </div>
        <Box>
          <Text>
            <b>Michele Porcellato e Giovanni De Quattro</b>
          </Text>
        </Box>
      </VStack>
    </div>
  );
}

export default TPSI;
