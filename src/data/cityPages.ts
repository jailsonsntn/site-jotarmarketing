export type CityPageContent = {
  slug: string;
  cityName: string;
  fullName: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  seoFocus: string[];
  neighborhoods: string[];
  faq: Array<{ question: string; answer: string }>;
};

export const CITY_PAGES: Record<string, CityPageContent> = {
  praiagrande: {
    slug: "praiagrande",
    cityName: "Praia Grande",
    fullName: "Praia Grande - SP",
    title: "Criação de Sites em Praia Grande | JR Marketing",
    description:
      "Criação de sites profissionais em Praia Grande, com SEO técnico especializado, performance e estrutura sob medida para gerar contatos locais.",
    heading: "Criação de Sites em Praia Grande com SEO Local",
    intro:
      "Desenvolvemos sites sob medida para negócios de Praia Grande que querem aparecer no Google e converter visitantes em clientes reais.",
    seoFocus: ["criação de sites em Praia Grande", "site profissional Praia Grande", "SEO local Praia Grande"],
    neighborhoods: ["Canto do Forte", "Boqueirão", "Ocian", "Guilhermina", "Tupi"],
    faq: [
      {
        question: "Em quanto tempo um site fica pronto em Praia Grande?",
        answer: "A média de entrega varia entre 10 e 21 dias, dependendo do escopo e do volume de páginas.",
      },
      {
        question: "Vocês fazem SEO local para Praia Grande?",
        answer: "Sim. Estruturamos o site com palavras-chave locais, schema e boas práticas técnicas para ranqueamento regional.",
      },
    ],
  },
  santos: {
    slug: "santos",
    cityName: "Santos",
    fullName: "Santos - SP",
    title: "Criação de Sites em Santos | Jota R Web | SEO Local",
    description:
      "Criação de sites em Santos com SEO local, performance e conversão para empresas que querem aparecer no Google e gerar mais contatos.",
    heading: "Criação de Sites em Santos com SEO Local",
    intro:
      "Desenvolvemos sites estratégicos para empresas de Santos com foco em autoridade digital, visibilidade no Google e geração de oportunidades reais.",
    seoFocus: ["criação de sites em Santos", "site profissional Santos", "SEO local Santos"],
    neighborhoods: ["Gonzaga", "Aparecida", "Ponta da Praia", "Embare", "Marape"],
    faq: [
      {
        question: "Qual o diferencial de um site premium para empresas de Santos?",
        answer: "Unimos design, velocidade e SEO para melhorar visibilidade, experiência do usuário e conversão.",
      },
      {
        question: "Vocês atendem empresas de serviços e comércio em Santos?",
        answer: "Sim. Estruturamos soluções para diferentes segmentos com foco em resultado local.",
      },
    ],
  },
  saovicente: {
    slug: "saovicente",
    cityName: "São Vicente",
    fullName: "São Vicente - SP",
    title: "Criação de Sites em São Vicente | JR Marketing",
    description:
      "Criação de sites em São Vicente, com foco em SEO local, performance e conversão para pequenos e médios negócios.",
    heading: "Site Profissional em São Vicente com Alta Conversão",
    intro:
      "Ajudamos empresas de São Vicente a ganhar presença digital forte com páginas otimizadas para gerar contato e vendas.",
    seoFocus: ["site em São Vicente", "criação de site São Vicente", "SEO em São Vicente"],
    neighborhoods: ["Centro", "Itararé", "Boa Vista", "Catiapoá", "Parque Bitaru"],
    faq: [
      {
        question: "Um site local pode gerar mais contatos em São Vicente?",
        answer: "Sim. Com estrutura de SEO local e conteúdo estratégico, o site tende a atrair buscas qualificadas da cidade.",
      },
      {
        question: "O site será responsivo para celular?",
        answer: "Sim. Todos os projetos são desenvolvidos com experiência mobile prioritária.",
      },
    ],
  },
  cubatao: {
    slug: "cubatao",
    cityName: "Cubatão",
    fullName: "Cubatão - SP",
    title: "Criação de Sites em Cubatão | JR Marketing",
    description:
      "Criação de sites em Cubatão para indústrias, comércio e serviços, com SEO técnico e desempenho de alto nível.",
    heading: "Criação de Sites em Cubatão com Estratégia Local",
    intro:
      "Construímos sites para empresas de Cubatão com foco em credibilidade online e geração de oportunidades comerciais.",
    seoFocus: ["criação de sites Cubatão", "site profissional Cubatão", "agência web Cubatão"],
    neighborhoods: ["Centro", "Jardim Casqueiro", "Vila Nova", "Vila dos Pescadores", "Parque São Luís"],
    faq: [
      {
        question: "Vocês atendem empresas industriais em Cubatão?",
        answer: "Sim. Estruturamos páginas institucionais técnicas e comerciais para indústrias e prestadores de serviços.",
      },
      {
        question: "O projeto inclui SEO técnico?",
        answer: "Sim. Aplicamos boas práticas de indexação, performance e semântica desde o início.",
      },
    ],
  },
  guaruja: {
    slug: "guaruja",
    cityName: "Guarujá",
    fullName: "Guarujá - SP",
    title: "Criação de Sites em Guarujá | JR Marketing",
    description:
      "Criação de sites em Guarujá para empresas de turismo, comércio e serviços. Estrutura premium com SEO e foco em resultados.",
    heading: "Desenvolvimento Web em Guarujá para Crescer no Digital",
    intro:
      "Criamos sites de alto impacto para negócios de Guarujá, com estratégia de conteúdo, UX e otimização para buscas locais.",
    seoFocus: ["criação de sites Guarujá", "site para empresa no Guarujá", "SEO local Guarujá"],
    neighborhoods: ["Pitangueiras", "Enseada", "Asturias", "Pernambuco", "Tombo"],
    faq: [
      {
        question: "Um site ajuda no posicionamento local em Guarujá?",
        answer: "Sim. O site estruturado com SEO local melhora a presença em pesquisas por serviços na cidade.",
      },
      {
        question: "Vocês fazem landing pages para campanhas?",
        answer: "Sim. Criamos landing pages com foco em conversão para tráfego pago e busca orgânica.",
      },
    ],
  },
  bertioga: {
    slug: "bertioga",
    cityName: "Bertioga",
    fullName: "Bertioga - SP",
    title: "Criação de Sites em Bertioga | JR Marketing",
    description:
      "Criação de sites profissionais em Bertioga, com design moderno, SEO local e performance para gerar mais contatos e vendas.",
    heading: "Site Profissional em Bertioga com SEO Avançado",
    intro:
      "Desenvolvemos sites para empresas de Bertioga, com estrutura estratégica para atrair clientes da região e fortalecer a marca.",
    seoFocus: ["criação de sites Bertioga", "site profissional Bertioga", "desenvolvimento web Bertioga"],
    neighborhoods: ["Centro", "Riviera de São Lourenço", "Indaia", "Vista Linda", "Boraceia"],
    faq: [
      {
        question: "O site pode ser atualizado depois do lançamento?",
        answer: "Sim. Entregamos estrutura pronta para evolução, com suporte e melhorias contínuas.",
      },
      {
        question: "Vocês atendem empresas de diferentes portes em Bertioga?",
        answer: "Sim. Adaptamos o projeto para pequenos, médios e grandes negócios.",
      },
    ],
  },
};
