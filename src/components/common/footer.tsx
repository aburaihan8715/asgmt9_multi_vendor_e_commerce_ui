import { Link } from 'react-router';
import BrandLogo from './brand-logo';
import {
  LuFacebook,
  LuInstagram,
  LuLinkedin,
  LuTwitter,
} from 'react-icons/lu';

const date = new Date().toDateString().slice(4);

const Footer = () => {
  const role = 'user';
  return (
    <footer className="mt-10 bg-primary">
      <div className="mx-auto w-full max-w-7xl px-1 text-gray-300 md:px-10">
        <div className="mx-auto flex flex-col flex-wrap gap-10 border-b-2 p-1 py-24 md:flex-row md:flex-nowrap md:items-center lg:items-start">
          {/* BRAND LOGO */}
          <div className="mx-auto w-full flex-shrink-0 text-center md:mx-0 md:w-64 md:text-left">
            <Link
              to="/"
              className="title-font flex items-center justify-center font-medium text-gray-300 md:justify-start"
            >
              <BrandLogo />
            </Link>
            <p className="mt-4 text-wrap text-sm text-gray-300">
              EasyBuy fosters innovation by enabling personalized shopping
              experiences and streamlining operations through advanced
              technology and data insights.
            </p>
          </div>

          <div className="-mb-10 mt-10 flex flex-grow flex-wrap text-center md:mt-0 md:pl-20 md:text-left">
            {/* PAGES LINKS */}
            <div className="w-full px-4 md:w-1/2 lg:w-1/4">
              <h2 className="title-font mb-3 text-sm font-semibold tracking-widest text-gray-300">
                PAGES LINKS
              </h2>
              <nav className="mb-10 list-none">
                <li>
                  <Link
                    to="/"
                    className="text-gray-300 transition-transform duration-150 hover:scale-105 hover:text-gray-300 hover:underline"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/dashboard/${role}`}
                    className="text-gray-300 transition-transform duration-150 hover:scale-105 hover:text-gray-300 hover:underline"
                  >
                    Dashboard
                  </Link>
                </li>
              </nav>
            </div>

            {/* COMPANY */}
            <div className="w-full px-4 md:w-1/2 lg:w-1/4">
              <h2 className="title-font mb-3 text-sm font-semibold tracking-widest text-gray-300">
                COMPANY
              </h2>
              <nav className="mb-10 list-none">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-300 transition-transform duration-150 hover:scale-105 hover:text-gray-300 hover:underline"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-300 transition-transform duration-150 hover:scale-105 hover:text-gray-300 hover:underline"
                  >
                    Contact us
                  </Link>
                </li>
              </nav>
            </div>

            {/* LEGAL */}
            <div className="w-full px-4 md:w-1/2 lg:w-1/4">
              <h2 className="title-font mb-3 text-sm font-semibold tracking-widest text-gray-300">
                LEGAL
              </h2>
              <nav className="mb-10 list-none">
                <li>
                  <a className="text-gray-300 hover:text-gray-300">
                    Terms of use
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 hover:text-gray-300">
                    Privacy policy
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 hover:text-gray-300">
                    Cookie policy
                  </a>
                </li>
              </nav>
            </div>
          </div>
        </div>

        <div className="">
          <div className="mx-auto flex flex-col flex-wrap py-4 sm:flex-row">
            <p className="text-center text-sm text-gray-300 sm:text-left">
              &copy; {date} EasyBuy
            </p>

            {/* SOCIAL LINKS */}
            <span className="mt-2 inline-flex justify-center sm:ml-auto sm:mt-0 sm:justify-start">
              <a
                href="https://www.facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 text-gray-300"
              >
                <LuFacebook />
              </a>
              <a
                href="https://www.twitter.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 text-gray-300"
              >
                <LuTwitter />
              </a>
              <a
                href="https://www.instagram.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 text-gray-300"
              >
                <LuInstagram />
              </a>
              <a
                href="https://www.linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 text-gray-300"
              >
                <LuLinkedin />
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
