import { useEffect } from 'react'
import './Modal.css'

export default function Modal({ isOpen, title, message, type = 'info', onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel', showCancel = true }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm?.()
  }

  const handleCancel = () => {
    onCancel?.()
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel?.()
    }
  }

  const getIconByType = () => {
    switch (type) {
      case 'warning':
        return '⚠️'
      case 'error':
        return '❌'
      case 'success':
        return '✅'
      case 'info':
      default:
        return 'ℹ️'
    }
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className={`modal modal-${type}`}>
        <div className="modal-header">
          <span className="modal-icon">{getIconByType()}</span>
          {title && <h2 className="modal-title">{title}</h2>}
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          {showCancel && (
            <button className="modal-btn modal-btn-cancel" onClick={handleCancel}>
              {cancelText}
            </button>
          )}
          <button className={`modal-btn modal-btn-confirm modal-btn-confirm-${type}`} onClick={handleConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
