import { Route, Routes } from "react-router-dom";
import "./App.css";
import Products from "./page/posts";
import QueryProvider from "./providers/react-query-provider";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";
import { Loading } from "./components/loading/loading";

const Post = lazy(() => import("./page/post"));

function App() {
  return (
    <QueryProvider>
      <Provider store={store}>
        <Toaster />
        <Routes>
          <Route
            path='/'
            element={<Products />}
          />
          <Route
            path='/post/:id'
            element={
              <Suspense
                fallback={
                  <Loading
                    type='spinner'
                    variant='accent'
                  />
                }>
                <Post />
              </Suspense>
            }
          />
        </Routes>
      </Provider>
    </QueryProvider>
  );
}

export default App;
