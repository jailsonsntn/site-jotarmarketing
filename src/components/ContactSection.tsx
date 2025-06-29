

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useScrollZoom } from '@/hooks/useScrollZoom';

const ContactSection = () => {
  const sectionRef = useScrollZoom();
  const titleRef = useScrollZoom({ threshold: 0.3 });
  const formRef = useScrollZoom({ threshold: 0.2 });
  const contactInfoRef = useScrollZoom({ threshold: 0.2 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    interest: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.whatsapp || !formData.interest) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para receber sua proposta personalizada.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Mensagem enviada!",
      description: "Nossa equipe entrará em contato em breve."
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      whatsapp: '',
      interest: '',
      message: ''
    });
  };

  const contactInfo = [{
    icon: "📧",
    title: "E-mail",
    info: "contato@jotarmarketing.com.br",
    action: "mailto:contato@jotarmarketing.com.br"
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

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-xl border-2 border-marketing-orange/20" ref={formRef}>
            <CardHeader className="bg-gradient-to-r from-marketing-green to-marketing-orange text-white rounded-t-lg">
              <CardTitle className="text-2xl text-center">
                📋 Solicite uma Proposta
              </CardTitle>
              <p className="text-center text-sm opacity-90">
                Conte-nos sobre seu projeto
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <Input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Seu nome" className="w-full" required />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <Input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="seu@email.com" className="w-full" required />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    WhatsApp *
                  </label>
                  <Input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} placeholder="(11) 99999-9999" className="w-full" required />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Interesse *
                  </label>
                  <select name="interest" value={formData.interest} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marketing-orange focus:border-transparent" required>
                    <option value="">Selecione um serviço</option>
                    <option value="trafego-pago">🎯 Tráfego Pago</option>
                    <option value="social-media">📱 Gestão de Redes Sociais</option>
                    <option value="criativos">🎨 Design e Criativos</option>
                    <option value="landing-pages">💻 Sites e Landing Pages</option>
                    <option value="consultoria">📊 Consultoria em Marketing</option>
                    <option value="seo">🔍 SEO e Conteúdo</option>
                    <option value="todos">🚀 Estratégia Completa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mensagem
                  </label>
                  <Textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Conte-nos mais sobre seu projeto e objetivos" className="w-full h-24" />
                </div>

                <Button type="submit" className="w-full bg-marketing-orange hover:bg-marketing-orange/90 text-white py-4 text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  📩 Enviar Proposta
                </Button>
                
                <p className="text-xs text-center text-gray-500">
                  Resposta em até 24 horas
                </p>
              </form>
            </CardContent>
          </Card>

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

