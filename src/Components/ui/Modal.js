import React from "react"

function Modal({ open, responsive, onClickBackdrop, className, children }) {
    const containerClasses = `modal ${open ? "modal-open" : ""} ${responsive ? "modal-bottom sm:modal-middle" : ""} `
    return (
      <>
        <div
          aria-label="Modal"
          aria-hidden={!open}
          aria-modal={open}
          className={containerClasses}
          onClick={(e) => {
            e.stopPropagation()
            if (e.target === e.currentTarget) {
              e.stopPropagation()
              if (onClickBackdrop) {
                onClickBackdrop()
              }
            }
          }}
        >
          <div className={`modal-box w-full ${className}`}>
            <button
              className="btn-ghost btn-circle btn absolute right-0 top-0"
              autoFocus
              onClick={onClickBackdrop}
            >
              X
            </button>
            {children}
          </div>
        </div>
      </>
    )
}

function ModalHeader({ children, className }) {
    return <div className={`mb-8 w-full text-xl ${className}`}>{children}</div>
}

function ModalActions({ children, className }) {
    return <div className={`modal-action ${className}`}>{children}</div>
}

export { Modal, ModalHeader, ModalActions }
