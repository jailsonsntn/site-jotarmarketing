import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, "../dist");
const INDEX_FILE = path.join(DIST_DIR, "index.html");
const SITE_URL = "https://www.jotarmarketing.com.br";

const ROUTES = [
  {
    path: "/praiagrande",
    title: "Criação de Sites em Praia Grande | JR Marketing",
    description:
      "Criação de sites profissionais em Praia Grande com SEO técnico, performance e estrutura para gerar contatos locais.",
    heading: "Criação de Sites em Praia Grande com SEO Local",
    body: [
      "Desenvolvemos sites para empresas de Praia Grande com foco em autoridade digital, carregamento rápido e geração de leads.",
      "A estrutura inclui semântica, metadados, links internos e conteúdo orientado à intenção de busca local.",
    ],
  },
  {
    path: "/santos",
    title: "Criação de Sites em Santos | JR Marketing",
    description:
      "Criação de sites em Santos com SEO local, performance e conversão para empresas que querem aparecer no Google.",
    heading: "Criação de Sites em Santos com SEO Local",
    body: [
      "Criamos sites institucionais e landing pages para empresas de Santos com foco em presença digital consistente.",
      "Cada projeto é estruturado para facilitar indexação, melhorar experiência mobile e aumentar contatos comerciais.",
    ],
  },
  {
    path: "/saovicente",
    title: "Criação de Sites em São Vicente | JR Marketing",
    description:
      "Criação de sites em São Vicente com foco em SEO local, performance e conversão para pequenos e médios negócios.",
    heading: "Site Profissional em São Vicente com Alta Conversão",
    body: [
      "Ajudamos empresas de São Vicente a ganhar visibilidade no Google com páginas otimizadas e conteúdo estratégico.",
      "Aplicamos SEO técnico desde a base para melhorar rastreabilidade, relevância temática e potencial de ranqueamento.",
    ],
  },
  {
    path: "/cubatao",
    title: "Criação de Sites em Cubatão | JR Marketing",
    description:
      "Criação de sites em Cubatão para comércio, indústrias e serviços, com SEO técnico e alto desempenho.",
    heading: "Criação de Sites em Cubatão com Estratégia Local",
    body: [
      "Desenvolvemos projetos digitais sob medida para negócios de Cubatão com foco em credibilidade e geração de oportunidades.",
      "Estruturamos páginas com arquitetura clara, CTAs estratégicos e melhorias contínuas de performance.",
    ],
  },
  {
    path: "/guaruja",
    title: "Criação de Sites em Guarujá | JR Marketing",
    description:
      "Criação de sites em Guarujá para empresas de turismo, comércio e serviços, com SEO local e foco em resultados.",
    heading: "Desenvolvimento Web em Guarujá para Crescer no Digital",
    body: [
      "Projetos para empresas do Guarujá com design estratégico, conteúdo contextual e base técnica para indexação.",
      "A proposta é transformar tráfego em contatos qualificados com uma jornada clara até o orçamento.",
    ],
  },
  {
    path: "/bertioga",
    title: "Criação de Sites em Bertioga | JR Marketing",
    description:
      "Criação de sites profissionais em Bertioga com design moderno, SEO local e performance para gerar mais contatos.",
    heading: "Site Profissional em Bertioga com SEO Avançado",
    body: [
      "Construímos sites para empresas de Bertioga com foco em posicionamento local e diferenciação da marca.",
      "A entrega inclui estrutura pronta para evolução de conteúdo, campanhas e melhorias de conversão.",
    ],
  },
  {
    path: "/orcamento",
    title: "Solicitar Orçamento de Site Profissional | JR Marketing",
    description:
      "Solicite um orçamento para criação de site com SEO técnico, performance e estratégia de conversão.",
    heading: "Solicitar Orçamento para Site Profissional",
    body: [
      "Nesta página você encontra o formulário de briefing para receber uma proposta personalizada para seu projeto.",
      "A análise inicial considera objetivos de negócio, escopo técnico, prazo e oportunidades de SEO local.",
    ],
  },
  {
    path: "/sobre",
    title: "Sobre a JR Marketing | Criação de Sites em Praia Grande",
    description:
      "Conheça a JR Marketing, agência focada em criação de sites, SEO técnico e geração de oportunidades comerciais.",
    heading: "Sobre a JR Marketing",
    body: [
      "A JR Marketing atua em Praia Grande e Baixada Santista com desenvolvimento de sites sob medida para empresas.",
      "Nossa metodologia combina estratégia, implementação técnica e otimização contínua para crescimento digital.",
    ],
  },
  {
    path: "/contato",
    title: "Contato | JR Marketing em Praia Grande",
    description:
      "Canal de contato da JR Marketing para projetos de criação de sites, SEO técnico e presença digital local.",
    heading: "Contato JR Marketing",
    body: [
      "Fale com nossa equipe para solicitar análise da presença digital e entender a melhor estrutura para seu site.",
      "Atendemos empresas da Baixada Santista e de outras regiões com reuniões online e execução sob medida.",
    ],
  },
  {
    path: "/blog",
    title: "Blog de SEO Local e Conversão | JR Marketing",
    description:
      "Artigos práticos sobre SEO local, performance e conversão para empresas da Baixada Santista e todo Brasil.",
    heading: "Blog de SEO Local e Conversão",
    body: [
      "O blog reúne conteúdos sobre ranqueamento orgânico, arquitetura de páginas e geração de leads com site profissional.",
      "Cada artigo foi planejado para responder dúvidas reais de empresas que precisam crescer no digital com consistência.",
    ],
  },
];

const LINK_SECTIONS = [
  '<h2>Links principais</h2>',
  '<p><a href="/">Home</a> · <a href="/orcamento">Orçamento</a> · <a href="/blog">Blog</a> · <a href="/sobre">Sobre</a> · <a href="/contato">Contato</a></p>',
  '<p><a href="/praiagrande">Praia Grande</a> · <a href="/santos">Santos</a> · <a href="/saovicente">São Vicente</a> · <a href="/cubatao">Cubatão</a> · <a href="/guaruja">Guarujá</a> · <a href="/bertioga">Bertioga</a></p>',
].join("\n");

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildStaticMain(route) {
  const paragraphs = route.body
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("\n");

  return [
    '<main id="seo-static-home" aria-label="Conteúdo principal para rastreadores e navegação sem JavaScript">',
    `  <h1>${escapeHtml(route.heading)}</h1>`,
    `  ${paragraphs}`,
    `  ${LINK_SECTIONS}`,
    '</main>',
  ].join("\n");
}

function patchHtml(baseHtml, route) {
  const canonicalUrl = `${SITE_URL}${route.path}`;
  const staticMain = buildStaticMain(route);

  let html = baseHtml;
  html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(route.title)}<\/title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeHtml(route.description)}" />`
  );
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonicalUrl}" />`);
  html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeHtml(route.title)}" />`);
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`
  );
  html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonicalUrl}/" />`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`);
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
  );
  html = html.replace(/<main id="seo-static-home"[\s\S]*?<\/main>/, staticMain);

  return html;
}

async function writeRouteHtml(baseHtml, route) {
  const routeDir = path.join(DIST_DIR, route.path.slice(1));
  const routeFile = path.join(routeDir, "index.html");
  const html = patchHtml(baseHtml, route);

  await fs.mkdir(routeDir, { recursive: true });
  await fs.writeFile(routeFile, html, "utf8");
}

async function main() {
  const baseHtml = await fs.readFile(INDEX_FILE, "utf8");

  for (const route of ROUTES) {
    await writeRouteHtml(baseHtml, route);
  }

  console.log(`Páginas HTML estáticas geradas para ${ROUTES.length} rotas em ${DIST_DIR}`);
}

main().catch((error) => {
  console.error("Falha ao gerar HTML estático por rota:", error);
  process.exitCode = 1;
});
