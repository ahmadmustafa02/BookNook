// Cards.jsx
import React from 'react'

function Cards({ item }) {
  return (
    <div className="mt-10 p-4 w-full">
      <div className="card shadow-xl hover:scale-105 duration-200 dark:bg-slate-700 max-w-sm mx-auto">
        <figure>
          <img
            src={item.image}
            alt="Shoes"
            className="w-full h-auto" />
        </figure>
        <div className="card-body dark:text-white">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary">{item.category}</div>
          </h2>
          <p className="dark:text-gray-300">{item.title}</p>
          <div className="card-actions flex justify-between">
            <div className="badge badge-outline dark:text-gray-300 dark:border-gray-300">${item.price}</div>
            <div className="cursor-pointer px-2 py-1 rounded-full hover:bg-pink-500 hover:text-white duration-200">Buy Now</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards