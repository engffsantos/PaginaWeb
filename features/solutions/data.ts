import React from 'react';
import { 
  ChatIcon, 
  GymIcon, 
  BlogIcon, 
  InsightIcon, 
  MoneyIcon, 
  AgendaIcon,
  Easy5SIcon,
  EasyStock360Icon,
  EasyRPIcon
} from '../../components/icons';

export interface Solution {
  id: string;
  name: string;
  Icon: React.FC<{className?: string}>;
  tagline: string;
  shortDescription: string;
  description: string;
  features: string[];
  tech: string[];
  useCases?: string[];
}

export const solutions: Solution[] = [
  {
    id: 'easychat',
    name: 'EasyChat',
    Icon: ChatIcon,
    tagline: 'Atendimento automático, personalizado e com linguagem humana.',
    shortDescription: 'Chatbot personalizável com IA para WhatsApp, que aceita texto e voz.',
    description: 'O EasyChat é um chatbot personalizável desenvolvido em Python com Flask e arquitetura MVC. Ele se integra ao WhatsApp, aceita entrada por texto e voz, armazena métricas e pode ser adaptado para diversos tipos de atendimento automatizado.',
    features: [
      'Integração com WhatsApp (via API)',
      'Respostas por texto e áudio',
      'Suporte a documentos e JSON externos',
      'Armazenamento de interações e métricas',
      'Integração futura com ERPs',
      'Suporte à API pública para uso em outros sistemas'
    ],
    tech: ['Python', 'Flask', 'SQLite', 'MVC'],
  },
  {
    id: 'easygym',
    name: 'EasyGym',
    Icon: GymIcon,
    tagline: 'Organize sua academia com eficiência, clareza e agilidade.',
    shortDescription: 'Plataforma completa para gestão de academias: alunos, planos e frequência.',
    description: 'Plataforma completa para controle de academias: cadastros, planos, presença de alunos e relatórios gerenciais. Desenvolvido a partir de um HTML legado e reestruturado em Flask com MVC.',
    features: [
      'Cadastro de alunos, planos e treinos',
      'Controle de vencimentos de planos',
      'Relatórios de frequência de alunos',
      'Painel administrativo completo',
      'Agendamentos e gestão de turmas (planejado)'
    ],
    tech: ['Python', 'Flask', 'SQLite', 'MVC'],
  },
  {
    id: 'easyblog',
    name: 'EasyBlog',
    Icon: BlogIcon,
    tagline: 'Produza, traduza e publique conteúdo automaticamente.',
    shortDescription: 'Sistema para automação de conteúdo para blogs e redes sociais.',
    description: 'Sistema para automação de conteúdo para blogs e redes sociais. A partir de uma notícia, o EasyBlog gera postagens em várias línguas, distribui por canal e organiza todo o histórico de forma estruturada.',
    features: [
      'Geração automática de conteúdo',
      'Tradução e adaptação por canal',
      'Organização por ano/mês/dia/tópico',
      'Integração com redes sociais via API',
      'Análise de performance e feedback loop'
    ],
    tech: ['Python', 'SQLite', 'MVC', 'JSON'],
  },
  {
    id: 'easyinsight',
    name: 'EasyInsight',
    Icon: InsightIcon,
    tagline: 'Transforme dados brutos em inteligência visual e estratégica.',
    shortDescription: 'Plataforma para criação de dashboards personalizados e insights automatizados.',
    description: 'Plataforma em desenvolvimento para criação de dashboards personalizados e insights automatizados, com foco em dados financeiros, operacionais e de qualidade.',
    features: [
      'Dashboards interativos com filtros dinâmicos',
      'Geração automática de insights',
      'Upload e processamento de dados',
      'Exportação em PDF e Excel',
      'Módulo de comparações e previsões',
      'Templates para setores distintos (educação, indústria, comércio)'
    ],
    tech: ['Python', 'Flask', 'React', 'D3.js', 'Chart.js', 'PostgreSQL'],
  },
  {
    id: 'easymoney',
    name: 'EasyMoney',
    Icon: MoneyIcon,
    tagline: 'Controle financeiro com profundidade, clareza e relatórios prontos.',
    shortDescription: 'Sistema de gestão financeira com dashboards em tempo real e relatórios.',
    description: 'Sistema completo de gestão financeira com dashboards em tempo real, controle de contas, lançamentos, despesas fixas e relatórios personalizados.',
    features: [
      'Dashboard com gráficos interativos (D3.js)',
      'Lançamentos (entradas/saídas)',
      'Controle de categorias e contas bancárias',
      'Gestão de despesas fixas e investimentos',
      'Agenda financeira (calendário de pagamentos)',
      'Relatórios exportáveis em PDF e Excel'
    ],
    tech: ['Flask', 'D3.js', 'SQLite', 'PostgreSQL'],
  },
  {
    id: 'easy5s',
    name: 'Easy5S',
    Icon: Easy5SIcon,
    tagline: 'Organize, padronize e corrija com base nos 5 sensos.',
    shortDescription: 'Sistema de avaliação baseado na metodologia 5S para empresas e indústrias.',
    description: 'Sistema completo de avaliação baseado na metodologia 5S, ideal para escolas, empresas e indústrias. Possui dashboard de resultados, geração de relatórios, e módulo de ações corretivas com fotos.',
    features: [
      'Cadastro de ambientes por tipo e bloco',
      'Tipos de usuários: inspetores, gestores, alunos',
      'Avaliações com perguntas gerais ou específicas',
      'Dashboard interativo com filtros',
      'Ações corretivas com prazo e imagem de comprovação',
      'Geração de relatórios em PDF'
    ],
    tech: ['React', 'Flask (API)', 'PostgreSQL'],
    useCases: ['Indústrias', 'Escolas', 'Espaços Corporativos']
  },
  {
    id: 'easyagenda',
    name: 'EasyAgenda',
    Icon: AgendaIcon,
    tagline: 'Agende, organize e monitore espaços de forma profissional.',
    shortDescription: 'Sistema para agendamento de ambientes e recursos para consultórios, salões e empresas.',
    description: 'Sistema planejado para consultórios, salões, escolas e empresas que precisam agendar ambientes e recursos de forma organizada.',
    features: [
      'Cadastro de ambientes e recursos',
      'Agendamento com bloqueio de horário',
      'Perfis de usuários com permissões diferentes',
      'Módulo de manutenção e ocorrências (planejado)',
      'Integração com Google Agenda e WhatsApp (futuro)'
    ],
    tech: ['React', 'Flask (API)', 'PostgreSQL'],
  },
  {
    id: 'easystock360',
    name: 'EasyStock360',
    Icon: EasyStock360Icon,
    tagline: 'Controle, venda e analise. Tudo no mesmo lugar.',
    shortDescription: 'Sistema robusto para controle de estoque, vendas, clientes e financeiro.',
    description: 'Sistema robusto para controle de estoque, vendas, clientes, financeiro e relatórios. Modular e escalável, com planejamento para multi-loja via VPN.',
    features: [
      'Cadastro de produtos e clientes',
      'Lançamento e histórico de vendas',
      'Módulo financeiro integrado (contas a pagar/receber)',
      'Relatórios gerenciais e exportações',
      'Dashboard com metas, gráficos e desempenho',
      'Integração multi-loja (planejado com WireGuard + VPN)'
    ],
    tech: ['React', 'Flask (API)', 'SQLite', 'PostgreSQL'],
  },
  {
    id: 'easyrp',
    name: 'EasyRP',
    Icon: EasyRPIcon,
    tagline: 'Gestão completa para sua empresa, do financeiro à produção.',
    shortDescription: 'Planejamento de recursos empresariais com módulos integrados.',
    description: 'O EasyRP é um sistema de planejamento de recursos empresariais (ERP) projetado para centralizar e otimizar as operações do seu negócio. Integre finanças, estoque, produção e serviços em uma única plataforma coesa e eficiente.',
    features: [
      'Módulo Financeiro completo',
      'Controle de Estoque avançado',
      'Planejamento e Controle da Produção (PCP)',
      'Gestão de Serviços e Ordens de Serviço',
      'Relatórios Gerenciais integrados',
      'Customizável para as necessidades do seu negócio'
    ],
    tech: ['React', 'Flask (API)', 'PostgreSQL'],
    useCases: ['Indústrias', 'Distribuidoras', 'Empresas de Serviço']
  }
];