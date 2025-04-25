import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import TransactionsPage from "./pages/TransactionsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <TransactionsPage />,
      },
      {
        path: "/transactions",
        element: <TransactionsPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
