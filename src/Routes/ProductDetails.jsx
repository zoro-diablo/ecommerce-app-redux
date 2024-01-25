import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProductOverviews from '../components/ProductOverviews';

const ProductDetails = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <div>
        <Navbar />
        <ProductOverviews />
    </div>
  )
}
export default ProductDetails