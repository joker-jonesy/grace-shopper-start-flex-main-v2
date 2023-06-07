import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { Products } from "./Products";

const Landing = () => {
  const {auth, products} = useSelector(state=>state)

  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(()=>{
    setPopularProducts(products.slice(0, 4))
  },[products])


  
  return (
    <div className="">
      <div className="flex justify-center">
        <div className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-8xl font-extrabold text-transparent ">
          Faker Web Store
        </div>
      </div>
      <p className="flex w-10/12 justify-center text-center m-auto mt-2 mb-2">
        About: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni
        aliquid, delectus, illum illo id atque libero deleniti enim eius
        perferendis et! Expedita excepturi perspiciatis similique ipsum amet
        totam nulla sapiente!
      </p>
      <h1 className="flex justify-center text-4xl">Popular Products</h1>
      <Products currentProducts={popularProducts} />
    </div>
  )
}

export default Landing