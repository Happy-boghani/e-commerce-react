import React, { useState } from "react";
import { products } from "../../fakeData/cartproducts";

const Cart = () => {
  const [productList, setProductList] = useState(
    products.map((x) => {
      return {
        ...x,
        quantity: 1,
        totalPrice: x.price,
      };
    })
  );

  const handleDecrease = (id) => {
    setProductList((prevProduct) =>
      prevProduct.map((product) =>
        product.id === id && product.quantity > 1
          ? {
              ...product,
              quantity: product.quantity - 1,
              totalPrice: (product.price * (product.quantity - 1)).toFixed(2),
            }
          : product
      )
    );
  };

  const handleIncrease = (id) => {
    setProductList((prevProduct) =>
      prevProduct.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: product.quantity + 1,
              totalPrice: (product.price * (product.quantity + 1)).toFixed(2),
            }
          : product
      )
    );
  };

  const deleteProductCart = (id) => {
    const newData = productList.filter(x => x.id !== id)
    setProductList([...newData])
  }

  return (
    <>
      
        <div className="block lg:flex items-center justify-between px-5 lg:px-10 pt-9">
          <div>
            <div className="text-2xl font-semibold">Shopping Cart</div>
            <div className="text-lg pt-2">
              <b>Items </b> {productList.length}
            </div>
          </div>
          <div className="bg-sky-200 rounded-xl p-6 flex lg:min-w-[300px] justify-between mt-5 lg:mt-0">
            <div className="font-semibold text-lg ">
              Total Price (Tax inc.){" "}
            </div>
            <div className="font-semibold text-lg ">
              $
              {productList?.reduce((accum, curr) => accum + Number(curr.totalPrice), 0)
                .toFixed(2)}{" "}
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-8 px-5 lg:px-10">
          <div className="mt-10 border border-blue-100 shadow-lg rounded-xl p-3">
           {productList.length > 0 ?    <table className="table-auto w-full">
              <thead className="h-[50px] text-xl">
                <tr>
                  <th className="text-center">Product</th>
                  <th className="text-start">Price</th>
                  <th className="text-start">Quantity</th>
                  <th className="text-start">Total</th>
                  <th className="text-start">Action</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((_ele, index) => {
                  return (
                    <tr key={index} className="border-b-2 border-b-blue-200">
                      <td className="flex items-center justify-start gap-4 my-5">
                        <img
                          src={_ele.image}
                          className="w-[150px] h-[200px] rounded-lg"
                        />
                        <div>
                          <div className="text-gray-500 font-medium">
                            {_ele.category}
                          </div>
                          <div className="pt-3 font-semibold">{_ele.name}</div>
                        </div>
                      </td>
                      <td className="font-semibold">${_ele.price}</td>
                      <td>
                        <div className="flex items-center">
                          <button
                            className="flex items-center justify-center text-black text-lg h-6 w-6 border border-gray-500 rounded-lg"
                            onClick={() => handleDecrease(_ele.id)}
                          >
                            -
                          </button>
                          <span className="px-3">{_ele.quantity}</span>
                          <button
                            className="flex items-center justify-center text-black text-lg h-6 w-6 border border-gray-500 rounded-lg"
                            onClick={() => handleIncrease(_ele.id)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="font-semibold">${_ele.totalPrice}</td>
                      <td>
                        <button className="bg-gray-300 px-6 py-1 rounded-lg" onClick={() => deleteProductCart(_ele.id)}> Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table> : <>
              <h1 className="text-3xl text-center">Your cart is empty</h1>
            </>}
         
          </div>
        </div>
    </>
  );
};

export default Cart;
