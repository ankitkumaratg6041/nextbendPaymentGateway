import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import Services from './pages/Services';
import NotFound from './components/NotFound';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import SignupPage from './pages/Signup';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/services" replace/>,
      errorElement: <NotFound />
    },
    {
      path: '/services',
      element: (
        <ProtectedRoute>
          <Services />
        </ProtectedRoute>
      )
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: "*",
      element: <NotFound />
    },
  ]);
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
