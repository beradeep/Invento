import dummy from '../svg/dummy-person.svg'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'

export default function UserInfo(props) {
  return (
    <div className="flex relative items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button type="button" id="user-menu-button"
        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        aria-expanded="false" data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom" onClick={props.infoToggler}
      >
        <span className="sr-only">Open user menu</span>
        {/* eslint-disable-next-line */}
        <img className="w-8 h-8 rounded-full bg-white" src={dummy} alt="User Photo" />
      </button>

      {/* Dropdown menu */}
      
      <div
        className={`z-50 ${props.infoHidden} absolute md:top-8 top-10 right-1/2 md:right-0 translate-x-1/3 md:translate-x-4 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
        id="user-dropdown"
      >
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">
            Your Name
          </span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
            yourname@example.com
          </span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <a href="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a href="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
          <li>
            <a href="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Earnings
            </a>
          </li>
          <li>
            <a href="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>

      <button
        data-collapse-toggle="navbar-user"
        type="button"
        className="inline-flex relative items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-user"
        aria-expanded="false"
        onClick={props.navToggler}
      >
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
    </div>
  )
}

UserInfo.propTypes = {
  navToggler: PropTypes.func.isRequired,
  infoToggler: PropTypes.func.isRequired,
  infoHidden: PropTypes.string.isRequired,
}