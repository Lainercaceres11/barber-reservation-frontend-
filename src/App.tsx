import { ViewTransition } from "react";
import "./App.css";
import { AuthProvider } from "./context/auth-context";
import QueryProvider from "./providers/query-provider";
import RoutesApp from "./routes/route";
import { Toaster } from "./components/ui/toast";

function App() {
  return (
    <ViewTransition>
      <QueryProvider>
        <AuthProvider>
          <RoutesApp />
          <Toaster />
        </AuthProvider>
      </QueryProvider>
    </ViewTransition>
  );
}

export default App;
