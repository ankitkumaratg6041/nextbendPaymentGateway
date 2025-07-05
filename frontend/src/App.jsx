import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import Services from './components/Services';
import NotFound from './components/NotFound';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/services" replace/>,
      errorElement: <NotFound />
    },
    {
      path: '/services',
      element: <Services />
    }
  ]);
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
