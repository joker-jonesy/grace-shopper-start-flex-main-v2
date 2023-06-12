import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../store'

const RemoveFromCartButton = (props) => {
    const dispatch = useDispatch()
    return (
        <div className="flex flex-row-reverse w-full p-2">
            <button onClick={() => dispatch(removeFromCart(props))}className="bg-red-500 btn-danger btn-sm btn text-base-300">
                Remove From Cart
            </button>
        </div>
    )
}

export default RemoveFromCartButton


// dispatch(removeFromCart({product, quantityToRemove:1}))}
