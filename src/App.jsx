import { Route, Routes } from 'react-router-dom';
import Home from './Routes/Home';
import ProductDetails from './Routes/ProductDetails';
import { ToastContainer } from 'react-toastify';
import NotFound from './Routes/NotFound';

function App() {
  return (
    <div>
      <ToastContainer
        position='bottom-right'
        theme='dark'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
