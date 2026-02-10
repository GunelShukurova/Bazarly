import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ROUTES from './routes';
import { SnackbarProvider } from 'notistack';


const routes = createBrowserRouter(ROUTES, {
  basename: import.meta.env.BASE_URL,
});

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
