import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateQuantity, removeFromCart } from '../../redux/features/cart/cartSlice';
import { CldImage } from 'next-cloudinary';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { RootState } from '@/store/store';
import { cartService } from '@/utils/cart/cartApi';
import { user } from '@nextui-org/react';

const CartItems = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth.user);
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 100) {
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = async (productId: number)  => {
    dispatch(removeFromCart(productId));
    await cartService.removeFromCart(user?.id ?? 0, productId);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center p-4 border-b last:border-b-0"
        >
          <div className="w-24 h-24 flex-shrink-0">
            <CldImage
              src={item.image}
              width={96}
              height={96}
              alt={item.name}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="ml-4 flex-grow">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600">
              {Number(item.price.replace(/[^0-9.-]+/g, '')).toLocaleString(
                'vi-VN'
              )}
              đ
            </p>
            <div className="flex items-center mt-2">
              <button
                className="p-1 rounded border"
                onClick={() =>
                  handleQuantityChange(item.product_id, item.quantity - 1)
                }
              >
                <FaMinus className="w-3 h-3" />
              </button>
              <span className="mx-4">{item.quantity}</span>
              <button
                className="p-1 rounded border"
                onClick={() =>
                  handleQuantityChange(item.product_id, item.quantity + 1)
                }
              >
                <FaPlus className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="ml-4">
            <p className="font-semibold text-right">
              {(
                Number(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity
              ).toLocaleString('vi-VN')}
              đ
            </p>
            <button
              onClick={() => handleRemoveItem(item.product_id)}
              className="mt-2 text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;