import { Link, Outlet } from 'react-router';
import BrandLogo from '../common/brand-logo';
import CustomerSidebar from '../customer-view/sidebar';

const CustomerLayout = () => {
  return (
    <>
      <div className="flex">
        <div>
          <div className="sticky bottom-0 top-0 md:h-screen md:flex-1">
            <div className="h-screen bg-primary/90 md:p-5 md:pl-10">
              <Link className="hidden md:block" to="/">
                <BrandLogo />
              </Link>
              <div className="mt-5">
                <CustomerSidebar />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[80px] flex-1 overflow-auto p-5 sm:mt-0 md:flex-[4]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default CustomerLayout;
