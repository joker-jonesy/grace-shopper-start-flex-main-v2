import React from "react"
import { useDispatch } from "react-redux";
import { addToCart } from "../store";

const AddToCartButton = (props) => {
    const dispatch = useDispatch()
    return (        
                <div className="flex flex-row-reverse w-full p-2">
                    <button  onClick={() => dispatch(addToCart(props))} className="btn-secondary btn-sm btn text-base-300">
                        Add to Cart
                    </button>
                </div>
            )
}

export default AddToCartButton