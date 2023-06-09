import React from "react"
import {
  AlertTriangleIcon,
  XOctagonIcon,
  InfoIcon,
  CheckCircle2Icon,
} from "lucide-react"

function ToastProvider({ toasts }) {
  const toastsExist = toasts && toasts.length > 0
  if (!toastsExist) return null

  const renderToasts = (toasts) => {
    return toasts.map((toast) => (
      <output className={`toast-end toast-bottom toast z-50 shadow-sm`} key={toast.id}>
        {toast.type === "error" && errorToast(toast.message)}
        {toast.type === "success" && successToast(toast.message)}
        {toast.type === "info" && infoToast(toast.message)}
        {toast.type === "warning" && warningToast(toast.message)}
        {toast.type === "default" && defaultToast(toast.message)}
      </output>
    ))
  }

  return (
    <div className="toasts flex flex-col">
      {renderToasts(toasts)}
    </div>

  )
}
export { ToastProvider }

const successToast = (message) => {
  return (
    <div className="alert alert-success">
      <CheckCircle2Icon className="h-6 w-6 shrink-0 stroke-current" />
      <span>{message}</span>
    </div>
  )
}

const errorToast = (message) => {
  return (
    <div className="alert alert-error">
      <XOctagonIcon className="h-6 w-6 shrink-0 stroke-current" />
      <span>{message}</span>
    </div>
  )
}

const infoToast = (message) => {
  return (
    <div className="alert alert-info">
      <InfoIcon className="h-6 w-6 shrink-0 stroke-current" />
      <span>{message}</span>
    </div>
  )
}

const defaultToast = (message) => {
  return (
    <div className="alert">
      <span>{message}</span>
    </div>
  )
}

const warningToast = (message) => {
  return (
    <div className="alert alert-warning">
      <AlertTriangleIcon className="h-6 w-6 shrink-0 stroke-current" />
      <span>{message}</span>
    </div>
  )
}