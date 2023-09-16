import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { logOut } from '../../redux/auth/logoutSlice';
import './Layout.css';
import menu from '../../images/menu.svg';
import logo from '../../images/logo4.png';
import pinterest from '../../images/pinterest.svg';
import facebook from '../../images/facebook.svg';
import twitter from '../../images/twitter.svg';
import vimeo from '../../images/vimeo.svg';
import microverse from '../../images/microverse-sm.png';

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickMenu = () => {
    const btnMenu = document.querySelector('.menu');
    btnMenu.classList.toggle('activate');
  };
  const { isUser } = useSelector((state) => state.currentUser);
  const handleClickLogout = (e) => {
    e.preventDefault();
    dispatch(logOut()).then((result) => {
      if (result.payload) {
        toast.success(result.payload);
        navigate('/');
        window.location.reload();
      } else {
        toast.error(result.error.message);
      }
    });
  };

  return (
    <>
      <header className="mobil-icon">
        <button className="menu-icon" type="button" onClick={handleClickMenu}>
          <img src={menu} alt="mobile menu" />
        </button>
      </header>
      <aside className="menu">
        <section className="menu-header">
          <img src={logo} alt="logo" className="logo" />
        </section>
        <section className="menu-user">
          <h2>Racers</h2>
          <ul className="menu-container">
            <li className="menu-item"><Link to="/">MODELS</Link></li>
            <li className="menu-item"><Link to="/cars">CARS</Link></li>
            <li className="menu-item"><Link to="/cars">MY RESERVATIONS</Link></li>
            {
              isUser
                ? <li className="menu-item"><button type="button" onClick={handleClickLogout}>LOGOUT</button></li>
                : (
                  <>
                    <li className="menu-item"><Link to="/login">LOGIN</Link></li>
                    <li className="menu-item"><Link to="/signup">REGISTER</Link></li>
                  </>
                )
            }
          </ul>
        </section>
        <section className="menu-footer">
          <ul className="menu-social">
            <li className="menu-social-item"><img src={pinterest} alt="pinterest" className="social-lnk" /></li>
            <li className="menu-social-item"><img src={facebook} alt="facebook" className="social-lnk" /></li>
            <li className="menu-social-item"><img src={twitter} alt="twitter" className="social-lnk" /></li>
            <li className="menu-social-item"><img src={vimeo} alt="vimeo" className="social-lnk" /></li>
          </ul>
          <p className="menu-footer-text">
            © 2023 Microverse
          </p>
          <a href="https://www.microverse.org/?grsf=l49pe7" target="_blank" rel="noopener noreferrer">
            <img src={microverse} alt="microverse logo" className="microverse" />
          </a>
        </section>
      </aside>
      <main className="principal">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
