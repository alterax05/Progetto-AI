import React from 'react';
import { Heading, VStack, Box, Text, Link } from "@chakra-ui/react";
import { Button } from "@/components/ui/button"

function TPSI() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
      <VStack width="100%" spacing={8} align="center" justify="center" p={8}>
        <Heading as="h1" size="4xl" textAlign="center">
          PROGETTO TPSI: Riconoscimento di Disegni e Numeri
        </Heading>
        <Box p={4} bg="rgba(255, 255, 255, 0.3)" borderRadius="md" boxShadow="lg" textAlign="center">
          <Text>
            In questo progetto, ho sviluppato due intelligenze artificiali (AI) in grado di riconoscere disegni e numeri.
            La prima AI utilizza un modello di apprendimento profondo per identificare e classificare diverse forme geometriche e linee.
            La seconda AI utilizza un modello di riconoscimento di caratteri ottici (OCR) per riconoscere i numeri.
          </Text>
        </Box>
        <Box>
          <Heading as="h2" size="xl" mb={4}>
            Descrizione dei Modelli AI
          </Heading>
          <Box mb={8}>
            <Text>
              <strong>Modello di apprendimento profondo per l'individuazione di disegni:</strong> Questo modello è stato addestrato su un dataset di immagini di disegni geometrici e linee.
              Il modello è in grado di riconoscere e classificare diverse forme geometriche come quadrati, cerchi, triangoli e linee rette.
              L'accuratezza di riconoscimento del modello è superiore al 95%.
            </Text>
          </Box>
          <Box>
            <Text>
              <strong>Modello OCR per il riconoscimento di numeri:</strong> Questo modello è stato addestrato su un dataset di immagini di numeri scritti a mano in diversi font e stili.
              Il modello è in grado di riconoscere e classificare i numeri da 0 a 9.
              L'accuratezza di riconoscimento del modello è superiore al 95%.
            </Text>
          </Box>
        </Box>
        <Box>
          <Heading as="h2" size="xl" mb={4}>
            Download dei Modelli
          </Heading>
          <VStack spacing={4}>
            <Link href="/models/drawing-detection.zip" isExternal>
              <Button variant="outline">
                Modello di Individuazione di Disegni
              </Button>
            </Link>
            <Link href="/models/number-recognition.zip" isExternal>
              <Button variant="outline">
                Modello di Riconoscimento di Numeri
              </Button>
            </Link>
          </VStack>
        </Box>
      </VStack>
    </div>
  );
}

export default TPSI;
