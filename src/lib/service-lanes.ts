export interface ServiceLane {
  slug: string;
  title: string;
  heading: string;
  intro: string;
  who: string;
  points: string[];
  tools: string;
}

export const serviceLanes: ServiceLane[] = [
  {
    slug: 'web-personalization',
    title: 'Personalization at scale',
    heading: 'Make more customer moments relevant.',
    intro: 'Move beyond a handful of pilot campaigns with a practical plan for personalization across your site and customer journeys.',
    who: 'For marketing teams with a personalization platform in place that want to improve the experience, expand what they can test, or make campaigns easier to run.',
    points: [
      'Campaign and audience strategy',
      'Beacon and tag implementation',
      'Experiment design, campaign releases and optimization',
      'Flicker and page-speed improvements',
      'A rollout plan your team can operate',
    ],
    tools: 'Salesforce Marketing Cloud Personalization, Adobe Target, Adobe Experience Manager, JavaScript and React.',
  },
  {
    slug: 'data-crm',
    title: 'Customer data, CRM & AI agents',
    heading: 'Connect customer data to the next useful action.',
    intro: 'Bring CRM, customer identity, digital behavior and campaign data into a clearer view, then design how teams and AI agents can use it.',
    who: 'For teams modernizing CRM, connecting customer data across markets, or preparing to activate AI on top of their customer platforms.',
    points: [
      'Salesforce CRM and Financial Services Cloud integration',
      'Data 360 data modeling and identity resolution',
      'Agentforce use-case design and setup',
      'Adobe Experience Platform profile, segment and activation design',
      'An integration map across platforms and teams',
    ],
    tools: 'Salesforce CRM, Financial Services Cloud, Data 360, Agentforce and Adobe Experience Platform.',
  },
  {
    slug: 'ai-automation',
    title: 'AI automation for marketing teams',
    heading: 'Give your team more room for the work that matters.',
    intro: 'Find repetitive marketing operations work worth automating, test an AI-assisted workflow, and leave behind a process the team can run.',
    who: 'For marketing and data teams spending too much time on repeatable analysis, coordination or campaign operations.',
    points: [
      'Workflow review and opportunity prioritization',
      'AI agent and proof-of-concept design',
      'Human review, governance and handoff design',
      'Documented playbooks and team enablement',
    ],
    tools: 'Python, SQL, Databricks, Amazon Bedrock, AI assistants and existing workflow tools.',
  },
  {
    slug: 'martech-data-audit',
    title: 'Martech & data audit',
    heading: 'Know what to fix before you buy more tools.',
    intro: 'Get a clear view of your tags, identity, customer data and personalization readiness, with a practical order for the next improvements.',
    who: 'For leaders evaluating a platform investment or trying to understand why existing marketing technology is underperforming.',
    points: [
      'Tag and beacon review',
      'Identity and customer data model assessment',
      'Personalization readiness review',
      'A prioritized action plan with owners and dependencies',
    ],
    tools: 'Platform-neutral, with deep experience across Salesforce and Adobe marketing technology.',
  },
];
