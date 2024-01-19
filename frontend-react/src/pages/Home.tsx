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
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import "./App.css";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { useTypewriter, Cursor } from "react-simple-typewriter";

function Home() {
  const { setTheme } = useTheme();
  const [text] = useTypewriter({
    words: ["Progetto", "Intelligenza", "Artificiale"],
    loop: false,
    typeSpeed: 120,
    delaySpeed:80,
  });
  
  return (
    <div className="anim_gradient">
      <div className="absolute right-0 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-white" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col h-screen items-center justify-center">
        <div className="flex flex-row items-center justify-self-center h-screen">
          <h1 className="text-5xl m-16 fixed left-0">
            <span style={{ fontWeight: "bold", color: "white" }}>{text}</span>
            <span style={{ color: "#EFE7DA" }}>
              <Cursor cursorStyle="<" />
            </span>
          </h1>
          <div className="flex items-center space-x-10 fixed right-10">
            <Separator orientation="vertical" className="h-[50vh] w-0.5 absolute"/>
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
                  className={buttonVariants({
                    variant: "default",
                    size: "icon",
                  })}
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
                  className={buttonVariants({
                    variant: "default",
                    size: "icon",
                  })}
                >
                  <MoveRight />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
