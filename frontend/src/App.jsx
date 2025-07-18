import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import Services from './pages/Services';
import NotFound from './components/NotFound';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Plans from './pages/Plans';
import Profile from './pages/Profile';
import Questionnaire from './pages/Questionnaire';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/AdminDashboard';
import AdminRequestDetail from './pages/AdminRequestDetail';

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
      path: '/plans',
      element: <Plans />
    },
    {
      path: '/profile',
      element: <Profile />
    },
    {
      path: '/user-profile',
      element: <UserProfile />
    },
    {
      path: '/questionnaire',
      element: <Questionnaire />
    },
    {
      path: '/admin-dashboard',
      element: <ProtectedRoute><AdminDashboard /></ProtectedRoute>
    },
    {
      path: '/admin/user/:id',
      element: <ProtectedRoute><AdminRequestDetail /></ProtectedRoute>
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
