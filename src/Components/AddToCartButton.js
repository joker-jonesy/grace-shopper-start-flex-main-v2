import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, addToGuestCart } from "../store"
import { useToast } from "../hooks/useToast"

const AddToCartButton = (props) => {
    const {auth} = useSelector(state => state)
    const dispatch = useDispatch()
    const { notify } = useToast()

    const handleAddToCart = () => {
        if(auth.id){
            dispatch(addToCart(props))
        }else{
            dispatch(addToGuestCart(props))
        }
        notify("Added to cart", "success")
    }
    return (
        <div className="flex w-full flex-row-reverse p-2">
            <button
                onClick={() => handleAddToCart()}
                className="btn-secondary btn-sm btn text-base-300"
            >
                Add to Cart
            </button>
        </div>
    )
}

export default AddToCartButton
