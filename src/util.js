export const cartTotal = (cartArr) => {
    let total = 0
  if (!cartArr) return total
    console.log(cartArr)
    if(cartArr.length > 0){
        for (let item of cartArr) {
          total += parseInt(item.product.price) * item.quantity
        }
    }
    return total
}

export const cartQuantity = (cartArr) => {
    let quantity = 0
  if (!cartArr) return quantity
    if (cartArr.length > 0){
        for (let item of cartArr) {
          quantity += item.quantity
        }
    }
    return quantity
}


export const getAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0
  const sum = reviews.reduce((acc, review) => {
    return acc + review.rating
  }, 0)
  return Math.floor(sum / reviews.length)
}