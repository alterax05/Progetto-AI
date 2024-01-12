import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex items-center space-x-10">
      <h1 className="text-5xl m-16">
        <b>Progetto AI</b>
      </h1>
      <div className="flex flex-row items-center justify-center min-h-screen">
        <Card className="hover:drop-shadow-lg">
          <CardHeader>
            <CardTitle>Ricerca TPSI</CardTitle>
            <CardDescription>
              Clicca qui per visualizzare la ricerca
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4"></CardContent>
          <CardFooter className="flex justify-end">
            <Link
              to="/tpsi"
              className={buttonVariants({ variant: "default", size: "icon" })}
            >
              <MoveRight />
            </Link>
          </CardFooter>
        </Card>
        <Card className="hover:drop-shadow-lg">
          <CardHeader>
            <CardTitle>Ricerca Gestione Progetto</CardTitle>
            <CardDescription>
              Clicca qui per visualizzare la ricerca
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4"></CardContent>
          <CardFooter className="flex justify-end">
            <Link
              to="/progetto"
              className={buttonVariants({ variant: "default", size: "icon" })}
            >
              <MoveRight />
            </Link>
          </CardFooter>
        </Card>
        <Card className="hover:drop-shadow-lg">
          <CardHeader>
            <CardTitle>Playground AI</CardTitle>
            <CardDescription>
              Clicca qui per provare l'intelligenza artificiale
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4"></CardContent>
          <CardFooter className="flex justify-end">
            <Link
              to="/playground"
              className={buttonVariants({ variant: "default", size: "icon" })}
            >
              <MoveRight />
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Home;
