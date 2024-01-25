import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import Error from './Error';
import { addItem } from '../redux/features/cartSlice';

const Product = () => {
  const { data, loading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  if (loading === 'loading') {
    return (
      <div className=''>
        <Loading />
      </div>
    );
  }
  if (error) {
    return (
      <div className=''>
        <Error />
      </div>
    );
  }

  const addTo = (list) => {
    dispatch(addItem(list));
  };

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8'>
        <h2 className='sr-only'>Products</h2>
        <div className='grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {data &&
            data.map((list) => (
              <Link
                to={`/product/${list.id}`}
                key={list.id}
                onClick={() => {
                  addTo(list);
                }}
              >
                <div key={list.id} className='group cursor-pointer'>
                  <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
                    <img
                      src={list.images[0]}
                      alt={list.images[1]}
                      className='h-full w-full object-cover object-center group-hover:opacity-75 '
                    />
                  </div>
                  <h3 className='mt-4 text-sm text-gray-700'>{list.title}</h3>
                  <p className='mt-1 text-lg font-medium text-gray-900'>
                    {list.price} $
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Product;
