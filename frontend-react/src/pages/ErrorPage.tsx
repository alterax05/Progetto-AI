import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1><b>Oops!</b></h1>
      <p>Scusa, è accaduto un errore inaspettato.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;