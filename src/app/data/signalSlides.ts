import type { SceneId } from "../lib/scenes";

export type SignalSlide = {
  id: string;
  sceneId: SceneId;
  repo: string;
  url: string;
  eyebrow: { pt: string; en: string };
  title: { pt: string; en: string };
  summary: { pt: string; en: string };
  stack: string[];
  accent: string;
};

export const SIGNAL_SLIDES: SignalSlide[] = [
  {
    id: "delivery-lab-k8s",
    sceneId: "github",
    repo: "delivery-lab-k8s",
    url: "https://github.com/almeidasantosdev/delivery-lab-k8s",
    eyebrow: { pt: "Repositório", en: "Repository" },
    title: { pt: "Delivery Lab no Kubernetes", en: "Delivery Lab on Kubernetes" },
    summary: {
      pt: "O mesmo container do Delivery Lab, agora num cluster local. A API recebe um webhook de pagamento fictício, grava o evento uma única vez e o worker reentrega com espera crescente. O FOR UPDATE SKIP LOCKED impede que dois pods peguem o mesmo job.",
      en: "The same Delivery Lab container, now on a local cluster. The API receives a fictional payment webhook, stores the event once, and the worker retries with growing delay. FOR UPDATE SKIP LOCKED keeps two pods from taking the same job.",
    },
    stack: ["Kind", "k3s", "PostgreSQL", "HPA"],
    accent: "rgba(43,91,255,0.42)",
  },
  {
    id: "delivery-lab",
    sceneId: "gh-typescript",
    repo: "delivery-lab",
    url: "https://github.com/almeidasantosdev/delivery-lab",
    eyebrow: { pt: "Repositório", en: "Repository" },
    title: { pt: "Delivery Lab", en: "Delivery Lab" },
    summary: {
      pt: "Laboratório de entrega contínua. Uma API recebe um webhook de pagamento, grava o evento uma única vez e um worker tenta entregar esse evento para um provedor simulado. Se o provedor falha, a tentativa volta para a fila com espera crescente.",
      en: "A continuous delivery lab. An API receives a payment webhook, stores the event once, and a worker tries to deliver it to a simulated provider. If the provider fails, the attempt returns to the queue with a growing delay.",
    },
    stack: ["Node.js", "TypeScript", "PostgreSQL", "Prometheus"],
    accent: "rgba(49,120,198,0.45)",
  },
  {
    id: "wagoo",
    sceneId: "gh-postgres",
    repo: "wagoo",
    url: "https://github.com/almeidasantosdev/wagoo",
    eyebrow: { pt: "Repositório", en: "Repository" },
    title: { pt: "Wagoo", en: "Wagoo" },
    summary: {
      pt: "SaaS para espaços de atendimento, no ar em wagoobot.com. A agenda entra pelo WhatsApp, com sinal e comissões, e a operação acompanha tudo num painel. A rotina que antes ficava em conversa manual passa a ser um fluxo do produto.",
      en: "SaaS for service spaces, live at wagoobot.com. Scheduling comes in through WhatsApp, with deposits and commissions, and the operation follows everything in a dashboard. The routine that used to live in manual chat becomes a product flow.",
    },
    stack: ["React", "Node.js", "AWS", "Docker"],
    accent: "rgba(46,180,110,0.32)",
  },
  {
    id: "papufy",
    sceneId: "gh-distributed",
    repo: "papufy",
    url: "https://github.com/almeidasantosdev/papufy",
    eyebrow: { pt: "Repositório", en: "Repository" },
    title: { pt: "Papufy", en: "Papufy" },
    summary: {
      pt: "Marketplace B2C de serviços locais, no ar em papufy.com. A pessoa busca por categoria e cidade, publica um pedido de serviço ou um perfil profissional, conversa no chat e acompanha publicações, notificações e carteira. Web e mobile no mesmo produto.",
      en: "A B2C marketplace for local services, live at papufy.com. People search by category and city, publish a service request or a professional profile, talk in chat, and follow posts, notifications, and a wallet. Web and mobile in the same product.",
    },
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    accent: "rgba(43,91,255,0.5)",
  },
];
