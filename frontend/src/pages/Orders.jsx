import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContextProvider';
import Title from '../components/Title';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    // Check if page was refreshed
    const isRefresh = performance.navigation && performance.navigation.type === 1;
    if (isRefresh) {
      // Redirect to home page on refresh
      navigate('/', { replace: true });
      return;
    }
    
    loadOrderData();
  }, [token, navigate]);

  // ✅ Safe image accessor with backend prefix
  const getImageUrl = (image) => {
    const candidate = Array.isArray(image) ? image[0] : image;
    if (!candidate) return 'https://via.placeholder.com/150';
    const isAbsolute = /^https?:\/\//i.test(candidate);
    return isAbsolute ? candidate : `${backendUrl}${candidate.startsWith('/') ? '' : '/'}${candidate}`;
  };

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orderData.length === 0 ? (
          <div className="mt-6 p-6 border rounded-lg bg-white/70">
            <p className="text-gray-600">You have no orders yet.</p>
            <p className="text-gray-400 text-sm mt-1">Start exploring and add items to your cart!</p>
          </div>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-white/60"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  className="w-16 sm:w-20 object-cover"
                  src={getImageUrl(item.image)}
                  alt={item.name || 'Order item'}
                />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p>
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-1">
                    Date:{' '}
                    <span className="text-gray-400">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                  <p className="mt-1">
                    Payment:{' '}
                    <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button
                  onClick={loadOrderData}
                  className="border px-4 py-2 text-sm font-medium rounded-sm hover:border-pink-400 hover:text-pink-600"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
