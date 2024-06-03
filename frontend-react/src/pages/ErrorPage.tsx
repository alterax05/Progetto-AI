import { H1 } from "@/components/typografy/h1";
import { P } from "@/components/typografy/p";
function ErrorPage() {
  return (
    <div id="error-page" className="anim_gradient flex items-center justify-center min-h-screen flex-col">
      <H1 className="text-white"><b>Oops!</b></H1>
      <P className="text-white">Scusa, ma la pagina che hai cercato non esiste ಥ_ಥ</P>
    </div>
  );
}

export default ErrorPage;