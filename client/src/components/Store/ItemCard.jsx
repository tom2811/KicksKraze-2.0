import React from 'react';

function ItemCard({ item }) {
  return (
    <div className="item-card">
      <img src={item.imgUrl} alt={item.name} />
      <h3>{item.name}</h3>
      <p>${item.price.toFixed(2)}</p>
      <p>{item.colorway}</p>
    </div>
  );
}

export default ItemCard;
