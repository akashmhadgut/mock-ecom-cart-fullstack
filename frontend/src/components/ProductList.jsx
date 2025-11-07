import React from "react";

const ProductList = ({ products, handleAdd, handleDecrease, cart, user }) => {
  const getQty = (productId) => {
    const item = cart.items.find((i) => i.productId._id === productId);
    return item ? item.qty : 0;
  };

  return (
    <div className="py-10 px-4 bg-gray-50">
      <h2 className="text-center mb-10 text-3xl font-semibold text-gray-800 tracking-wide">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => {
          const qty = getQty(p._id);

          return (
            <div
              key={p._id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Product Image */}
                        {/* Product Image */}
            <div className="w-full h-64 flex items-center justify-center overflow-hidden rounded-t-lg bg-gray-100 group">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>


              {/* Product Details */}
              <div className="p-4 flex flex-col flex-grow">
                {/* Name with fixed display height */}
                <h5 className="text-base font-semibold text-gray-800 line-clamp-2 min-h-[48px]">
                  {p.name}
                </h5>

                

                {/* Price Always in same place */}
                <p className="text-lg font-bold text-gray-900 mb-4">₹{p.price}</p>

                {/* Cart Buttons */}
                <div className="mt-auto">
                  {user ? (
                    qty > 0 ? (
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={() => handleDecrease(p._id)}
                          className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                        >
                          −
                        </button>

                        <span className="text-gray-800 font-semibold text-lg">
                          {qty}
                        </span>

                        <button
                          onClick={() => handleAdd(p._id)}
                          className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAdd(p._id)}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                      >
                        Add to Cart
                      </button>
                    )
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-300 text-gray-600 py-2 rounded-lg cursor-not-allowed"
                    >
                      Login to Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
