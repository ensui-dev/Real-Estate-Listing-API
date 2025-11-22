import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHome, FaBars, FaTimes, FaUser, FaSignOutAlt, FaTachometerAlt, FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 shadow-float-lg backdrop-blur-lg'
          : 'bg-white/80 shadow-float backdrop-blur-md'
      } rounded-2xl border border-white/50`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                  <FaHome className="text-white text-lg" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-gray-900 leading-tight">
                    Lusitan<span className="text-primary-600">Estate</span>
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium tracking-wider uppercase">
                    Portugal
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/properties"
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isActive('/properties')
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                }`}
              >
                Imóveis
              </Link>
              <Link
                to="/agencies"
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isActive('/agencies')
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                }`}
              >
                Agências
              </Link>
              <Link
                to="/agents"
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isActive('/agents')
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                }`}
              >
                Agentes
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      isActive('/dashboard')
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                    }`}
                  >
                    Dashboard
                  </Link>
                  {isAdmin() && (
                    <Link
                      to="/admin"
                      className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-1 ${
                        location.pathname.startsWith('/admin')
                          ? 'bg-terracotta-50 text-terracotta-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-terracotta-600'
                      }`}
                    >
                      <FaTachometerAlt className="text-sm" />
                      <span>Admin</span>
                    </Link>
                  )}

                  {/* User Menu */}
                  <div className="relative ml-2">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center space-x-2 bg-gradient-to-r from-primary-50 to-primary-100 px-4 py-2 rounded-xl hover:from-primary-100 hover:to-primary-200 transition-all duration-300"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                        <FaUser className="text-white text-sm" />
                      </div>
                      <span className="font-medium text-gray-700 max-w-[100px] truncate">{user?.name}</span>
                      <FaChevronDown className={`text-gray-400 text-xs transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-float-lg py-2 border border-gray-100 animate-fade-in">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                        <Link
                          to="/dashboard"
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <FaUser className="text-gray-400" />
                          <span>Minha Conta</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <FaSignOutAlt className="text-red-400" />
                          <span>Sair</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-3 ml-4">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-xl font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-all duration-300"
                  >
                    Entrar
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary"
                  >
                    Registar
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all duration-300"
              >
                {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-lg rounded-b-2xl animate-fade-in">
            <div className="px-4 py-4 space-y-1">
              <Link
                to="/properties"
                className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive('/properties') ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Imóveis
              </Link>
              <Link
                to="/agencies"
                className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive('/agencies') ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Agências
              </Link>
              <Link
                to="/agents"
                className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive('/agents') ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Agentes
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActive('/dashboard') ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  {isAdmin() && (
                    <Link
                      to="/admin"
                      className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                        location.pathname.startsWith('/admin') ? 'bg-terracotta-50 text-terracotta-600' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <div className="pt-2 mt-2 border-t border-gray-100">
                    <div className="px-4 py-2">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
                    >
                      <FaSignOutAlt />
                      <span>Sair</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-2 mt-2 border-t border-gray-100 space-y-2">
                  <Link
                    to="/login"
                    className="block px-4 py-3 rounded-xl text-center font-medium text-gray-600 hover:bg-gray-50 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Entrar
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-3 rounded-xl text-center font-semibold bg-gradient-to-r from-primary-600 to-primary-700 text-white transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Registar
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Click outside to close user menu */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
