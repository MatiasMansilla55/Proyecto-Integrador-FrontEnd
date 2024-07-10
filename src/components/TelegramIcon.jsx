import React from 'react'
import IconoTelegram from '/telegram-icon-free-png.webp';
const TelegramIcon = () => {
  return (
    <a href="https://t.me/theGoTravelbot">
    <button 
    target="_blank"
    className="telegram-icon"
    variant="primary">
    <img src= {IconoTelegram} alt="" style={{ width: '100px', height: '55px', marginRight: '1px' }} />
    </button>
    </a>
  )
}

export default TelegramIcon
