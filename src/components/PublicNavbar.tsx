import { Link } from 'react-router-dom';
import BrandLogo from '@/components/BrandLogo';
import { Button } from '@/components/ui/button';

type PublicNavbarProps = {
  transparent?: boolean;
};

const PublicNavbar = ({ transparent = false }: PublicNavbarProps) => {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-[#1e2124]/10 transition-colors ${
        transparent
          ? 'bg-[#f7f6f2]/70 shadow-[0_10px_35px_-24px_rgba(0,0,0,0.55)] backdrop-blur-2xl'
          : 'bg-[#f7f6f2]/88 shadow-[0_10px_35px_-24px_rgba(0,0,0,0.35)] backdrop-blur-2xl'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/#inicio" className="relative z-10 flex items-center">
          <BrandLogo className="h-12 w-auto sm:h-14" fetchPriority="high" />
        </Link>

        <nav className="glass-surface hidden items-center gap-2 rounded-full p-1 text-sm font-medium text-[#1e2124]/80 md:flex">
          <Link to="/#servicos" className="rounded-full px-5 py-2.5 transition hover:bg-[#1e2124]/5 hover:text-[#1e2124]">
            Soluções
          </Link>
          <Link to="/#processo" className="rounded-full px-5 py-2.5 transition hover:bg-[#1e2124]/5 hover:text-[#1e2124]">
            Processo
          </Link>
          <Link to="/orcamento" className="rounded-full px-5 py-2.5 transition hover:bg-[#1e2124]/5 hover:text-[#1e2124]">
            Orçamento
          </Link>
          <Link to="/blog" className="rounded-full px-5 py-2.5 transition hover:bg-[#1e2124]/5 hover:text-[#1e2124]">
            Blog
          </Link>
          <Link to="/#projetos" className="rounded-full px-5 py-2.5 transition hover:bg-[#1e2124]/5 hover:text-[#1e2124]">
            Projetos
          </Link>
          <Link to="/#contato" className="rounded-full px-5 py-2.5 transition hover:bg-[#1e2124]/5 hover:text-[#1e2124]">
            Contato
          </Link>
        </nav>

        <Button
          onClick={() =>
            window.open(
              'https://wa.me/+5513985994965?text=Olá! Quero um site premium para minha empresa.',
              '_blank'
            )
          }
          className="relative z-10 rounded-full bg-[#1e2124] px-5 text-[#f7f6f2] hover:bg-[#2d3237]"
        >
          Solicitar análise gratuita agora
        </Button>
      </div>
    </header>
  );
};

export default PublicNavbar;
