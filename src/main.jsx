import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './redux/store/store.js'
import { Provider } from 'react-redux'
import { CartProvider } from './context/cartContext.jsx';
import { FavoriteProvider } from './context/favoriteContext.jsx'



createRoot(document.getElementById('root')).render(

  <StrictMode>
  
        <FavoriteProvider>
    <CartProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CartProvider>
    </FavoriteProvider>

  </StrictMode>,
)
