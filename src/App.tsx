import { BrowserRouter, Route, Routes } from 'react-router';
import AppLayout from './components/layouts/app-layout';

import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import AdminLayout from './components/layouts/admin-layout';

import ResetPasswordPage from './pages/auth/reset-password';
import ForgetPasswordPage from './pages/auth/forget-password';
import UpdateProfilePage from './pages/auth/update-profile';
import ChangePasswordPage from './pages/auth/change-password';
import ProductDetailsPage from './pages/app-view/product-details';

import PaymentOptionsPage from './pages/payment/payment-options';
import StripePayment from './pages/payment/stripe-payment';

import NotFound from './pages/not-found';
import HomePage from './pages/app-view/home';
import CartPage from './pages/app-view/cart';
import AdminDashboard from './pages/admin-view/dashboard';
import VendorDashboard from './pages/vendor-view/dashboard';
import CustomerDashboard from './pages/customer-view/dashboard';
import UnauthPage from './pages/unauth';
import PaymentLayout from './components/layouts/payment-layout';
import { useAppSelector } from './redux/hooks';
import CheckAuth from './components/common/check-auth';
import VendorLayout from './components/layouts/vendor-layout';
import CustomerLayout from './components/layouts/customer-layout';
import AuthLayout from './components/layouts/auth-layout';
import ProductList from './pages/app-view/product-list';

const App = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const role = user?.role as string;

  return (
    <BrowserRouter>
      <Routes>
        {/* ===== for app view =====*/}
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated as boolean}
              role={role}
            >
              <AppLayout />
            </CheckAuth>
          }
        >
          <Route index element={<HomePage />} />
          <Route
            path="product-details/:id"
            element={<ProductDetailsPage />}
          />
          <Route path="cart" element={<CartPage />} />
          <Route path="products" element={<ProductList />} />
        </Route>

        {/* ===== for auth =====*/}
        <Route
          path="/auth"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated as boolean}
              role={role}
            >
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="forget-password" element={<ForgetPasswordPage />} />
          <Route path="update-profile" element={<UpdateProfilePage />} />
          <Route path="change-password" element={<ChangePasswordPage />} />
        </Route>

        {/* ===== for admin =====*/}
        <Route
          path="/admin"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated as boolean}
              role={role}
            >
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

        {/* ===== for vendor =====*/}
        <Route
          path="/vendor"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated as boolean}
              role={role}
            >
              <VendorLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<VendorDashboard />} />
        </Route>

        {/* ===== for customer =====*/}
        <Route
          path="/customer"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated as boolean}
              role={role}
            >
              <CustomerLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<CustomerDashboard />} />
        </Route>

        {/* ===== for payment=====*/}
        <Route path="/payment" element={<PaymentLayout />}>
          <Route path="payment-options" element={<PaymentOptionsPage />} />
          <Route path="stripe-payment" element={<StripePayment />} />
        </Route>

        {/* ===== for unauth=====*/}
        <Route path="/unauth" element={<UnauthPage />} />

        {/* ===== for not found =====*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
