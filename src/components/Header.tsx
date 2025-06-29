import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };
  return <header className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ease-in-out ${scrolled ? 'bg-white/30 backdrop-blur-lg border-gray-200/30 shadow-xl transform translate-y-0' : 'bg-white/20 backdrop-blur-md border-gray-100/20 transform translate-y-0'}`}>
      <div className="container mx-auto px-4 py-4 transition-all duration-500 ease-in-out">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/uploads/2dcc7432-8798-4ae1-b564-16c9f42cc0d1.png" alt="Jota R Marketing" className="h-12 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('inicio')} className="hover:text-marketing-orange transition-colors duration-300 text-slate-50">
              Início
            </button>
            <button onClick={() => scrollToSection('servicos')} className="hover:text-marketing-orange transition-colors duration-300 text-slate-50">
              Serviços
            </button>
            <button onClick={() => scrollToSection('contato')} className="hover:text-marketing-orange transition-colors duration-300 text-slate-50">
              Contato
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-marketing-orange hover:bg-marketing-orange/90 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105" onClick={() => window.open('https://wa.me/+5513985994965?text=Olá! Gostaria de solicitar uma cotação para serviços de marketing digital.', '_blank')}>
              Fale Conosco
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className={`h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4 pt-4">
              <button onClick={() => scrollToSection('inicio')} className="text-left text-gray-700 hover:text-marketing-orange transition-colors duration-300">
                Início
              </button>
              <button onClick={() => scrollToSection('servicos')} className="text-left text-gray-700 hover:text-marketing-orange transition-colors duration-300">
                Serviços
              </button>
              <button onClick={() => scrollToSection('contato')} className="text-left text-gray-700 hover:text-marketing-orange transition-colors duration-300">
                Contato
              </button>
              <Button className="bg-marketing-orange hover:bg-marketing-orange/90 text-white px-6 py-2 rounded-lg w-full mt-4" onClick={() => window.open('https://wa.me/+5513985994965?text=Olá! Gostaria de solicitar uma cotação para serviços de marketing digital.', '_blank')}>
                Fale Conosco
              </Button>
            </nav>
          </div>}
      </div>
    </header>;
};
export default Header;