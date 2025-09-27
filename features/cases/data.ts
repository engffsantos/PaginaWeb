export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  industry: string;
  title: string;
  coverImage: string;
  challenge: string;
  solution: string;
  results: { value: string; description: string }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
}

export const cases: CaseStudy[] = [
  {
    id: "case-001",
    slug: "industria-xyz-otimizacao-5s",
    client: "Indústria XYZ",
    industry: "Manufatura",
    title: "Otimização de Processos com Easy5S na Indústria XYZ",
    coverImage: "https://picsum.photos/seed/case1/800/500",
    challenge: "A Indústria XYZ enfrentava desafios com a desorganização no chão de fábrica, resultando em perda de tempo na busca por ferramentas e um aumento no risco de acidentes. As auditorias 5S eram feitas em papel, tornando o processo lento e a análise de dados quase impossível.",
    solution: "Implementamos o sistema Easy5S, digitalizando todo o processo de auditoria. Os inspetores passaram a usar tablets para registrar não conformidades, anexar fotos e criar planos de ação instantaneamente. Um dashboard centralizado forneceu aos gestores uma visão em tempo real do status de cada setor.",
    results: [
      { value: "40%", description: "Redução no tempo de busca por ferramentas" },
      { value: "25%", description: "Aumento da produtividade das equipes" },
      { value: "60%", description: "Redução de acidentes de trabalho leves" },
    ],
    testimonial: {
      quote: "Com a EasyData360 conseguimos implantar o sistema de 5S em todas as unidades em menos de 2 semanas. A mudança foi transformadora.",
      author: "Júlia Pereira",
      role: "Coordenadora de Qualidade, Indústria XYZ",
    },
  },
  {
    id: "case-002",
    slug: "comercio-alpha-controle-estoque",
    client: "Comércio Alpha",
    industry: "Varejo",
    title: "Controle Total do Estoque com EasyStock360",
    coverImage: "https://picsum.photos/seed/case2/800/500",
    challenge: "O Comércio Alpha sofria com rupturas e excesso de estoque. A falta de um sistema integrado causava divergências entre o estoque físico e o registrado, levando a perdas financeiras e insatisfação dos clientes.",
    solution: "O EasyStock360 foi implementado para centralizar o controle de entradas, saídas e transferências de produtos. A integração com o ponto de venda (PDV) automatizou as baixas de estoque, e os relatórios de curva ABC permitiram uma compra mais inteligente e estratégica.",
    results: [
      { value: "99.8%", description: "Acuracidade do inventário" },
      { value: "15%", description: "Redução de perdas por vencimento ou avaria" },
      { value: "20%", description: "Aumento nas vendas por evitar rupturas" },
    ],
    testimonial: {
      quote: "Nosso estoque estava um caos. Com o EasyStock, temos total controle e previsibilidade. Foi a melhor decisão que tomamos para a logística.",
      author: "Marcos Lima",
      role: "Gerente de Logística, Comércio Alpha",
    },
  },
];
