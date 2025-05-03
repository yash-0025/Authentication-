import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './Header';
import { ToastContainer } from 'react-toastify';

const Layout = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;