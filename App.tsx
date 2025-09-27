import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SolutionsListPage from './pages/SolutionsListPage';
import SolutionDetailPage from './pages/SolutionDetailPage';
import ServicesPage from './pages/ServicesPage';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';
import AboutPage from './pages/AboutPage';
import CasesPage from './pages/CasesPage';
import CaseDetailPage from './pages/CaseDetailPage';
import SupportPage from './pages/SupportPage';
import LoginPage from './pages/LoginPage';
import DemoPage from './pages/DemoPage';
import NotFoundPage from './pages/NotFoundPage';
import { solutions } from './features/solutions/data';
import { posts } from './features/blog/data';
import { cases } from './features/cases/data';

const App: React.FC = () => {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    // Listen for browser back/forward button clicks
    window.addEventListener('popstate', handleLocationChange);
    // Listen for our custom event from the Link component
    window.addEventListener('pushstate', handleLocationChange);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate', handleLocationChange);
    };
  }, []);

  // Effect to handle scrolling on page/route changes
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash !== '#') {
      const id = hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);


  let page;

  if (pathname === '/') {
    page = <HomePage />;
  } else if (pathname === '/solutions') {
    page = <SolutionsListPage />;
  } else if (pathname === '/services') {
    page = <ServicesPage />;
  } else if (pathname === '/blog') {
    page = <BlogListPage />;
  } else if (pathname === '/cases') {
    page = <CasesPage />;
  } else if (pathname === '/about') {
    page = <AboutPage />;
  } else if (pathname === '/support') {
    page = <SupportPage />;
  } else if (pathname === '/login') {
    page = <LoginPage />;
  } else if (pathname === '/demo') {
    page = <DemoPage />;
  } else if (pathname.startsWith('/cases/')) {
    const slug = pathname.split('/')[2];
    const caseStudy = cases.find(c => c.slug === slug);
    if (caseStudy) {
      page = <CaseDetailPage caseStudy={caseStudy} />;
    } else {
      page = <NotFoundPage />;
    }
  } else if (pathname.startsWith('/blog/')) {
    const slug = pathname.split('/')[2];
    const post = posts.find(p => p.slug === slug);
    if (post) {
      page = <BlogDetailPage post={post} />;
    } else {
      page = <NotFoundPage />;
    }
  } else if (pathname.startsWith('/solutions/')) {
    const solutionId = pathname.split('/')[2];
    const solution = solutions.find(s => s.id === solutionId);
    if (solution) {
      page = <SolutionDetailPage solution={solution} />;
    } else {
      page = <NotFoundPage />;
    }
  } else {
    page = <NotFoundPage />; 
  }

  return (
    <div className="bg-off-white font-sans antialiased text-graphite-black">
      <Header />
      <main className="pt-16 md:pt-20">
        {page}
      </main>
      <Footer />
    </div>
  );
};

export default App;