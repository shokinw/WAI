import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../config';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const KNOWN_STATUSES = [
  'Order Placed',
  'Packing',
  'Shipped',
  'Out for delivery',
  'Delivered',
];

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [selected, setSelected] = useState({}); // { [orderId]: boolean }
  const [hiddenIds, setHiddenIds] = useState(() => {
    try {
      const raw = localStorage.getItem('admin_hidden_orders');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const persistHidden = (ids) => {
    setHiddenIds(ids);
    try { localStorage.setItem('admin_hidden_orders', JSON.stringify(ids)); } catch {}
  };

  // Fetch all orders
  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders([...response.data.orders].reverse()); // avoid mutating array
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Update order status
  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { token } }
      );

      if (response.data.success) {
        // Optimistically update state
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        toast.success('Order status updated!');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Derived, filtered, and visible orders
  const visibleOrders = useMemo(() => {
    const list = orders.filter(o => !hiddenIds.includes(o._id));
    if (activeTab === 'All') return list;
    if (activeTab === 'Else') return list.filter(o => !KNOWN_STATUSES.includes(o.status));
    return list.filter(o => o.status === activeTab);
  }, [orders, hiddenIds, activeTab]);

  const allVisibleIds = useMemo(() => visibleOrders.map(o => o._id), [visibleOrders]);
  const allSelectedOnView = useMemo(
    () => allVisibleIds.length > 0 && allVisibleIds.every(id => selected[id]),
    [allVisibleIds, selected]
  );

  // Selection handlers
  const toggleSelect = (id) => setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleSelectAllOnView = () => {
    setSelected(prev => {
      const next = { ...prev };
      const targetValue = !allSelectedOnView;
      allVisibleIds.forEach(id => { next[id] = targetValue; });
      return next;
    });
  };

  // Soft-cancel (hide) handlers
  const cancelOne = (id) => {
    if (!window.confirm('Hide this order from admin view? This will not delete from database.')) return;
    const next = [...hiddenIds, id];
    persistHidden([...new Set(next)]);
  };

  const cancelSelected = () => {
    const ids = Object.entries(selected).filter(([, v]) => v).map(([k]) => k);
    if (ids.length === 0) return toast.info('Select at least one order');
    if (!window.confirm(`Hide ${ids.length} selected order(s) from admin view?`)) return;
    persistHidden([...new Set([...hiddenIds, ...ids])]);
    setSelected({});
  };

  const cancelAllInTab = () => {
    if (visibleOrders.length === 0) return;
    if (!window.confirm(`Hide all ${visibleOrders.length} order(s) in current view?`)) return;
    persistHidden([...new Set([...hiddenIds, ...visibleOrders.map(o => o._id)])]);
    setSelected({});
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Order Page</h3>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['All', ...KNOWN_STATUSES, 'Else'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-full border text-sm ${activeTab === tab ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bulk actions */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
            <input type="checkbox" checked={allSelectedOnView} onChange={toggleSelectAllOnView} />
            <span>Select all in view</span>
          </label>
          <button onClick={cancelSelected} className="px-3 py-1.5 text-sm rounded border bg-white hover:bg-gray-50">Hide selected</button>
          <button onClick={cancelAllInTab} className="px-3 py-1.5 text-sm rounded border bg-white hover:bg-gray-50">Hide all in view</button>
        </div>
        <p className="text-sm text-gray-600">Showing {visibleOrders.length} of {orders.length}</p>
      </div>

      {/* Scrollable list */}
      <div className="max-h-[70vh] overflow-auto pr-1">
        {visibleOrders.map(order => (
          <div
            key={order._id}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
          >
            <div className="flex items-start gap-3">
              <input type="checkbox" checked={!!selected[order._id]} onChange={() => toggleSelect(order._id)} className="mt-1" />
              <img className="w-12" src={assets.parcel_icon} alt="parcel" />
            </div>

            <div>
              <div>
                {order.items.map((item, idx) => (
                  <p className="py-0.5" key={idx}>
                    {item.name} x {item.quantity} {item.size && `(${item.size})`}
                    {idx < order.items.length - 1 && ','}
                  </p>
                ))}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div>
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>

            <div>
              <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
              <p className="mt-3">Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <p className="text-sm sm:text-[15px]">{currency}{order.amount}</p>

            <div className="flex flex-col gap-2">
              <select
              onChange={event => statusHandler(event, order._id)}
              value={order.status}
              className="p-2 font-semibold border rounded"
              >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
              </select>
              <button onClick={() => cancelOne(order._id)} className="p-2 border rounded hover:bg-gray-50">Hide</button>
            </div>
          </div>
        ))}
        {visibleOrders.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500">No orders to show in this view.</div>
        )}
      </div>
    </div>
  );
};

export default Orders;
