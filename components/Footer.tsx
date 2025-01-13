import { logOutAccount } from '@/lib/actions/user.actions'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const router = useRouter()

  const handleLogout = async () => {
    const loggedOut = await logOutAccount()

    if (loggedOut) {
      router.push('/sign-in')
    }
  }

  return (
    <footer className=' footer '>
      <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
        <p className=' text-xl font-bold text-gray-700 '>{user?.name[0]}</p>
      </div>
      <div
        className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}
      >
        <h1 className=' text- truncate text-gray-700 font-semibold '>
          {user?.name}
        </h1>
        <p className=' text-14 text-gray-700 truncate font-normal '>
          {user?.email}
        </p>
      </div>
      <div className=' footer_image ' onClick={handleLogout}>
        <Image src={'icons/logout.svg'} alt='jsm' fill className='absolute' />
      </div>
    </footer>
  )
}

export default Footer
