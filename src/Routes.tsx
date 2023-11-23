import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import { WelcomePage } from './pages/Welcome';

const router = createBrowserRouter([
    {
        path: 'welcome',
        element: <WelcomePage />,
    },
]);

export function Routes() {
    return <RouterProvider router={router} />;
}