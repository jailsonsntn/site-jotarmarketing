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
        answer:
          "A média de entrega varia entre 10 e 21 dias, dependendo do escopo e do volume de páginas. Sites institucionais simples ficam prontos mais rápido; projetos com mais páginas ou integrações levam um pouco mais.",
      },
      {
        question: "Vocês fazem SEO local para Praia Grande?",
        answer:
          "Sim. Estruturamos o site com palavras-chave locais, dados estruturados (schema) e boas práticas técnicas voltadas para ranqueamento regional em Praia Grande e região.",
      },
      {
        question: "Qual o investimento para criar um site em Praia Grande?",
        answer:
          "Trabalhamos com planos mensais a partir de R$97, com opções intermediárias e avançadas conforme a necessidade do negócio. O valor final depende do escopo — pedir um orçamento sem compromisso é o jeito mais rápido de saber o valor exato.",
      },
      {
        question: "Como funciona o processo de criação do site, do orçamento à entrega?",
        answer:
          "Começa com um diagnóstico rápido pelo WhatsApp, seguido de proposta com escopo e prazo definidos. Após aprovação, desenvolvemos o site, revisamos junto com você e publicamos com o domínio já configurado.",
      },
      {
        question: "O site inclui hospedagem e manutenção?",
        answer:
          "Sim. Os planos já incluem hospedagem e manutenção contínua, sem custo extra de infraestrutura para você se preocupar depois da entrega.",
      },
      {
        question: "Vocês atendem comércio local e prestadores de serviço em Praia Grande?",
        answer:
          "Sim. Desenvolvemos sites para comércios, prestadores de serviço, clínicas e pequenas empresas de Praia Grande que precisam de presença digital profissional para gerar contatos qualificados.",
      },
      {
        question: "Fazem site para imobiliárias em Praia Grande?",
        answer:
          "Sim, desenvolvemos sites para imobiliárias com estrutura pensada para o que o comprador busca antes de ligar: preço, localização, condições e facilidade de contato.",
      },
      {
        question: "Por que contratar uma agência local em vez de uma nacional genérica?",
        answer:
          "Conhecemos a realidade de Praia Grande e região — do público local ao tipo de busca que os moradores fazem no Google. Isso resulta em um site com linguagem e estratégia mais alinhadas ao seu cliente real, não um modelo genérico replicado para qualquer cidade do Brasil.",
      },
      {
        question: "O atendimento é presencial ou remoto?",
        answer:
          "Nossa sede é em Praia Grande - SP, com atendimento remoto para toda a Baixada Santista, Brasil e clientes no exterior. Todo o processo — briefing, aprovação e suporte — acontece pelo WhatsApp e videochamada, sem perda de agilidade.",
      },
      {
        question: "Vocês atendem empresas no Canto do Forte e no Boqueirão?",
        answer:
          "Sim, atendemos empresas em toda Praia Grande, incluindo Canto do Forte, Boqueirão, Ocian, Guilhermina, Tupi e demais regiões da cidade.",
      },
      {
        question: "O site já vem otimizado para aparecer no Google (SEO técnico)?",
        answer:
          "Sim. Todo site é entregue com estrutura técnica de SEO: performance de carregamento, dados estruturados, meta tags e semântica orientada à intenção de busca local em Praia Grande.",
      },
      {
        question: "Como funciona o suporte após a entrega do site?",
        answer:
          "Após a publicação, seguimos disponíveis para ajustes, atualizações de conteúdo e suporte técnico conforme o plano contratado, garantindo que o site continue no ar e atualizado.",
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
    neighborhoods: ["Gonzaga", "Aparecida", "Ponta da Praia", "Embare", "Marapé"],
    faq: [
      {
        question: "Em quanto tempo um site fica pronto em Santos?",
        answer:
          "A média de entrega varia entre 10 e 21 dias, dependendo do escopo e do volume de páginas. Sites institucionais simples ficam prontos mais rápido; projetos com mais páginas ou integrações levam um pouco mais.",
      },
      {
        question: "Vocês fazem SEO local para Santos?",
        answer:
          "Sim. Estruturamos o site com palavras-chave locais, dados estruturados (schema) e boas práticas técnicas voltadas para ranqueamento regional em Santos e região.",
      },
      {
        question: "Qual o investimento para criar um site em Santos?",
        answer:
          "Trabalhamos com planos mensais a partir de R$97, com opções intermediárias e avançadas conforme a necessidade do negócio. O valor final depende do escopo — pedir um orçamento sem compromisso é o jeito mais rápido de saber o valor exato.",
      },
      {
        question: "Qual o diferencial de um site premium para empresas de Santos?",
        answer:
          "Unimos design, velocidade e SEO técnico para melhorar visibilidade, experiência do usuário e conversão, entregando um site que gera contatos reais, não só bonito.",
      },
      {
        question: "O site inclui hospedagem e manutenção?",
        answer:
          "Sim. Os planos já incluem hospedagem e manutenção contínua, sem custo extra de infraestrutura para você se preocupar depois da entrega.",
      },
      {
        question: "Vocês atendem empresas de serviços e comércio em Santos?",
        answer:
          "Sim. Estruturamos soluções para diferentes segmentos — comércio, prestadores de serviço, clínicas e pequenas empresas — com foco em resultado local em Santos.",
      },
      {
        question: "Fazem site para imobiliárias em Santos?",
        answer:
          "Sim, desenvolvemos sites para imobiliárias com estrutura pensada para o que o comprador busca antes de ligar: preço, localização, condições e facilidade de contato.",
      },
      {
        question: "Por que contratar uma agência local em vez de uma nacional genérica?",
        answer:
          "Conhecemos a realidade de Santos e região — do público local ao tipo de busca que os moradores fazem no Google. Isso resulta em um site com linguagem e estratégia mais alinhadas ao seu cliente real, não um modelo genérico replicado para qualquer cidade do Brasil.",
      },
      {
        question: "O atendimento é presencial ou remoto?",
        answer:
          "Nossa sede é em Praia Grande - SP, com atendimento remoto para Santos, todo o Brasil e clientes no exterior. Todo o processo — briefing, aprovação e suporte — acontece pelo WhatsApp e videochamada, sem perda de agilidade.",
      },
      {
        question: "Vocês atendem empresas no Gonzaga e na Aparecida?",
        answer:
          "Sim, atendemos empresas em toda Santos, incluindo Gonzaga, Aparecida, Ponta da Praia, Embare, Marapé e demais regiões da cidade.",
      },
      {
        question: "O site já vem otimizado para aparecer no Google (SEO técnico)?",
        answer:
          "Sim. Todo site é entregue com estrutura técnica de SEO: performance de carregamento, dados estruturados, meta tags e semântica orientada à intenção de busca local em Santos.",
      },
      {
        question: "Como funciona o suporte após a entrega do site?",
        answer:
          "Após a publicação, seguimos disponíveis para ajustes, atualizações de conteúdo e suporte técnico conforme o plano contratado, garantindo que o site continue no ar e atualizado.",
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
        question: "Em quanto tempo um site fica pronto em São Vicente?",
        answer:
          "A média de entrega varia entre 10 e 21 dias, dependendo do escopo e do volume de páginas. Sites institucionais simples ficam prontos mais rápido; projetos com mais páginas ou integrações levam um pouco mais.",
      },
      {
        question: "Um site local pode gerar mais contatos em São Vicente?",
        answer:
          "Sim. Com estrutura de SEO local, palavras-chave regionais e conteúdo estratégico, o site tende a atrair buscas qualificadas de moradores e empresas da cidade.",
      },
      {
        question: "Qual o investimento para criar um site em São Vicente?",
        answer:
          "Trabalhamos com planos mensais a partir de R$97, com opções intermediárias e avançadas conforme a necessidade do negócio. O valor final depende do escopo — pedir um orçamento sem compromisso é o jeito mais rápido de saber o valor exato.",
      },
      {
        question: "O site será responsivo para celular?",
        answer:
          "Sim. Todos os projetos são desenvolvidos com experiência mobile prioritária, já que a maior parte das buscas locais acontece pelo celular.",
      },
      {
        question: "O site inclui hospedagem e manutenção?",
        answer:
          "Sim. Os planos já incluem hospedagem e manutenção contínua, sem custo extra de infraestrutura para você se preocupar depois da entrega.",
      },
      {
        question: "Vocês atendem comércio local e prestadores de serviço em São Vicente?",
        answer:
          "Sim. Desenvolvemos sites para comércios, prestadores de serviço, clínicas e pequenas empresas de São Vicente que precisam de presença digital profissional para gerar contatos qualificados.",
      },
      {
        question: "Fazem site para imobiliárias em São Vicente?",
        answer:
          "Sim, desenvolvemos sites para imobiliárias com estrutura pensada para o que o comprador busca antes de ligar: preço, localização, condições e facilidade de contato.",
      },
      {
        question: "Por que contratar uma agência local em vez de uma nacional genérica?",
        answer:
          "Conhecemos a realidade de São Vicente e região — do público local ao tipo de busca que os moradores fazem no Google. Isso resulta em um site com linguagem e estratégia mais alinhadas ao seu cliente real, não um modelo genérico replicado para qualquer cidade do Brasil.",
      },
      {
        question: "O atendimento é presencial ou remoto?",
        answer:
          "Nossa sede é em Praia Grande - SP, com atendimento remoto para São Vicente, todo o Brasil e clientes no exterior. Todo o processo — briefing, aprovação e suporte — acontece pelo WhatsApp e videochamada, sem perda de agilidade.",
      },
      {
        question: "Vocês atendem empresas no Centro e no Itararé?",
        answer:
          "Sim, atendemos empresas em toda São Vicente, incluindo Centro, Itararé, Boa Vista, Catiapoá, Parque Bitaru e demais regiões da cidade.",
      },
      {
        question: "O site já vem otimizado para aparecer no Google (SEO técnico)?",
        answer:
          "Sim. Todo site é entregue com estrutura técnica de SEO: performance de carregamento, dados estruturados, meta tags e semântica orientada à intenção de busca local em São Vicente.",
      },
      {
        question: "Como funciona o suporte após a entrega do site?",
        answer:
          "Após a publicação, seguimos disponíveis para ajustes, atualizações de conteúdo e suporte técnico conforme o plano contratado, garantindo que o site continue no ar e atualizado.",
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
        question: "Em quanto tempo um site fica pronto em Cubatão?",
        answer:
          "A média de entrega varia entre 10 e 21 dias, dependendo do escopo e do volume de páginas. Sites institucionais simples ficam prontos mais rápido; projetos com mais páginas ou integrações levam um pouco mais.",
      },
      {
        question: "Vocês atendem empresas industriais em Cubatão?",
        answer:
          "Sim. Estruturamos páginas institucionais técnicas e comerciais para indústrias, comércio e prestadores de serviço de Cubatão que precisam de presença digital profissional.",
      },
      {
        question: "Qual o investimento para criar um site em Cubatão?",
        answer:
          "Trabalhamos com planos mensais a partir de R$97, com opções intermediárias e avançadas conforme a necessidade do negócio. O valor final depende do escopo — pedir um orçamento sem compromisso é o jeito mais rápido de saber o valor exato.",
      },
      {
        question: "O projeto inclui SEO técnico?",
        answer:
          "Sim. Aplicamos boas práticas de indexação, performance de carregamento, dados estruturados e semântica orientada à intenção de busca local desde o início do projeto.",
      },
      {
        question: "O site inclui hospedagem e manutenção?",
        answer:
          "Sim. Os planos já incluem hospedagem e manutenção contínua, sem custo extra de infraestrutura para você se preocupar depois da entrega.",
      },
      {
        question: "Vocês fazem SEO local para Cubatão?",
        answer:
          "Sim. Estruturamos o site com palavras-chave locais, dados estruturados (schema) e boas práticas técnicas voltadas para ranqueamento regional em Cubatão e região.",
      },
      {
        question: "Fazem site para imobiliárias em Cubatão?",
        answer:
          "Sim, desenvolvemos sites para imobiliárias com estrutura pensada para o que o comprador busca antes de ligar: preço, localização, condições e facilidade de contato.",
      },
      {
        question: "Por que contratar uma agência local em vez de uma nacional genérica?",
        answer:
          "Conhecemos a realidade de Cubatão e região — do público local ao tipo de busca que os moradores fazem no Google. Isso resulta em um site com linguagem e estratégia mais alinhadas ao seu cliente real, não um modelo genérico replicado para qualquer cidade do Brasil.",
      },
      {
        question: "O atendimento é presencial ou remoto?",
        answer:
          "Nossa sede é em Praia Grande - SP, com atendimento remoto para Cubatão, todo o Brasil e clientes no exterior. Todo o processo — briefing, aprovação e suporte — acontece pelo WhatsApp e videochamada, sem perda de agilidade.",
      },
      {
        question: "Vocês atendem empresas no Jardim Casqueiro e na Vila Nova?",
        answer:
          "Sim, atendemos empresas em toda Cubatão, incluindo Centro, Jardim Casqueiro, Vila Nova, Vila dos Pescadores, Parque São Luís e demais regiões da cidade.",
      },
      {
        question: "O site já vem otimizado para aparecer no Google (SEO técnico)?",
        answer:
          "Sim. Todo site é entregue com estrutura técnica de SEO: performance de carregamento, dados estruturados, meta tags e semântica orientada à intenção de busca local em Cubatão.",
      },
      {
        question: "Como funciona o suporte após a entrega do site?",
        answer:
          "Após a publicação, seguimos disponíveis para ajustes, atualizações de conteúdo e suporte técnico conforme o plano contratado, garantindo que o site continue no ar e atualizado.",
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
    neighborhoods: ["Pitangueiras", "Enseada", "Astúrias", "Pernambuco", "Tombo"],
    faq: [
      {
        question: "Em quanto tempo um site fica pronto em Guarujá?",
        answer:
          "A média de entrega varia entre 10 e 21 dias, dependendo do escopo e do volume de páginas. Sites institucionais simples ficam prontos mais rápido; projetos com mais páginas ou integrações levam um pouco mais.",
      },
      {
        question: "Um site ajuda no posicionamento local em Guarujá?",
        answer:
          "Sim. O site estruturado com SEO local, palavras-chave regionais e dados estruturados melhora a presença em pesquisas por serviços e negócios na cidade.",
      },
      {
        question: "Qual o investimento para criar um site em Guarujá?",
        answer:
          "Trabalhamos com planos mensais a partir de R$97, com opções intermediárias e avançadas conforme a necessidade do negócio. O valor final depende do escopo — pedir um orçamento sem compromisso é o jeito mais rápido de saber o valor exato.",
      },
      {
        question: "Vocês fazem landing pages para campanhas em Guarujá?",
        answer:
          "Sim. Criamos landing pages com foco em conversão para tráfego pago e busca orgânica, ideais para temporada de alta procura na cidade.",
      },
      {
        question: "O site inclui hospedagem e manutenção?",
        answer:
          "Sim. Os planos já incluem hospedagem e manutenção contínua, sem custo extra de infraestrutura para você se preocupar depois da entrega.",
      },
      {
        question: "Vocês atendem empresas de turismo e comércio em Guarujá?",
        answer:
          "Sim. Desenvolvemos sites para pousadas, comércios, prestadores de serviço e negócios ligados ao turismo em Guarujá, com foco em gerar contatos qualificados.",
      },
      {
        question: "Fazem site para imobiliárias em Guarujá?",
        answer:
          "Sim, desenvolvemos sites para imobiliárias com estrutura pensada para o que o comprador busca antes de ligar: preço, localização, condições e facilidade de contato.",
      },
      {
        question: "Por que contratar uma agência local em vez de uma nacional genérica?",
        answer:
          "Conhecemos a realidade de Guarujá e região — do público local ao tipo de busca que os moradores e turistas fazem no Google. Isso resulta em um site com linguagem e estratégia mais alinhadas ao seu cliente real, não um modelo genérico replicado para qualquer cidade do Brasil.",
      },
      {
        question: "O atendimento é presencial ou remoto?",
        answer:
          "Nossa sede é em Praia Grande - SP, com atendimento remoto para Guarujá, todo o Brasil e clientes no exterior. Todo o processo — briefing, aprovação e suporte — acontece pelo WhatsApp e videochamada, sem perda de agilidade.",
      },
      {
        question: "Vocês atendem empresas nas Pitangueiras e na Enseada?",
        answer:
          "Sim, atendemos empresas em todo o Guarujá, incluindo Pitangueiras, Enseada, Astúrias, Pernambuco, Tombo e demais regiões da cidade.",
      },
      {
        question: "O site já vem otimizado para aparecer no Google (SEO técnico)?",
        answer:
          "Sim. Todo site é entregue com estrutura técnica de SEO: performance de carregamento, dados estruturados, meta tags e semântica orientada à intenção de busca local em Guarujá.",
      },
      {
        question: "Como funciona o suporte após a entrega do site?",
        answer:
          "Após a publicação, seguimos disponíveis para ajustes, atualizações de conteúdo e suporte técnico conforme o plano contratado, garantindo que o site continue no ar e atualizado.",
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
    neighborhoods: ["Centro", "Riviera de São Lourenço", "Indaiá", "Vista Linda", "Boracéia"],
    faq: [
      {
        question: "Em quanto tempo um site fica pronto em Bertioga?",
        answer:
          "A média de entrega varia entre 10 e 21 dias, dependendo do escopo e do volume de páginas. Sites institucionais simples ficam prontos mais rápido; projetos com mais páginas ou integrações levam um pouco mais.",
      },
      {
        question: "O site pode ser atualizado depois do lançamento?",
        answer:
          "Sim. Entregamos a estrutura pronta para evolução, com suporte e melhorias contínuas conforme o plano contratado.",
      },
      {
        question: "Qual o investimento para criar um site em Bertioga?",
        answer:
          "Trabalhamos com planos mensais a partir de R$97, com opções intermediárias e avançadas conforme a necessidade do negócio. O valor final depende do escopo — pedir um orçamento sem compromisso é o jeito mais rápido de saber o valor exato.",
      },
      {
        question: "Vocês atendem empresas de diferentes portes em Bertioga?",
        answer:
          "Sim. Adaptamos o projeto para pequenos, médios e grandes negócios de Bertioga, incluindo comércio, prestadores de serviço e negócios ligados ao turismo.",
      },
      {
        question: "O site inclui hospedagem e manutenção?",
        answer:
          "Sim. Os planos já incluem hospedagem e manutenção contínua, sem custo extra de infraestrutura para você se preocupar depois da entrega.",
      },
      {
        question: "Vocês fazem SEO local para Bertioga?",
        answer:
          "Sim. Estruturamos o site com palavras-chave locais, dados estruturados (schema) e boas práticas técnicas voltadas para ranqueamento regional em Bertioga e região.",
      },
      {
        question: "Fazem site para imobiliárias em Bertioga?",
        answer:
          "Sim, desenvolvemos sites para imobiliárias com estrutura pensada para o que o comprador busca antes de ligar: preço, localização, condições e facilidade de contato.",
      },
      {
        question: "Por que contratar uma agência local em vez de uma nacional genérica?",
        answer:
          "Conhecemos a realidade de Bertioga e região — do público local ao tipo de busca que os moradores e turistas fazem no Google. Isso resulta em um site com linguagem e estratégia mais alinhadas ao seu cliente real, não um modelo genérico replicado para qualquer cidade do Brasil.",
      },
      {
        question: "O atendimento é presencial ou remoto?",
        answer:
          "Nossa sede é em Praia Grande - SP, com atendimento remoto para Bertioga, todo o Brasil e clientes no exterior. Todo o processo — briefing, aprovação e suporte — acontece pelo WhatsApp e videochamada, sem perda de agilidade.",
      },
      {
        question: "Vocês atendem empresas na Riviera de São Lourenço e no Centro?",
        answer:
          "Sim, atendemos empresas em toda Bertioga, incluindo Centro, Riviera de São Lourenço, Indaiá, Vista Linda, Boracéia e demais regiões da cidade.",
      },
      {
        question: "O site já vem otimizado para aparecer no Google (SEO técnico)?",
        answer:
          "Sim. Todo site é entregue com estrutura técnica de SEO: performance de carregamento, dados estruturados, meta tags e semântica orientada à intenção de busca local em Bertioga.",
      },
      {
        question: "Como funciona o suporte após a entrega do site?",
        answer:
          "Após a publicação, seguimos disponíveis para ajustes, atualizações de conteúdo e suporte técnico conforme o plano contratado, garantindo que o site continue no ar e atualizado.",
      },
    ],
  },
};
