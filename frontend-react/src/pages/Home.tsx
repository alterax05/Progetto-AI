import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoveRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import ThemePicker from "@/components/ThemePicker";
import { H1 } from "@/components/typografy/h1";

function Home() {
  return (
    <div className="anim_gradient h-screen flex flex-col justify-center items-center">
      <div className="absolute top-4 right-4">
        <ThemePicker />
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center space-y-10 lg:space-y-0 lg:space-x-10">
        <H1 className="text-white">Progetto AI</H1>
        <Separator
          orientation="vertical"
          className="hidden lg:block h-[50vh] w-0.5"
        />
        <Card className="hover:drop-shadow-lg lg:min-h-[20vh] max-h-[30vh] w-[30vh]">
          <CardHeader>
            <CardTitle>Ricerca TPSI</CardTitle>
            <CardDescription>
              Clicca qui per visualizzare la ricerca
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link
              to="/tpsi"
              className={buttonVariants({
                variant: "default",
                size: "icon",
              })}
            >
              <MoveRight />
            </Link>
          </CardFooter>
        </Card>
        <Card className="hover:drop-shadow-lg lg:min-h-[20vh] max-h-[30vh] w-[30vh]">
          <CardHeader>
            <CardTitle>Playground AI</CardTitle>
            <CardDescription>
              Clicca qui per provare l'intelligenza artificiale
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link
              to="/playground"
              className={buttonVariants({
                variant: "default",
                size: "icon",
              })}
            >
              <MoveRight />
            </Link>
          </CardFooter>
        </Card>
        <Card className="hover:drop-shadow-lg lg:min-h-[20vh] max-h-[30vh] w-[30vh]">
          <CardHeader>
            <CardTitle>ChatGame</CardTitle>
            <CardDescription>
              Clicca qui per provare un altro esempio di AI
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <a href="https://chatgame.5cimicheleporcellato.barsanti.edu.it" className={buttonVariants({
                variant: "default",
                size: "icon",
              })}>
              <MoveRight />
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Home;
