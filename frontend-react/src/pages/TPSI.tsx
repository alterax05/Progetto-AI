// TPSI.jsx
import { Heading, VStack, Box, Text, Link, Image } from "@chakra-ui/react";

function TPSI() {
  return (
    <div className="flex flex-col items-center min-h-screen justify-center anim_gradient text-white">
      <VStack width="100%" spacing={8} align="center" justify="center" p={8}>
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
