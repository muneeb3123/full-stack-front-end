import { Link, Outlet } from "react-router-dom";
import './Layout.css';

const Layout = () => (
  <>
    <aside className="menu">
      <h2>Racers</h2>
      <ul>
        <li><Link to="/" >Models</Link></li>
        <li><Link to="/reservation">Reservation</Link></li>
        <li><Link to="/reservation1">Reservation 1</Link></li>
      </ul>
    </aside>
    <main className="principal">
      <Outlet />
    </main>
  </>
)

export default Layout;