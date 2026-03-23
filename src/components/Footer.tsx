import BrandLogo from '@/components/BrandLogo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = {
    services: ["Tráfego Pago", "Social Media", "Criativos", "Landing Pages", "Consultoria Estratégica", "SEO & Conteúdo"],
    company: ["Sobre Nós", "Nossa Equipe", "Cases de Sucesso", "Blog", "Carreiras", "Contato"],
    support: ["Central de Ajuda", "Documentação", "Política de Privacidade", "Termos de Uso", "FAQ", "Suporte Técnico"]
  };
  const paymentMethods = [{
    name: 'Visa',
    icon: '💳'
  }, {
    name: 'Mastercard',
    icon: '💳'
  }, {
    name: 'PIX',
    icon: '📱'
  }, {
    name: 'Boleto',
    icon: '🧾'
  }];
  return <footer className="bg-marketing-green text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <picture>
                <source srcSet="/uploads/afc8e4c9-8c5e-4f3f-ac82-553b02a37d51.avif" type="image/avif" />
                <source srcSet="/uploads/afc8e4c9-8c5e-4f3f-ac82-553b02a37d51.webp" type="image/webp" />
                <img
                  src="/uploads/afc8e4c9-8c5e-4f3f-ac82-553b02a37d51.png"
                  alt="Jota R Marketing"
                  width={632}
                  height={180}
                  decoding="async"
                  loading="lazy"
                  className="h-12 w-auto"
                />
              </picture>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transformamos negócios através do marketing digital. Mais de 5 anos gerando resultados 
              extraordinários para nossos clientes.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4 mb-6">
              {[{
              name: 'Instagram',
              icon: '📷',
              color: 'hover:bg-pink-500',
              url: 'https://www.instagram.com/jotar.marketing/'
            }, {
              name: 'LinkedIn',
              icon: '💼',
              color: 'hover:bg-blue-600',
              url: '#'
            }, {
              name: 'Facebook',
              icon: '👥',
              color: 'hover:bg-blue-500',
              url: 'https://www.facebook.com/jotarmkt/'
            }, {
              name: 'YouTube',
              icon: '📺',
              color: 'hover:bg-red-500',
              url: '#'
            }].map((social, index) => <a key={index} href={social.url} target={social.url !== '#' ? '_blank' : '_self'} rel={social.url !== '#' ? 'noopener noreferrer' : ''} className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white ${social.color} transition-all duration-300 transform hover:scale-110`}>
                  {social.icon}
                </a>)}
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-300">
              <p>📧 contato@jotarmarketing.com.br</p>
              <p>📱 +55 (13) 98599-4965</p>
              <p>📍 Praia Grande, SP - Brasil</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-marketing-orange">Serviços</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((service, index) => <li key={index}>
                  <a href="#servicos" className="text-gray-300 hover:text-marketing-orange transition-colors duration-300">
                    {service}
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-marketing-orange">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((item, index) => <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-marketing-orange transition-colors duration-300">
                    {item}
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Newsletter & Support */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-marketing-orange">Newsletter</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Receba dicas exclusivas de marketing digital
            </p>
            <div className="flex mb-6">
              <input type="email" placeholder="Seu e-mail" className="flex-1 px-3 py-2 bg-white/10 rounded-l-lg border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-marketing-orange" />
              <button className="bg-marketing-orange hover:bg-marketing-orange/90 px-4 py-2 rounded-r-lg transition-colors duration-300">
                ✉️
              </button>
            </div>

            <h4 className="font-semibold mb-3 text-marketing-orange">Suporte</h4>
            <ul className="space-y-2">
              {footerLinks.support.slice(0, 3).map((item, index) => <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-marketing-orange transition-colors duration-300 text-sm">
                    {item}
                  </a>
                </li>)}
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="font-semibold mb-2 text-marketing-orange">Formas de Pagamento</h4>
              <div className="flex space-x-4">
                {paymentMethods.map((method, index) => <div key={index} className="w-12 h-8 bg-white/10 rounded flex items-center justify-center text-sm hover:bg-white/20 transition-colors duration-300">
                    {method.icon}
                  </div>)}
              </div>
            </div>

            <div className="text-center md:text-right">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-marketing-orange">🔒</span>
                <span className="text-sm text-gray-300">Site 100% Seguro</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-marketing-orange">📞</span>
                <span className="text-sm text-gray-300">Atendimento: Seg à Sex, 9h às 18h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-black/20 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
            <p>
              © {currentYear} Jota R Marketing. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-marketing-orange transition-colors duration-300">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-marketing-orange transition-colors duration-300">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-marketing-orange transition-colors duration-300">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Float Button */}
      <button className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white text-2xl shadow-2xl transition-all duration-300 transform hover:scale-110 z-50 animate-bounce" onClick={() => window.open('https://wa.me/+5513985994965?text=Olá! Vim através do site e gostaria de falar sobre marketing digital.', '_blank')} style={{
      animationDuration: '2s'
    }}>
        💬
      </button>
    </footer>;
};
export default Footer;