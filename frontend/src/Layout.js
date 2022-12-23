import { Outlet, Link } from 'react-router-dom';
import './Layout.css';

const styling = { textDecoration: 'none', color: 'black' };
const Layout = () => {
  return (
    <>
      <div className='OuterRadius'>
        <nav className='LayoutNav'>
          <ul>
            <li>
              <Link to='/' style={styling}>
                Main
              </Link>
            </li>
            <li>
              <Link to='/add' style={styling}>
                Add
              </Link>
            </li>
            <li>
              <Link to='/search' style={styling}>
                Search
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <Outlet />
    </>
  );
};

export default Layout;
