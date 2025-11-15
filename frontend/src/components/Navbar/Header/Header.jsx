import { assets } from '../../../assets/assets';
import './Header.css'
import  { useState } from 'react';
import { useTranslation } from 'react-i18next';
const Header = () => {
  const { t } = useTranslation();
  const [activeMenu, setActiveMenu] = useState('menu');
  return (
    <div className="header">
      <div className="header-content">
        <h2>{t('Order Your Favorite Furnitures')}</h2>
        <img src={assets.salegif} alt="" className='salegif'/>
        <img src={assets.offer_gif} alt="" className='offergif' />
        <p>{t('Choose from diverse menu fearturing a various array of Furniture craft with the excelent Artists around the world and finest ingredient which satisfy your demand and make your home decoration more luxurious, one better experience at a time.')}</p>
        <button href='/#explore-menu' onClick={() => setActiveMenu('menu')} className={activeMenu === 'menu' ? 'active' : ''}>{t('View Menu')}</button>
      </div>
    </div>
  )
}

export default Header
