// Conteúdo real: Instagram @thaisdelajustina.arq (bio, legendas, comentários), Linktree, Google Sites e Google Maps.

const whatsappNumber = "5545999167501";

export const studio = {
  name: "Thais Dela Justina",
  role: "Arquiteta e Urbanista",
  nickname: "Arquiteta do LOFT",
  city: "Medianeira, PR",
  whatsappLabel: "(45) 99916-7501",
  whatsappNumber,
  whatsapp: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá, Thais! Vim pelo site e quero conversar sobre um projeto.")}`,
  instagram: "https://www.instagram.com/thaisdelajustina.arq/",
  youtube: "https://www.youtube.com/channel/UCtgZjdVbCwaItkvBQNrqzNw",
  linktree: "https://linktr.ee/thaisdelajustina",
  planilha: "https://drive.google.com/drive/folders/114jjehPNpV_mUyZC04XzN4xbmr_yPMzv",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Thais+Dela+Justina+Arquitetura+Medianeira",
  hours: "Seg. a sex., até 18h30",
};

/** Monta o link do WhatsApp com a mensagem do formulário. */
export function whatsappLink(text: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const nav = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Vídeos", href: "#videos" },
  { label: "Contato", href: "#contato" },
];

export const heroStats = [
  { value: "2,5", unit: "mi", label: "visualizações no vídeo da obra" },
  { value: "61,7", unit: "mil", label: "seguidores no Instagram" },
];

export const credentials = ["Arquiteta e Urbanista formada pela UDC, em Foz do Iguaçu", "Mestre em Tecnologias Ambientais pela UTFPR (2023)", "Canal Arquiteta do LOFT no YouTube, desde 2022"];

export type Service = { title: string; text: string; image: string };
export const services: Service[] = [
  { title: "Projeto arquitetônico", text: "Casas, sobrados e geminadas pensados para o seu terreno e para o seu orçamento, inclusive para construir em etapas.", image: "/img/casa-noite-0.webp" },
  { title: "Lofts e kitnets para renda", text: "Projetos compactos para quem constrói para alugar: bom aproveitamento do terreno, custo controlado e espaços que alugam fácil.", image: "/img/lofts-renda-1.webp" },
  { title: "Projeto de interiores", text: "Marcenaria, revestimentos, iluminação e layout para deixar a casa (ou o Airbnb) prática, bonita e com a sua cara.", image: "/img/loft-airbnb-0.webp" },
  { title: "Reformas", text: "Da varanda do sítio à fachada da casa da vó: renovar o que já existe, muitas vezes com orçamento pequeno.", image: "/img/varanda-0.webp" },
  { title: "Acompanhamento de obra", text: "Um bom acompanhamento faz a obra ficar fiel ao projeto, sem surpresas no meio do caminho.", image: "/img/barranco-obra-0.webp" },
  { title: "Regularização de imóveis", text: "Projetos para aprovar e regularizar o imóvel na prefeitura, com tudo dentro das normas.", image: "/img/casa63-0.webp" },
];

export const steps = [
  { n: "01", title: "Briefing", text: "A fase principal: entender como você vive, quanto pode gastar e o que precisa caber no terreno.", image: "/img/thais-cgs.webp" },
  { n: "02", title: "Planta e estudo", text: "Organizo os ambientes na planta-baixa, respeitando recuos, orçamento e os planos para o futuro.", image: "/img/casa3fases-0.webp" },
  { n: "03", title: "Projeto em 3D", text: "Você enxerga a casa pronta antes de assentar o primeiro tijolo e decide com segurança.", image: "/img/nossa-casa-2.webp" },
  { n: "04", title: "Obra", text: "Acompanho a execução para que a casa construída fique igual à que foi desenhada.", image: "/img/barranco-obra-1.webp" },
];

export type Project = {
  slug: string;
  title: string;
  place: string;
  year: string;
  tag: string;
  cover: string;
  text: string;
  facts?: string[];
  gallery: string[];
  before?: { label: string; images: string[] };
  credit?: string;
};

export const projects: Project[] = [
  {
    slug: "casa-no-barranco",
    title: "Casa no barranco",
    place: "Propriedade rural",
    year: "2026",
    tag: "Projeto + obra",
    cover: "/img/barranco-0.webp",
    text: "O que fazer quando você quer construir uma casa num barranco? A gente dá um jeito! São 150 m² com varanda para festas e vista para a natureza, sala e cozinha semi-integradas, suíte e dois quartos, e um subsolo para garagem e depósito, encaixado na paisagem.",
    facts: ["150 m²", "Suíte + 2 quartos", "Subsolo com garagem"],
    gallery: ["/img/barranco-0.webp", "/img/barranco-1.webp", "/img/barranco-2.webp", "/img/escada.webp"],
    before: { label: "Obra", images: ["/img/barranco-obra-0.webp", "/img/barranco-obra-1.webp", "/img/barranco-obra-2.webp"] },
  },
  {
    slug: "casa-150",
    title: "Casa de 150 m²",
    place: "Projeto para uma família",
    year: "2026",
    tag: "Projeto + obra",
    cover: "/img/casa150-0.webp",
    text: "Uma casa planejada e sonhada para uma família linda. Projetar e acompanhar essa obra foi um presente: no final ficaram grandes amigos e parceiros. Teve muito churrasco e picolé no caminho!",
    facts: ["150 m²", "Projeto e acompanhamento de obra"],
    gallery: ["/img/casa150-0.webp"],
    before: { label: "Obra", images: ["/img/casa150-obra-0.webp", "/img/casa150-obra-1.webp", "/img/casa150-obra-2.webp"] },
  },
  {
    slug: "quarto-aluguel",
    title: "Casa mobiliada para aluguel",
    place: "Quarto de casal",
    year: "2026",
    tag: "Interiores",
    cover: "/img/hero-quarto.webp",
    text: "Mobiliamos uma casa para aluguel: o quarto precisava ser agradável e útil, sem gastar muito com marcenaria. O resultado são móveis simples e bonitos.",
    gallery: ["/img/hero-quarto.webp"],
  },
  {
    slug: "lofts-para-renda",
    title: "Casa + 5 lofts",
    place: "Terreno de 348 m²",
    year: "2023",
    tag: "Renda",
    cover: "/img/lofts-renda-1.webp",
    text: "Um terreno de 348 m² com uma casa de 49 m² e cinco lofts de 27 a 30 m². Foi num desses lofts que eu morei, e foi lá que nasceu o canal Arquiteta do LOFT.",
    facts: ["1 casa de 49 m²", "5 lofts de 27 a 30 m²"],
    gallery: ["/img/lofts-renda-1.webp", "/img/lofts-renda-0.webp", "/img/lofts-renda-2.webp", "/img/lofts-renda-3.webp", "/img/lofts-fachada.webp"],
  },
  {
    slug: "loft-airbnb",
    title: "Loft para Airbnb",
    place: "Apartamento",
    year: "2024",
    tag: "Interiores",
    cover: "/img/loft-airbnb-0.webp",
    text: "Reaproveitamos os móveis que já existiam e criamos novos, com bastante espaço para guardar e utensílios básicos, mas completos, para receber os hóspedes.",
    gallery: ["/img/loft-airbnb-0.webp", "/img/loft-airbnb-1.webp", "/img/loft-airbnb-2.webp", "/img/loft-airbnb-3.webp", "/img/loft-airbnb-4.webp", "/img/studio-airbnb-0.webp", "/img/studio-airbnb-3.webp"],
    credit: "Renders e detalhamento: @rafaeladedonati",
  },
  {
    slug: "varanda-do-sitio",
    title: "Varanda do sítio",
    place: "Casa de madeira no campo",
    year: "2023",
    tag: "Reforma",
    cover: "/img/varanda-0.webp",
    text: "Era a varanda lateral de uma casa de madeira no sítio. Com projeto e muitas ideias, virou um espaço gourmet aconchegante para a família e os amigos.",
    gallery: ["/img/varanda-0.webp", "/img/varanda-1.webp", "/img/varanda-2.webp", "/img/varanda-3.webp", "/img/varanda-4.webp"],
    before: { label: "Antes", images: ["/img/varanda-antes.webp"] },
  },
];

export type Work = { src: string; title: string; cat: "Casas" | "Interiores" | "Áreas externas" | "Reformas"; text: string };
export const moreWork: Work[] = [
  { src: "/img/casa100.webp", title: "Casa com menos de 100 m²", cat: "Casas", text: "2 quartos + suíte, garagem preparada para ser coberta depois." },
  { src: "/img/casa3fases-0.webp", title: "Casa em 3 fases", cat: "Casas", text: "Começa com 66 m² e cresce com garagem, área de festas e suíte." },
  { src: "/img/casa-noite-0.webp", title: "Casa em 2 etapas", cat: "Casas", text: "53 m² na primeira fase, 122 m² ao final." },
  { src: "/img/casa-noite-3.webp", title: "Casa em 2 etapas, à noite", cat: "Casas", text: "A mesma casa, com a iluminação da fachada." },
  { src: "/img/nossa-casa-1.webp", title: "Nossa casa", cat: "Casas", text: "125 m² num terreno de 10 x 22, aberta para um quintal privativo." },
  { src: "/img/muro-0.webp", title: "Muro da fachada", cat: "Casas", text: "Projeto residencial em Medianeira." },
  { src: "/img/casa63-0.webp", title: "Casa de 63 m²", cat: "Casas", text: "Suíte, quarto e previsão de ampliação." },
  { src: "/img/reforma-int-0.webp", title: "Reforma e interiores", cat: "Interiores", text: "Revestimentos testados com a cliente dentro da loja." },
  { src: "/img/reforma-int-3.webp", title: "Cozinha integrada", cat: "Interiores", text: "Parte do mesmo projeto de reforma." },
  { src: "/img/quarto-verde-0.webp", title: "Quarto de bebê e escritório", cat: "Interiores", text: "Verde no lugar do azul de sempre. Render: @poiema.arquitetura." },
  { src: "/img/cozinha-escada-0.webp", title: "Meu primeiro projeto de interiores", cat: "Interiores", text: "A cozinha de uma grande amiga." },
  { src: "/img/studio-airbnb-0.webp", title: "Studio para Airbnb", cat: "Interiores", text: "Render: @rafaeladedonati." },
  { src: "/img/escada.webp", title: "Escada no talude", cat: "Áreas externas", text: "2 metros de altura vencidos com movimento, sem cantos para bichos." },
  { src: "/img/lazer-1.webp", title: "Área de lazer", cat: "Áreas externas", text: "Caibros aparentes e portas de vidro que abrem no verão." },
  { src: "/img/quintal-depois.webp", title: "Quintal de 7 x 12 m", cat: "Áreas externas", text: "Piscina para os filhos e extensão do espaço gourmet." },
  { src: "/img/casa-vo-0.webp", title: "Reforma da casa da vó", cat: "Reformas", text: "Orçamento pequeno, fachada renovada com cobogós." },
  { src: "/img/varanda-1.webp", title: "Varanda do sítio", cat: "Reformas", text: "De varanda lateral a espaço gourmet." },
];

export const transformations = [
  { slug: "barranco", title: "Casa no barranco", before: "/img/barranco-obra-0.webp", after: "/img/barranco-1.webp", beforeLabel: "Obra", afterLabel: "Pronta" },
  { slug: "varanda", title: "Varanda do sítio", before: "/img/varanda-antes.webp", after: "/img/varanda-0.webp", beforeLabel: "Antes", afterLabel: "Projeto" },
  { slug: "quintal", title: "Quintal de 7 x 12 m", before: "/img/quintal-antes.webp", after: "/img/quintal-depois.webp", beforeLabel: "Antes", afterLabel: "Depois" },
  { slug: "casa-150", title: "Casa de 150 m²", before: "/img/casa150-obra-0.webp", after: "/img/casa150-0.webp", beforeLabel: "Obra", afterLabel: "Pronta" },
];

export const videos = [
  { slug: "obra-comecou", title: "Começou a obra!", text: "O primeiro dia da nossa casa", views: "2,5 mi" },
  { slug: "loft-30", title: "Nosso LOFT de 30 m²", text: "Onde moramos de aluguel", views: "511 mil" },
  { slug: "varanda-sitio", title: "Varanda do sítio", text: "Antes e depois", views: "133 mil" },
  { slug: "banheiro", title: "Reforma de banheiro", text: "A transformação", views: "87 mil" },
  { slug: "casa-campo", title: "Casa moderna", text: "Suíte, 2 quartos e quintal", views: "80 mil" },
  { slug: "mobiliar-loft", title: "Quanto custou mobiliar o LOFT", text: "Os valores, móvel a móvel", views: "35 mil" },
  { slug: "espaco-gourmet", title: "Garagem + espaço gourmet", text: "Economizar metro quadrado", views: "28 mil" },
  { slug: "casa-1-ano", title: "1 ano na casa nova", text: "8 meses de obra, do início à mudança", views: "19 mil" },
];

export const advice = [
  { n: "01", title: "Não tenha pressa para começar a obra", text: "Muita gente começa só porque já tem o terreno e o financiamento aprovado. Às vezes, esperar mais 2 meses para amadurecer o projeto economiza anos de arrependimento." },
  { n: "02", title: "Visite uma obra antes de construir a sua", text: "Não para copiar, mas para perceber o que planta-baixa nenhuma mostra: altura de bancada, tamanho de janela, circulação, tomadas, iluminação." },
  { n: "03", title: "Não tente economizar em tudo", text: "Invista em impermeabilização, elétrica, hidráulica e estrutura. Dá para economizar nos móveis e deixar o paisagismo para depois, mas a estrutura não tem volta." },
  { n: "04", title: "Pense em você daqui a 10 anos", text: "Vai trabalhar em casa? Ter filhos? Cuidar dos pais? Uma tomada ou um ponto hidráulico previsto agora evita uma reforma enorme depois." },
  { n: "05", title: "Não comece escolhendo o piso", text: "Comece escolhendo quanto você pode gastar. Depois vêm terreno, programa de necessidades, tamanho da casa, projeto e orçamento." },
];

export const testimonials = [
  { text: "O prazer foi nosso, em ter uma grande profissional que fez toda a diferença! E claro, a amizade que ficou.", name: "Grazi Gasparin Bernardon", detail: "Cliente da casa de 150 m²", image: "/img/casa150-0.webp" },
  { text: "A arquiteta que a gente super indica!", name: "Silviane R. Barbosa", detail: "Engenheira, @silvibarbosa.eng", image: "/img/barranco-1.webp" },
  { text: "Resolver quarto de alugado sem gastar muito com marcenaria é um desafio e tanto! Ficou super acolhedor.", name: "Laís", detail: "Gestão financeira para arquitetas, sobre o quarto para aluguel", image: "/img/hero-quarto.webp" },
  { text: "Eu amei. Ficou simplesmente perfeita!", name: "Meiri Kelen", detail: "Sobre a casa no barranco", image: "/img/barranco-0.webp" },
  { text: "Sempre uma profissional incrível, super dedicada, e dá pra ver que gosta muito do que faz.", name: "Juliane Friedrich", detail: "No Dia da Arquiteta e Urbanista", image: "/img/loft-airbnb-0.webp" },
];

export const faq = [
  { q: "Você atende fora de Medianeira?", a: "Sim! Atendo de forma online todo o Brasil, e de forma presencial em Medianeira (PR) e região." },
  { q: "Que tipos de projeto você faz?", a: "Casas, sobrados, geminadas, kitnets e lofts; projetos de interiores; reformas; e projetos de regularização de imóveis. Também acompanho obras." },
  { q: "Dá para construir a casa em etapas?", a: "Dá, e é uma das coisas que eu mais faço. O projeto já nasce preparado para crescer: a garagem recebe as vigas e pilares desde o início, por exemplo, e é coberta quando o orçamento permitir." },
  { q: "Você faz projeto para quem quer construir para alugar?", a: "Faço. Lofts e kitnets bem planejados aproveitam o terreno, custam menos para construir e alugam fácil. Eu moro nesse universo desde o primeiro loft." },
  { q: "Como peço um orçamento?", a: "Me chame no WhatsApp ou preencha o formulário aqui embaixo com o tipo de projeto e a cidade. Eu respondo com os próximos passos." },
];
