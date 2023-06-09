import { useDispatch, useSelector } from "react-redux"
import { createToast, removeToast } from "../store"
import { useEffect } from "react"



export const useToast = () => {
    const dispatch = useDispatch()
    const toasts = useSelector((state) => state.toasts.toasts)

    useEffect(() => {
        if (!toasts.length > 0) return
        toasts.forEach((toast) => {
            const timer = setTimeout(() => {
                dispatch(removeToast(toast.id))
            }, toast.timeout)
            return () => clearTimeout(timer)
        })
    }, [toasts])

    /**
     * @param {string} message displayed message
     * @param {string="default","info", "success", "warning", "error"} type toast styling
     * @param {number} [timeout = 2500] ms before toast is removed
     */
    const notify = (message, type = "default", timeout = 2500) => {
        const id = Math.floor(Math.random() * 1000000)
        dispatch(createToast({ message, type, id, timeout }))
    }

    const removeToastById = (id) => {
        dispatch(removeToast(id))
    }

    return { notify, removeToastById, toasts }
}
