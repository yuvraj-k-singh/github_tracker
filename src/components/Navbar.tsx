import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Moon, Sun, Menu, X, UserPlus } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const themeContext = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();

  if (!themeContext) return null;
  const { toggleTheme, mode } = themeContext;

  // Helper function for smooth scrolling
  const scrollToFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If not on the home page, navigate home first, then scroll
    if (location.pathname !== "/") {
      navigate("/");
      // Small timeout to allow the home page to load before scrolling
      setTimeout(() => {
        const element = document.getElementById("features");
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      // If already on home page, just scroll
      const element = document.getElementById("features");
      element?.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false); // Close mobile menu if open
  };

  const navLinkStyles = ({ isActive }: { isActive: boolean }) => 
    `px-5 py-2 rounded-full text-lg font-semibold transition-all duration-300 
    ${isActive 
      ? "text-blue-600 bg-blue-100/60 dark:bg-blue-900/40 shadow-sm ring-1 ring-blue-200/50 dark:ring-blue-500/20" 
      : "text-slate-600 dark:text-gray-300 hover:text-blue-500 hover:bg-white/50 dark:hover:bg-gray-800/50"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-indigo-50/70 dark:bg-gray-900/95 backdrop-blur-xl border-b border-indigo-100/50 dark:border-gray-800 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* 1. Logo Section */}
          <Link to="/" className="flex items-center shrink-0 group transition-all active:scale-95">
            <div className="relative">
              <img 
                src="/crl-icon.png" 
                alt="CRL Icon" 
                className="h-10 w-10 mr-3 drop-shadow-md group-hover:rotate-6 transition-transform duration-300" 
              />
              <div className="absolute -inset-1 bg-blue-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-center tracking-tight">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">GitHub</span>
              <span className="text-2xl font-extrabold text-blue-600 ml-1">Tracker</span>
            </div>
          </Link>

          {/* 2. Centered Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-1">
            <NavLink to="/" className={navLinkStyles}>Home</NavLink>
            
            {/* Features Link - Trigger Scroll */}
            <a 
              href="#features" 
              onClick={scrollToFeatures} 
              className="px-5 py-2 rounded-full text-lg font-semibold text-slate-600 dark:text-gray-300 hover:text-blue-500 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300"
            >
              Features
            </a>

            <NavLink to="/track" className={navLinkStyles}>Tracker</NavLink>
            <NavLink to="/contributors" className={navLinkStyles}>Contributors</NavLink>
          </div>

          {/* 3. Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-5">
            <div className="h-8 w-[1.5px] bg-indigo-200/60 dark:bg-gray-700 mx-2 rounded-full" />

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-slate-500 dark:text-gray-400 bg-white/40 dark:bg-gray-800/40 hover:bg-white dark:hover:bg-gray-700 hover:text-blue-600 transition-all shadow-sm ring-1 ring-slate-200/50 dark:ring-transparent"
            >
              {mode === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <Link to="/login" className="text-lg font-bold text-slate-700 dark:text-gray-200 hover:text-blue-600 transition-colors px-2">
              Login
            </Link>

            <Link
              to="/signup"
              className="flex items-center space-x-2 px-7 py-3 text-lg font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all active:scale-95"
            >
              <UserPlus className="h-5 w-5" />
              <span>Sign Up</span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center space-x-3">
            <button onClick={toggleTheme} className="p-2 text-slate-500 dark:text-gray-400">
              {mode === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-2xl bg-white/80 dark:bg-gray-800 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out bg-white/95 dark:bg-gray-900 ${isOpen ? "max-h-[600px] opacity-100 border-t border-indigo-50" : "max-h-0 opacity-0"}`}>
        <div className="px-5 py-10 space-y-4">
          <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
          
          {/* Mobile Features Link */}
          <button 
            onClick={scrollToFeatures} 
            className="block w-full text-left px-6 py-4 rounded-2xl text-xl font-bold text-slate-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-gray-800 transition-all"
          >
            Features
          </button>

          <MobileNavLink to="/track" onClick={() => setIsOpen(false)}>Tracker</MobileNavLink>
          <MobileNavLink to="/contributors" onClick={() => setIsOpen(false)}>Contributors</MobileNavLink>
          
          <div className="pt-8 mt-6 border-t border-slate-100 grid grid-cols-2 gap-5">
            <Link to="/login" className="flex items-center justify-center py-4 text-lg font-bold text-slate-700 bg-slate-50 rounded-2xl" onClick={() => setIsOpen(false)}>
              Login
            </Link>
            <Link to="/signup" className="flex items-center justify-center py-4 text-lg font-bold text-white bg-blue-600 rounded-2xl shadow-lg" onClick={() => setIsOpen(false)}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const MobileNavLink = ({ to, children, onClick }: { to: string, children: React.ReactNode, onClick: () => void }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) => 
      `block px-6 py-4 rounded-2xl text-xl font-bold transition-all ${
        isActive ? "bg-blue-600 text-white shadow-lg" : "text-slate-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-gray-800"
      }`
    }
  >
    {children}
  </NavLink>
);

export default Navbar;