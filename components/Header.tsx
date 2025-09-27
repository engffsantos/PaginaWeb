import React, { useState, useEffect } from 'react';
import { MenuIcon, XIcon } from './icons';
import Link from './Link';
import { solutions } from '../features/solutions/data';

const allSolutionSublinks = solutions.map(s => ({ name: s.name, href: `/solutions/${s.id}` }));

const navLinks = [
  { name: 'Início', href: '/' },
  { 
    name: 'Soluções', 
    href: '/solutions',
    sublinks: allSolutionSublinks
  },
  { name: 'Serviços', href: '/services' },
  { name: 'Blog', href: '/blog' },
  { name: 'Casos de Sucesso', href: '/cases' },
  { name: 'Sobre', href: '/about' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePath, setActivePath] = useState(window.location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    const handleLocationChange = () => {
        setActivePath(window.location.pathname);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('pushstate', handleLocationChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate', handleLocationChange);
    };
  }, []);
  
  const getLinkClass = (href: string, hasSublinks = false) => {
    const baseClass = "px-3 py-2 rounded-t-md text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 border-b-2 border-transparent";
    const activeClass = "text-cyan-vibrant font-semibold border-cyan-vibrant";
    const isParentActive = hasSublinks && activePath.startsWith(href) && href !== '/';
    const isActive = activePath === href || isParentActive;
    
    return `${baseClass} ${isActive ? activeClass : ''}`;
  }


  return (
    <header className={`bg-navy text-white fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'shadow-lg' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-16 md:h-20'}`}>
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold tracking-wider">
              EasyData<span className="text-cyan-vibrant">360</span>
            </Link>
          </div>
          <nav className="hidden md:flex md:space-x-4 lg:space-x-6 items-center">
            {navLinks.map((link) => (
              link.sublinks ? (
                <div key={link.name} className="relative group">
                  <Link 
                    href={link.href} 
                    className={`${getLinkClass(link.href, true)} flex items-center gap-1`}
                  >
                    {link.name}
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  </Link>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-navy rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible w-56 py-2 max-h-96 overflow-y-auto">
                    {link.sublinks.map(sublink => (
                      <Link key={sublink.name} href={sublink.href} className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white w-full text-left">
                        {sublink.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={getLinkClass(link.href)}
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/support"
              className={getLinkClass("/support")}
            >
              Suporte
            </Link>
            <Link 
              href="/login"
              className={getLinkClass("/login")}
            >
              Login
            </Link>
            <Link 
              href="/demo" 
              className="bg-orange-primary text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-orange-hover transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              Solicitar Demonstração
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Abrir menu</span>
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-navy/95 backdrop-blur-sm">
            {navLinks.map((link) => (
              <React.Fragment key={link.name}>
                <Link 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-white hover:bg-white/10 transition-colors duration-200"
                >
                  {link.name}
                </Link>
                {link.sublinks && (
                  <div className="pl-5 border-l-2 border-cyan-vibrant/30 ml-3">
                    {link.sublinks.map(sublink => (
                      <Link 
                        key={sublink.name}
                        href={sublink.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                      >
                        {sublink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
             <Link href="/support" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-white hover:bg-white/10 transition-colors duration-200">
              Suporte
            </Link>
            <Link href="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-white hover:bg-white/10 transition-colors duration-200">
              Login
            </Link>
            <Link 
              href="/demo" 
              onClick={() => setIsMenuOpen(false)} 
              className="bg-orange-primary text-white block w-full text-center mt-2 px-4 py-2 rounded-md text-base font-semibold hover:bg-orange-hover transition-colors shadow-md"
            >
              Solicitar Demonstração
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;