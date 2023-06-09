import React, {useState} from 'react'

const checkoutPage = () => {

  const {auth, cart} = useSelector(state => state);

  const [orderInfo, setOrderInfo] = useState(
    {
      address: {
        firstName : "",
        lastName : "",
        street: "",
        city: "",
        state: "",
        zip: "",
      },
      ccInfo: {
        number: "",
        exp: "",
        ccv: ""
      },
      cartId: "",
      userId: "",
    }
  )

  return (
    <div>

    </div>
  )
}
