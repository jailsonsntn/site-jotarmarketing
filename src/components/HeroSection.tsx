import { Button } from '@/components/ui/button';
import { useScrollZoom } from '@/hooks/useScrollZoom';
const HeroSection = () => {
  const heroRef = useScrollZoom({
    threshold: 0.1
  });
  const contentRef = useScrollZoom({
    threshold: 0.2
  });
  const imageRef = useScrollZoom({
    threshold: 0.3
  });
  return <section id="inicio" className="pt-20 min-h-screen flex items-center relative overflow-hidden" ref={heroRef} style={{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop&crop=center')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'
  }}>
      {/* Modern geometric overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-marketing-orange/10 via-transparent to-marketing-green/10"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-marketing-orange/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-marketing-green/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div ref={contentRef} className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Transforme o seu negócio em uma máquina de
              <span className="text-marketing-orange"> atrair clientes</span>
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Estratégias de marketing digital que realmente funcionam. 
              Chega de investir sem ver resultado.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-marketing-orange hover:bg-marketing-orange/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg" onClick={() => window.open('https://wa.me/+5513985994965?text=Quero aumentar minhas vendas! Como posso começar?', '_blank')}>
                🚀 Quero Aumentar Minhas Vendas
              </Button>
              <Button variant="outline" size="lg" onClick={() => document.getElementById('servicos')?.scrollIntoView({
              behavior: 'smooth'
            })} className="border-2 border-white hover:bg-white hover:text-marketing-green px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 backdrop-blur-sm text-neutral-950">
                Ver Nossos Serviços
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-marketing-orange">200%</div>
                <div className="text-sm text-gray-300">Crescimento Médio</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-marketing-orange">R$ 5K+</div>
                <div className="text-sm text-gray-300">Em Tráfego Investido</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-marketing-orange">50+</div>
                <div className="text-sm text-gray-300">Clientes Atendidos</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div ref={imageRef}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-marketing-orange/20 to-marketing-green/20 rounded-2xl transform rotate-3 backdrop-blur-sm"></div>
              <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop" alt="Marketing Digital" className="relative z-10 w-full h-[400px] object-cover rounded-2xl shadow-2xl border border-white/10" />
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg animate-bounce z-30">
                <div className="text-2xl">📈</div>
                <div className="text-xs font-semibold text-marketing-green">Mais Vendas</div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg animate-bounce delay-500 z-30">
                <div className="text-2xl">🎯</div>
                <div className="text-xs font-semibold text-marketing-green">Resultados Reais</div>
              </div>

              {/* Logo overlay */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                <img src="/uploads/fc9645a5-0ea8-413a-aa15-5ded98d3c7ee.png" alt="Jota R Marketing" className="h-8 w-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;