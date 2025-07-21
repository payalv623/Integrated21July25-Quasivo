import { Brain, BarChart3, Zap, Shield } from "lucide-react";

const services = {
  "agentic ai": {
    title: "Agentic AI",
    icon: <Brain className="w-6 h-6" />,
    description:
      "Autonomous AI agents that can perform complex tasks, make decisions, and interact with various systems independently.",
    features: [
      "Autonomous Decision Making",
      "Multi-System Integration",
      "Intelligent Task Execution",
      "Real-time Adaptation",
    ],
    color: "from-blue-400 to-cyan-500",
  },
  "data analytics": {
    title: "Data Analytics",
    icon: <BarChart3 className="w-6 h-6" />,
    description:
      "Advanced analytics solutions that transform raw data into actionable insights for strategic decision-making.",
    features: [
      "Real-time Analytics",
      "Predictive Modeling",
      "Data Visualization",
      "Business Intelligence",
    ],
    color: "from-emerald-400 to-teal-500",
  },
  "ai & ml": {
    title: "AI & Machine Learning",
    icon: <Zap className="w-6 h-6" />,
    description:
      "Cutting-edge machine learning models and AI solutions tailored to solve complex business challenges.",
    features: [
      "Custom ML Models",
      "Deep Learning",
      "Natural Language Processing",
      "Computer Vision",
    ],
    color: "from-amber-400 to-orange-500",
  },
  "responsible ai": {
    title: "Responsible AI",
    icon: <Shield className="w-6 h-6" />,
    description:
      "Ethical AI development ensuring fairness, transparency, and accountability in all AI implementations.",
    features: [
      "Bias Detection",
      "Explainable AI",
      "Privacy Protection",
      "Ethical Guidelines",
    ],
    color: "from-violet-400 to-purple-500",
  },
};

export default services;
