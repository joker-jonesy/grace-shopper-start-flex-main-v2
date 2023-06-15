import React, { useState } from 'react'
import RemoveFromCartButton from './RemoveFromCartButton'
import { useDispatch } from 'react-redux'
import { updateCartQuantity } from '../store'

const CartItem = ({ product }) => {
    const [quantity, setQuantity] = useState(product.quantity)
    const dispatch = useDispatch()

    const handleQuantityIncrement = () => {
        
        
        const updatedCart = {
                product, 
                quantity: parseInt(quantity) + 1
            }
        

        dispatch(updateCartQuantity(updatedCart))

        setQuantity(quantity + 1)
    }

    const handleQuantityDecrement = () => {
        
        
        const updatedCart = {
                product, 
                quantity: parseInt(quantity) - 1
            }
        

        dispatch(updateCartQuantity(updatedCart))

        setQuantity(quantity - 1)
    }
    return (
        <div className="card glass m-4 w-64 sm:card-normal card-compact">
            <div className="card-body p-2">
                <img src={product.product.imageURL} alt={product.product.name} className="mask-square aspect-square h-full w-full"/>
              <span>{product.product.name}</span>
              <span className= "badge badge-ghost">
                <span className="text-lg font-bold">$</span><span className="font-bold">{product.product.price}</span>
              </span>
              <button onClick={handleQuantityIncrement}>+</button>
              <span>
                {quantity}
                 
                {/* type="number"
                min={1}
                max={product.product.quantity}
                step="1"
                value={quantity}
                onChange={((event) => handleQuantityChange(event))} */}
            
              </span>
              <button onClick={handleQuantityDecrement}>-</button>
              <RemoveFromCartButton product={product} quantity={product.quantity}/>
            </div>
        </div>
    )
}

export default CartItem
