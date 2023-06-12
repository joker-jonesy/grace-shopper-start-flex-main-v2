{
    !!auth.id && cart.lineItems.find((item) => item.productId === product.id) && <button onClick={() => dispatch(removeFromCart({product, quantityToRemove:1}))}>Remove From Cart</button>
}