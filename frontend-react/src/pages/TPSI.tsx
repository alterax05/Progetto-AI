import { Heading, VStack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

function TPSI() {
  return (
    <div
      className="flex items-center justify-center h-64  
    bg-gradient-to-r 
    from-blue-400 
    to-orange-500 
    via-purple-500
    "
    >
      <VStack width="100vw" height="20vh" align="center" justify="center">
        <Heading as="h1" size="4xl" noOfLines={1}>
          RICERCA TPSI
        </Heading>
      </VStack>
      <Box color="gray.50" />
      // raw CSS color value
      <Box color="#f00" />
      // background colors
      <Box bg="tomato" />
      // verbose prop
      <Box backgroundColor="tomato" />
      <text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero
        veritatis iste rerum ratione sit reiciendis qui ea quaerat laboriosam
        adipisci minus, in cum tempora, totam porro nemo? Id, expedita quas.
      </text>
    </div>
  );
}

export default TPSI;
