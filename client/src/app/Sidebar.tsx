import React from 'react';

interface SidebarProps {
  pizza: string;
  total: number;
  tax: number;
  onPlaceOrder: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ pizza, total, tax, onPlaceOrder }) => {
  return (
    <div className="sidebar">
      <h2>Cart</h2>
      <div>
        <h3>Chosen Pizza:</h3>
        <p>{pizza}</p>
      </div>
      <div>
        <h3>Total Price:</h3>
        <p>{total}</p>
      </div>
      <div>
        <h3>Tax (GST):</h3>
        <p>{tax}</p>
      </div>
      <button onClick={onPlaceOrder}>Place Order</button>
    </div>
  );
};

export default Sidebar;

