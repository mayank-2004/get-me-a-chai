import React from 'react'

const Footer = () => {
  const currentyear = new Date().getFullYear();
  return (
    <footer className='bg-blue-950 text-white flex items-center justify-center px-5 h-16'>
        <p className='text-center'>
            Copyright &copy; {currentyear} @ Get-Me-A-Chai - All Rights Reserved! 
        </p>
    </footer>
  )
}

export default Footer
