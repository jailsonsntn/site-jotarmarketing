const SiteFooter = () => {
  return (
    <footer className="border-t border-[#1e2124]/10 px-5 py-8 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-display text-2xl text-[#131518]">Jota R Marketing</p>
            <p className="mt-2 text-sm leading-relaxed text-[#2f353b]/85">
              Sede em Praia Grande - SP, com atendimento para todo o Brasil e clientes no exterior.
            </p>
          </div>

          <div className="text-sm text-[#2f353b]/90 md:text-right">
            <p>
              <a href="tel:+5513985994965" className="font-semibold text-[#194f45] hover:underline">
                +55 13 98599-4965
              </a>
            </p>
            <p className="mt-1">
              <a href="mailto:falecom@jotarmarketing.com.br" className="font-semibold text-[#194f45] hover:underline">
                falecom@jotarmarketing.com.br
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-[#1e2124]/10 pt-4 text-xs text-[#2f353b]/75 md:flex md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Jota R Marketing. Todos os direitos reservados.</p>
          <p>Criação de Sites Premium e SEO Técnico.</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
