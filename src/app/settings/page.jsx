import React from 'react'
import Searchbar from '../components/Searchbar'

export default function page() {
  return (
    <div className='wrapper'>
      <Searchbar />
      <div className="container">
        <div className="row">
          <div className="section__title page__title">Settings</div>
          <div className="setting__content">
            <div className="settings__sub--title">
              Your Subscription plan
            </div>
            <div className="settings__text">premium</div>
          </div>
          <div className="setting__content">
            <div className="settings__sub--title">
              Email
            </div>
            <div className="settings__text">hanna@gmail.com</div>
          </div>
        </div>
      </div>
    </div>
  )
}
