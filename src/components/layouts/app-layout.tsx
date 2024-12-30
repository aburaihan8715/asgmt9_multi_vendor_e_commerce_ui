import { Outlet } from 'react-router';

import ScrollToTop from 'react-scroll-to-top';
import Header from '../common/header';
import Footer from '../common/footer';
import Notification from '../common/notification';

const AppLayout = () => {
  return (
    <>
      <div>
        <Notification />
        <Header />
        <div className="min-h-screen">
          <Outlet />
        </div>
        <Footer />
      </div>
      <ScrollToTop
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        smooth
        color="#085749"
      />
    </>
  );
};

export default AppLayout;
