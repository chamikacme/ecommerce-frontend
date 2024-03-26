import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import LoadingPage from "./pages/common/LoadingPage";
import router from "./routes/Routes";
import useAuthStore from "./store/authStore";
import useLoadingStore from "./store/loadingStore";

function App() {
  const isLoading = useAuthStore((state) => state.isLoading);
  const isPageLoading = useLoadingStore((state) => state.isPageLoading);

  useEffect(() => {
    useAuthStore.getState().loadSession();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <RouterProvider router={router} />
      {isPageLoading && (
        <div className="fixed top-0 left-0 bg-slate-600 bg-opacity-50 z-50">
          <LoadingPage />
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default App;
