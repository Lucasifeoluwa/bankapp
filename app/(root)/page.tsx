import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {
  const loggedIn = {
    firstName: 'Lucas',
    lastName: 'Fikayo',
    email: 'contact@email.com'
  }

  return (
    <section className='home'>
      <div className=' home-content '>
        <header className=' home-header '>
          <HeaderBox
            type='greeting'
            title='Welcome'
            user={loggedIn?.firstName || 'Guest'}
            subtext='Access and Manage your subscriptions easily'
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 125.5 }, { currentBalance: 125.5 }]}
      />
    </section>
  )
}

export default Home
