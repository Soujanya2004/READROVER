import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BookRentalHomePage from './BookRentalHomePage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BookRentalHomePage/>
  </StrictMode>,
)
