import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { closeCart, removeFromBag } from '../redux/features/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addToBag, clearBag } from '../redux/features/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const bagItems = useSelector((state) => state.cart.bag);
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    dispatch(closeCart());
    setOpen(false);
  };

  const deleteItem = (id) => {
    dispatch(removeFromBag(id));
  };

  const addItemToCart = (product) => {
    dispatch(addToBag(product));
  };

  const total = bagItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                    <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                      <div className='flex items-start justify-between'>
                        <Dialog.Title className='text-lg font-medium text-gray-900'>
                          Shopping cart
                        </Dialog.Title>
                        <div className='ml-3 flex h-7 items-center'>
                          <button
                            type='button'
                            className='relative -m-2 p-2 text-gray-400  hover:text-gray-500'
                            onClick={() => dispatch(closeCart())}
                          >
                            <span className='absolute -inset-0.5' />
                            <span className='sr-only'>Close panel</span>
                            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                          </button>
                        </div>
                      </div>

                      <div className='mt-8'>
                        <div className='flow-root'>
                          <ul
                            role='list'
                            className='-my-6 divide-y divide-gray-200'
                          >
                            {bagItems.map((product) => (
                              <li key={product.id} className='flex py-6'>
                                <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                  <img
                                    src={product.images[0]}
                                    alt={product.images[1]}
                                    className='h-full w-full object-cover object-center'
                                  />
                                </div>

                                <div className='ml-4 flex flex-1 flex-col'>
                                  <div>
                                    <div className='flex justify-between text-base font-medium text-gray-900'>
                                      <h3>
                                        <a href={product.href}>
                                          {product.title}
                                        </a>
                                      </h3>
                                      <p className=' ml-4 flex'>{product.price}$</p>
                                    </div>
                                    <p className='mt-1 text-sm text-gray-500'>
                                      {product.color}
                                    </p>
                                  </div>
                                  <div className='flex flex-1 items-end justify-between text-sm'>
                                    <p className='text-gray-500'>
                                      Qty {product.quantity}
                                    </p>

                                    <div className='flex gap-x-10'>
                                      <button
                                        onClick={() => addItemToCart(product)}
                                        type='button'
                                        className='font-medium text-indigo-600 hover:text-indigo-500'
                                      >
                                        Add
                                      </button>
                                      <button
                                        onClick={() => deleteItem(product.id)}
                                        type='button'
                                        className='font-medium text-indigo-600 hover:text-indigo-500'
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div onClick={()=>dispatch(clearBag())} className='m-4 font-medium text-indigo-600 flex justify-end cursor-pointer'>
                      Clear all
                    </div>
                    <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                      <div className='flex justify-between text-base font-medium text-gray-900'>
                        <p>Subtotal</p>
                        <p>${total}</p>
                      </div>
                      <p className='mt-0.5 text-sm text-gray-500'>
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className='mt-6'>
                        <a
                          href='#'
                          className='flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-300 hover:text-black'
                        >
                          Checkout
                        </a>
                      </div>
                      <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                        <p>
                          or{' '}
                          <button
                            type='button'
                            className='font-medium text-indigo-600 hover:text-indigo-500'
                            onClick={() => dispatch(closeCart())}
                          >
                            Continue Shopping
                            <span aria-hidden='true'> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Cart;
