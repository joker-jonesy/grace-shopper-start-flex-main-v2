import React, { useState } from "react"

function CreditCardForm({ onValidate }) {
  const [card, setCard] = useState({
    name: "",
    cc: "",
    expire: "",
    cvv: "",
  })
  const [isValid, setIsValid] = useState(false)

  const handleInputChange = (event) => {
    if (event.target.name === "cc" && event.target.value.length === 16) {
      setIsValid(true)
    }

    setCard({
      ...card,
      [event.target.name]: event.target.value,
    })
  }

  const handleValidate = () => {
    if (isValid) {
      onValidate(card)
    } else {
      notify("Card Invalid", "error")
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="space-y-16">
        <div className="relative m-auto h-56 w-96 transform rounded-xl bg-red-100 text-white shadow-2xl transition-transform hover:scale-110">
          <img
            className="relative h-full w-full rounded-xl object-cover"
            src="https://i.imgur.com/kGkSg1v.png"
          />

          <div className="absolute top-8 w-full px-8">
            <div className="flex justify-between">
              <div className="">
                <p className="font-light">Name</p>
                <input
                  type="text"
                  placeholder="Yo Momma"
                  name="name"
                  className="input-bordered input  input-xs font-medium tracking-widest"
                  onChange={handleInputChange}
                />
              </div>
              <img
                className="h-14 w-14"
                src="https://i.imgur.com/bbPHJVe.png"
              />
            </div>
            <div className="pt-1">
              <p className="font-light">Card Number</p>
              <input
                type="number"
                placeholder="4642  3489  9867  7632"
                name="cc"
                className={`tracking-more-wider input-bordered input input-xs font-medium ${
                  isValid ? "input-success" : "input-error"
                }`}
                onChange={handleInputChange}
              />
              {isValid ? (
                <p className="text-xs text-green-500">Card Valid</p>
              ) : (
                <p className="text-xs text-red-500">Card Invalid</p>
              )}
            </div>
            <div className="pr-6 pt-6">
              <div className="flex justify-between">
                <div className="">
                  <p className="text-xs font-light">Expiry</p>
                  <input
                    className="input-bordered input input-xs w-1/2 text-sm font-medium"
                    onChange={handleInputChange}
                    placeholder="03/25"
                    type="text"
                    name="expire"
                  />
                </div>

                <div className="">
                  <p className="text-xs font-light">CVV</p>
                  <input
                    className="input-bordered input input-xs w-1/2 text-sm font-bold"
                    onChange={handleInputChange}
                    placeholder="···"
                    name="cvv"
                  />
                </div>
                <button className="btn-accent btn" onClick={handleValidate}>
                  Validate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreditCardForm
