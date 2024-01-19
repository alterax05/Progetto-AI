// TPSI.jsx
import React from 'react';
import { Heading, VStack, Box, Text, Link } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";

function TPSI() {
  return (
    <div className="flex flex-col items-center justify-center anim_gradient text-white">
      <VStack width="100%" spacing={8} align="center" justify="center" p={8}>
        <Heading as="h1" size="3xl" textAlign="center">
          PROGETTO TPSI: Riconoscimento di Disegni e Numeri
        </Heading>
        <Box p={4} bg="rgba(255, 255, 255, 0.3)" borderRadius="md" boxShadow="lg" textAlign="center">
          <Text>
            In questo progetto, ho sviluppato due intelligenze artificiali (AI) in grado di riconoscere disegni e numeri.
            La prima AI utilizza un modello di apprendimento profondo basato su <Link href="https://pytorch.org/" isExternal color="teal.300">PyTorch</Link> per identificare e classificare diverse forme geometriche e linee.
            La seconda AI utilizza un modello di riconoscimento di caratteri ottici (OCR) basato su PyTorch per riconoscere i numeri.
          </Text>
        </Box>
        <Box>
          <Heading as="h2" size="xl" mb={4}>
            Descrizione dei Modelli AI
          </Heading>
          <Box mb={8}>
            <Text>
              <strong>Modello di apprendimento profondo per l'individuazione di disegni:</strong> Questo modello è stato implementato utilizzando PyTorch e addestrato su un dataset di immagini di disegni geometrici e linee.
              Il modello è in grado di riconoscere e classificare diverse forme geometriche come quadrati, cerchi, triangoli e linee rette.
              L'accuratezza di riconoscimento del modello è superiore al 95%.
            </Text>
          </Box>
          <Box>
            <Text>
              <strong>Modello OCR per il riconoscimento di numeri:</strong> Questo modello è stato implementato utilizzando PyTorch e addestrato su un dataset di immagini di numeri scritti a mano in diversi font e stili.
              Il modello è in grado di riconoscere e classificare i numeri da 0 a 9.
              L'accuratezza di riconoscimento del modello è superiore al 95%.
            </Text>
          </Box>
        </Box>
        <Box>
          <Heading as="h2" size="xl" mb={4}>
            Utilizzo di PyTorch e Dataset di Quick, Draw!
          </Heading>
          <Text>
            Entrambi i modelli sono stati implementati utilizzando il framework di deep learning PyTorch. PyTorch è una libreria open-source che offre supporto per lo sviluppo di reti neurali, facilitando la definizione, l'addestramento e l'implementazione di modelli di machine learning.
          </Text>
          <Text mt={4}>
            Il dataset di <Link href="https://quickdraw.withgoogle.com/" isExternal color="teal.300">Quick, Draw!</Link> è stato utilizzato per addestrare entrambi i modelli. Quick, Draw! è un progetto di Google che offre un vasto dataset di schizzi di disegni fatti dagli utenti in tempo reale. Questo dataset diversificato contribuisce alla robustezza e all'efficacia dei modelli nell'affrontare una vasta gamma di situazioni.
          </Text>
        </Box>
      </VStack>
    </div>
  );
}

export default TPSI;
