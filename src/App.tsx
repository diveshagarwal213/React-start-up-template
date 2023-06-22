import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//css
import "./App.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Core from "./Core";

//RQ
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Core />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
