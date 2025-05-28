import Image from 'next/image'
import Logo from '/public/assets/logo.png'
export default function NavBar() {
  return (
    <nav>
        <div className="nav__wrapper">
            <div className="nav__img--mask">
                <Image priority='true' src={Logo} alt='logo' className='nav__img' />
            </div>
            <ul className='nav__list--wrapper'>
                <li className="nav__list--login">Login</li>
                <li className="nav__list">About</li>
                <li className="nav__list">Contact</li>
                <li className="nav__list">Help</li>
            </ul>
        </div>
    </nav>
  )
}
