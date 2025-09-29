import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContextProvider";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, backendUrl } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if page was refreshed
    const isRefresh = performance.navigation && performance.navigation.type === 1;
    if (isRefresh) {
      // Redirect to home page on refresh
      navigate('/', { replace: true });
      return;
    }

    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          if (!productData) return null; // skip if product not found

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                {(() => {
                  const candidate = Array.isArray(productData.images)
                    ? productData.images[0]
                    : Array.isArray(productData.image)
                    ? productData.image[0]
                    : productData.image;
                  const isAbsolute = typeof candidate === 'string' && /^https?:\/\//i.test(candidate);
                  const imgSrc = candidate
                    ? isAbsolute
                      ? candidate
                      : `${backendUrl}${candidate.startsWith('/') ? '' : '/'}${candidate}`
                    : 'https://via.placeholder.com/100';
                  return (
                    <img
                      className="w-16 sm:w-20 object-cover rounded"
                      src={imgSrc}
                      alt={productData.name || 'product'}
                      onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/100')}
                    />
                  );
                })()}
                <div>
                  <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                  </div>
                </div>
              </div>

              <input
                type="number"
                min={1}
                defaultValue={item.quantity}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(item._id, item.size, Number(e.target.value))
                }
              />

              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="remove"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
