import { Button } from '@/components/ui/button';
import { useScrollZoom } from '@/hooks/useScrollZoom';

const ContactSection = () => {
  const sectionRef = useScrollZoom();
  const titleRef = useScrollZoom({ threshold: 0.3 });
  const contactInfoRef = useScrollZoom({ threshold: 0.2 });

  const contactInfo = [{
    icon: "📧",
    title: "E-mail",
    info: "falecom.jr.marketing@gmail.com",
    action: "mailto:falecom.jr.marketing@gmail.com"
  }, {
    icon: "💬",
    title: "WhatsApp",
    info: "+ 55 13 98599-4965",
    action: "https://wa.me/+5513985994965"
  }, {
    icon: "🌎",
    title: "Localização",
    info: "Praia Grande - SP, Brasil",
    action: "#"
  }, {
    icon: "⚡",
    title: "Atendimento",
    info: "Segunda à Sexta, 9h às 18h",
    action: "#"
  }];

  return (
    <section id="contato" className="py-20 bg-marketing-gray" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" ref={titleRef}>
          <h2 className="text-4xl md:text-5xl font-bold text-marketing-green mb-6">
            Vamos Conversar?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entre em contato conosco e descubra como podemos ajudar seu negócio a crescer online.
          </p>
        </div>

        <div className="grid gap-12">
          {/* Contact Information */}
          <div className="space-y-8" ref={contactInfoRef}>
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-marketing-green/20">
              <h3 className="text-2xl font-bold text-marketing-green mb-6">
                📞 Entre em Contato
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => <div key={index} className="flex items-center space-x-4 group">
                    <div className="w-12 h-12 bg-marketing-orange rounded-lg flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-marketing-green">{item.title}</h4>
                      <a href={item.action} className="text-gray-600 hover:text-marketing-orange transition-colors duration-300" target={item.action.startsWith('http') ? '_blank' : undefined}>
                        {item.info}
                      </a>
                    </div>
                  </div>)}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-gradient-to-r from-marketing-green to-marketing-orange p-8 rounded-xl text-white">
              <h3 className="text-2xl font-bold mb-4">
                💬 Atendimento Direto
              </h3>
              <p className="mb-6 opacity-90">
                Prefere falar direto conosco? Clique abaixo e fale com nossa equipe agora mesmo.
              </p>
              <Button className="bg-white text-marketing-green px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg" onClick={() => window.open('https://wa.me/+5513985994965?text=Olá! Gostaria de conversar sobre marketing digital para meu negócio.', '_blank')}>
                💬 Falar no WhatsApp
              </Button>
            </div>

            {/* Social Media */}
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

