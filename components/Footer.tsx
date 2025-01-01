import React from 'react'

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  return (
    <footer className=' footer '>
      <div className={type === 'mobile' ? 'footer_name-mobile' : 'fo0ter_name'}>
        <p className=' text-xl font-bold text-gray-700 '>{user.name[0]}</p>
      </div>
      <div
        className={type === 'mobile' ? 'footer_email-mobile' : 'fo0ter_email'}
      >
        <h1 className=' text-14 truncate font-normal '>{user.email}</h1>
      </div>
    </footer>
  )
}

export default Footer
