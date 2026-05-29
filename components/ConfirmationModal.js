'use client'
import React from 'react'
import { X, AlertTriangle } from 'lucide-react'
import { useDarkMode } from '../hooks/useDarkMode'

export default function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger" // danger, warning, info
}) {
  const { isDarkMode } = useDarkMode()
  
  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
          confirmButton: isDarkMode 
            ? 'bg-red-600 hover:bg-red-700 text-white' 
            : 'bg-red-500 hover:bg-red-600 text-white'
        }
      case 'warning':
        return {
          icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
          confirmButton: isDarkMode 
            ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
            : 'bg-yellow-500 hover:bg-yellow-600 text-white'
        }
      default:
        return {
          icon: <AlertTriangle className="w-6 h-6 text-blue-500" />,
          confirmButton: isDarkMode 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }
    }
  }

  const variantStyles = getVariantStyles()

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      onClick={handleBackdropClick}
    >
      <div className={`
        relative w-full max-w-md mx-auto rounded-2xl shadow-2xl overflow-hidden
        ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}
        transform transition-all duration-300 scale-100 animate-scale-in
      `}>
        {/* Close button */}
        <button
          onClick={onClose}
          className={`
            absolute top-4 right-4 p-2 rounded-full transition-colors z-10
            ${isDarkMode 
              ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' 
              : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }
          `}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Icon and title */}
          <div className="flex items-center gap-3 mb-4">
            {variantStyles.icon}
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {title}
            </h2>
          </div>

          {/* Message */}
          <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {message}
          </p>

          {/* Action buttons */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className={`
                px-4 py-2 rounded-xl font-medium transition-colors
                ${isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }
              `}
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${variantStyles.confirmButton}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}