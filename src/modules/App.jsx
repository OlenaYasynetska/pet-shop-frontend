import Navigation from "../pages/Navigation";
import Footer from "../modules/Footer/Footer";
import Header from '../modules/Header/Header';
import { CartProvider } from '../shared/context/CartContext';

import '../shared/styles/style.css';

function App() {
  

  return (
    <CartProvider>
      <Header />
      <Navigation />
      <Footer />
    </CartProvider>
  )
}

export default App;
