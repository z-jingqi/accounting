import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Transactions from './pages/transactions';
import Categories from './pages/categories';
import Reports from './pages/reports';
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'transactions',
        element: <Transactions />,
      },
      {
        path: 'categories',
        element: <Categories />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
