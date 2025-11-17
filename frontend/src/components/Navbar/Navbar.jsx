import { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { StoreContext } from '../../context/StoreContext';
import HelpTab from '../HelpTab/HelpTag';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n.js';
// eslint-disable-next-line react/prop-types
const Navbar = ({ setShowLogin, toggleTheme, isDarkMode }) => {
  const { t } = useTranslation();
  console.log(i18n.language);
  const [activeMenu, setActiveMenu] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showHelpTab, setShowHelpTab] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className='navbar'>

      <Link to='/'><img src={assets.logo} alt="Logo" className='logo' /></Link>

      <div className='bu1'>
        <button
          className={`bu2 ${i18n.language === 'vi' ? 'active-lang' : ''}`}
          onClick={() => i18n.changeLanguage('vi')}
        >
          Vi
        </button>

        <button
          className={`bu2 ${i18n.language === 'en' ? 'active-lang' : ''}`}
          onClick={() => i18n.changeLanguage('en')}
        >
          En
        </button>
      </div>

      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setActiveMenu('home')} className={activeMenu === 'home' ? 'active' : ''}>{t('Home')}</Link>
        <a href='/#explore-menu' onClick={() => setActiveMenu('menu')} className={activeMenu === 'menu' ? 'active' : ''}>{t('Menu')}</a>
        <a href='/#app-download' onClick={() => setActiveMenu('Mobileapp')} className={activeMenu === 'Mobileapp' ? 'active' : ''}>{t('Mobile App')}</a>
        <a href='/#footer' onClick={() => setActiveMenu('contact-us')} className={activeMenu === 'contact-us' ? 'active' : ''}>{t('Contact Us')}</a>
      </ul>
      <div className='navbar-right'>
        <div className="search-box">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search products..."
          />

          <img src={assets.search_icon} alt="Search" />
        </div>
        <div className='navbar-search-icon'>
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="Cart" />
          </Link>
          {getTotalCartAmount() > 0 && <div className="dot"></div>}
        </div>
        <img
          src={assets.icon_help}

          className='help-icon'
          onClick={() => setShowHelpTab(!showHelpTab)} // Toggle HelpTab visibility
        />
        {!token ? (
          <button onClick={() => setShowLogin(true)}>{t('Sign in')}</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => {
                if (token) {
                  navigate('/myorders');
                } else {
                  setShowLogin(true);
                }
              }}>
                <img src={assets.bag_icon} alt="Order" />{t('Order')}
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" />
                <p>{t('LogOut')}</p>
              </li>
            </ul>
          </div>
        )}
        {showHelpTab && <HelpTab setShowHelpTab={setShowHelpTab} />} {/* Render HelpTab */}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default Navbar;
