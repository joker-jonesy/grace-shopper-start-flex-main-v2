import React from 'react'
import { HeartIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useToast } from '../../hooks/useToast'

function WishListButton() {
    const { user } = useSelector(state => state.auth)
    const { notify } = useToast()
    const [isPending, setIsPending] = React.useState(false)
    const [isWishListed, setIsWishListed] = React.useState(false)
    const onClick = () => {
        if (!user) return notify("You must be logged in to add to wishlist", "error");
        setIsPending(true)
        console.log("here")



        setIsWishListed(!isWishListed)
        //do api call to add to wishlist
    }
    return (
        <button className={`btn btn-circle btn-sm hover:scale-125 ${isWishListed ? "bg-red-600" : "bg-gray-400"}`} onClick={() => onClick()}>
            <HeartIcon size={24} className={isPending ? "animate-spin" : ""} />
        </button>
    )
}

export default WishListButton