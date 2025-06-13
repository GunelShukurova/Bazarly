import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ROUTES from './routes';
import { SnackbarProvider } from 'notistack';


const routes = createBrowserRouter(ROUTES);

function App() {


  return (
    <>
       <SnackbarProvider>
         <RouterProvider router={routes} />
       </SnackbarProvider>
   
        
    </>
  )
}

export default App
