export interface Post {
  id: string;
  title: string;
  slug: string;
  category: 'Desenvolvimento' | 'Segurança da Informação' | 'Dados e Analytics' | 'Gestão e Estratégia' | 'Produtos EasyData360';
  tags: string[];
  cover_image: string;
  summary: string;
  content: string;
  author: string;
  created_at: string; // YYYY-MM-DD
}

export const posts: Post[] = [
  {
    id: "post-001",
    title: "Como proteger seus dados contra vazamentos internos",
    slug: "como-proteger-dados-vazamentos",
    category: "Segurança da Informação",
    tags: ["dados", "lgpd", "segurança"],
    cover_image: "https://picsum.photos/seed/sec1/640/360",
    summary: "Evite perdas de dados e garanta a conformidade com práticas simples e eficazes que sua equipe pode aplicar hoje mesmo.",
    content: `
<p>A segurança da informação é uma das maiores preocupações para empresas de todos os tamanhos. Embora muitas organizações foquem em ameaças externas, como hackers e malwares, os vazamentos de dados internos representam um risco igualmente significativo, e muitas vezes, mais difícil de detectar.</p>
<h3>1. Conscientização e Treinamento</h3>
<p>A primeira linha de defesa é sempre a sua equipe. Promova treinamentos regulares sobre boas práticas de segurança, como a importância de senhas fortes, o reconhecimento de phishing e a maneira correta de manusear dados sensíveis.</p>
<h3>2. Controle de Acesso</h3>
<p>Implemente o princípio do menor privilégio. Isso significa que cada funcionário deve ter acesso apenas às informações e sistemas estritamente necessários para desempenhar suas funções. Revise as permissões periodicamente, especialmente quando um colaborador muda de cargo ou deixa a empresa.</p>
<h3>3. Monitoramento e Auditoria</h3>
<p>Utilize ferramentas que monitorem o acesso a dados críticos. Logs de acesso podem ajudar a identificar atividades suspeitas, como downloads em massa fora do horário de expediente ou acesso a arquivos não relacionados à função do usuário.</p>
    `,
    author: "Equipe EasyData360",
    created_at: "2025-09-27"
  },
  {
    id: "post-002",
    title: "ERP em nuvem: vale a pena para pequenas empresas?",
    slug: "erp-em-nuvem-pequenas-empresas",
    category: "Gestão e Estratégia",
    tags: ["erp", "cloud", "gestão"],
    cover_image: "https://picsum.photos/seed/erp1/640/360",
    summary: "Analisamos os prós e contras de adotar um sistema ERP na nuvem para otimizar a gestão do seu negócio.",
    content: `
<p>Sistemas de Planejamento de Recursos Empresariais (ERP) já foram considerados uma exclusividade de grandes corporações. No entanto, com o avanço da tecnologia em nuvem, essa solução se tornou acessível e altamente benéfica para pequenas e médias empresas.</p>
<h3>Vantagens do ERP na Nuvem</h3>
<ul>
  <li><strong>Custo-benefício:</strong> Elimina a necessidade de grandes investimentos em infraestrutura de hardware e servidores. O modelo de assinatura (SaaS) torna o custo previsível.</li>
  <li><strong>Acessibilidade:</strong> Acesse seus dados de qualquer lugar, a qualquer momento, bastando uma conexão com a internet.</li>
  <li><strong>Escalabilidade:</strong> O sistema cresce junto com a sua empresa. É fácil adicionar novos usuários ou módulos conforme a necessidade.</li>
</ul>
<h3>O que considerar antes de migrar?</h3>
<p>Antes de adotar um ERP em nuvem, avalie a reputação do fornecedor, as funcionalidades oferecidas e a qualidade do suporte técnico. O EasyRP da EasyData360, por exemplo, oferece uma solução robusta e customizável para diversos setores.</p>
    `,
    author: "Equipe EasyData360",
    created_at: "2025-09-20"
  },
  {
    id: "post-003",
    title: "Como o 5S digital melhora ambientes industriais",
    slug: "5s-digital-ambientes-industriais",
    category: "Produtos EasyData360",
    tags: ["5s", "indústria", "qualidade"],
    cover_image: "https://picsum.photos/seed/5s1/640/360",
    summary: "Descubra como a tecnologia pode potencializar a metodologia 5S, trazendo mais eficiência e organização para o chão de fábrica.",
    content: `
<p>A metodologia 5S é uma ferramenta poderosa para a organização e padronização de ambientes de trabalho. Quando combinada com a tecnologia, seus resultados são ainda mais expressivos. É o que chamamos de 5S Digital.</p>
<h3>Benefícios da Digitalização do 5S</h3>
<p>Com um sistema como o <strong>Easy5S</strong>, as auditorias se tornam mais rápidas e precisas. Os inspetores podem usar tablets ou smartphones para registrar não conformidades, anexar fotos e criar planos de ação em tempo real.</p>
<p>Os dashboards fornecem uma visão clara do desempenho de cada setor, permitindo que os gestores identifiquem pontos de melhoria e tomem decisões baseadas em dados. A digitalização elimina a papelada e centraliza todas as informações em um único local, acessível e seguro.</p>
    `,
    author: "Equipe EasyData360",
    created_at: "2025-09-15"
  },
  {
    id: "post-004",
    title: "Primeiros passos com Análise de Dados no seu negócio",
    slug: "primeiros-passos-analise-de-dados",
    category: "Dados e Analytics",
    tags: ["bi", "analytics", "dados"],
    cover_image: "https://picsum.photos/seed/data1/640/360",
    summary: "Não sabe por onde começar a usar dados para tomar decisões? Este guia prático é para você.",
    content: `
<p>A análise de dados não é mais um luxo, mas uma necessidade para empresas que querem se manter competitivas. Se você está começando, o processo pode parecer intimidador, mas alguns passos simples podem colocar você no caminho certo.</p>
<h3>1. Defina seus objetivos</h3>
<p>O que você quer descobrir? Aumentar as vendas? Reduzir custos? Melhorar a satisfação do cliente? Ter um objetivo claro orienta toda a sua análise.</p>
<h3>2. Colete os dados corretos</h3>
<p>Identifique as fontes de dados relevantes: seu sistema de vendas, o Google Analytics do seu site, planilhas de controle, etc. Centralize essas informações para facilitar a análise.</p>
<h3>3. Visualize para entender</h3>
<p>Ferramentas de Business Intelligence (BI), como o nosso futuro <strong>EasyInsight</strong>, transformam números em gráficos e dashboards interativos. A visualização de dados revela tendências e padrões que seriam impossíveis de ver em uma tabela.</p>
    `,
    author: "Equipe EasyData360",
    created_at: "2025-09-10"
  },
];
