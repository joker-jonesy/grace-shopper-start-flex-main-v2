export const cartTotal = (cartArr) => {
    let total = 0
    for (const item of cartArr) {
        total += (parseInt(item.product.price) * item.quantity)
    }
    return total
}

export const cartQuantity = (cartArr) => {
    let quantity = 0
    for (const item of cartArr) {
        quantity += item.quantity
    }
    return quantity
}