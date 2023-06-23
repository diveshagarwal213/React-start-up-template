import { useRouteError } from "react-router-dom";

type RouteError = {
  status?: number;
  statusText?: string;
  message?: string;
  internal: boolean;
  data?: unknown;
  error?: { message?: string };
};

export default function PageNotFound() {
  const error = useRouteError() as RouteError;
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.error?.message}</i>
      </p>
    </div>
  );
}
