// utils/handleCommand.js
import services from "./services";

const handleCommand = (command, setShowServices) => {
  const lowerCommand = command.toLowerCase().trim();

  if (typeof setShowServices === "function") {
    setShowServices(false);
  }

  //   setShowServices(false);

  if (["hi", "hello", "hey"].includes(lowerCommand)) {
    return {
      text: `Hello! How can I assist you today? 😊

I can help you learn about:
• Our AI solutions and services
• Quasivo's mission and approach
• Technical capabilities and implementations
• Getting in touch with our team

What would you like to know more about?`,
      isService: false,
    };
  }

  if (["bye", "goodbye", "see you"].includes(lowerCommand)) {
    return {
      text: `Have a great day ahead! 👋

But if you had gone through our services, that would sound really very great! 🚀

Feel free to come back anytime to explore how Quasivo can transform your business with AI. Until next time!`,
      isService: false,
    };
  }

  if (
    lowerCommand.includes("price") ||
    lowerCommand.includes("cost") ||
    lowerCommand.includes("pricing")
  ) {
    return {
      text: `💰 Pricing & Investment

Our AI solutions are tailored to your specific needs, so pricing varies based on:

📊 **Factors affecting pricing:**
• Project scope and complexity
• Implementation timeline
• Required integrations
• Ongoing support level

💼 **Investment Options:**
• One-time project implementation
• Monthly subscription models
• Enterprise licensing
• Custom partnership agreements

For a personalized quote, contact our team at business@quasivo.com or call +1 (555) 123-4567`,
      isService: false,
    };
  }

  if (lowerCommand === "help") {
    return {
      text: `🚀 Here's what I can help you with:

• Type "About" - Learn about Quasivo's mission and vision
• Type "Aervices" - Explore our AI solutions
• Type "Agentic AI" - Discover autonomous AI agents
• Type "Data Analytics" - Learn about our analytics solutions
• Type "AI & ML" - Explore machine learning capabilities
• Type "Responsible AI" - Understand our ethical AI approach
• Type "Contact" - Get in touch with our team
• Ask about "Work", "Innovation", "Technologies"!

What interests you most? 🎯`,
      isService: false,
    };
  }

  if (
    lowerCommand.includes("about") ||
    lowerCommand.includes("About") ||
    lowerCommand.includes("quasivo") ||
    lowerCommand.includes("quasivo") ||
    lowerCommand.includes("Quasivo")
  ) {
    return {
      text: `🌟 About Quasivo

Quasivo is at the forefront of AI innovation, transforming businesses through intelligent automation and data-driven insights. Our mission is to help visionary companies turn bold ideas into powerful products by leveraging the latest advancements in emerging technologies. 

🎯 Our Purpose:
• Empower businesses with cutting-edge AI solutions
• Bridge the gap between complex AI technology and practical applications
• Ensure responsible AI development and deployment
• Drive innovation while maintaining ethical standards

We believe AI should augment human capabilities, not replace them. That's why we focus on creating solutions that enhance productivity, decision-making, and creativity.`,
      isService: false,
    };
  }

  if (
    lowerCommand === "services" ||
    lowerCommand.includes("Services") ||
    lowerCommand.includes("service") ||
    lowerCommand.includes("Service")
  ) {
    setShowServices(true);
    return {
      text: `🔧 Our AI Solutions Portfolio:

✨ Agentic AI - Autonomous intelligent agents
📊 Data Analytics - Advanced insights and visualization
🧠 AI & ML - Custom machine learning solutions
🛡️ Responsible AI - Ethical AI development

Click on any service below to learn more! 👇`,
      isService: true,
    };
  }

  if (lowerCommand === "contact" || lowerCommand.includes("Contact")) {
    return {
      text: `📞 Get In Touch With Quasivo

Ready to transform your business with AI? We'd love to hear from you!

🏢 Business Inquiries: business@quasivo.com
💼 Partnerships: partners@quasivo.com
🛠️ Technical Support: support@quasivo.com
📱 Phone: +1 (555) 123-4567

🌐 Visit our website: www.quasivo.com
📍 Location: San Francisco, CA

Our team of AI experts is ready to help you unlock the potential of artificial intelligence for your organization! 🚀`,
      isService: false,
    };
  }

  // You can continue adding the rest of the command conditions here...
  // To keep it modular, you can split this into further smaller command files if needed.

  const service = services[lowerCommand];
  if (service) {
    return {
      text: `🎯 ${service.title}

${service.description}

✨ Key Features:
${service.features.map((feature) => `• ${feature}`).join("\n")}

This solution can revolutionize how your business operates. Would you like to know more about implementation or have specific questions?`,
      isService: false,
    };
  }

  //added
  if (
    lowerCommand.includes("mission") ||
    lowerCommand.includes("vision") ||
    lowerCommand.includes("Mission") ||
    lowerCommand.includes("Vision") ||
    lowerCommand.includes("Mission and Vision") ||
    lowerCommand.includes("Mission & Vision") ||
    lowerCommand.includes("mission and vision") ||
    lowerCommand.includes("mission & vision") ||
    lowerCommand.includes("mission&vision")
  ) {
    return {
      text: `🎯 Quasivo’s Mission & Vision

Mission: To help visionary companies turn bold ideas into powerful products by leveraging the latest advancements in emerging technologies.

Vision: To be the global innovation partner of choice for businesses building the future with AI, immersive experiences, connected devices, decentralized systems, and intelligent data.`,
      isService: false,
    };
  }

  if (
    lowerCommand.includes("philosophy") ||
    lowerCommand.includes("name meaning") ||
    lowerCommand.includes("Meaning") ||
    lowerCommand.includes("Meaning of Quasivo") ||
    lowerCommand.includes("Quasivo means") ||
    lowerCommand.includes("quasivo meaning")
  ) {
    return {
      text: `🔍 Brand Philosophy

Quasivo comes from Quasar (representing brilliance and energy) and Solve (indicating a problem-solving focus).

Quasivo symbolizes imitless innovation power to solve real-world problems through advanced tech.`,
      isService: false,
    };
  }

  if (
    lowerCommand.includes("core values") ||
    lowerCommand.includes("values") ||
    lowerCommand.includes("brand personality")
  ) {
    return {
      text: `🌟 Core Values & Brand Personality

• 🧠 Innovative – Always at the edge of new tech  
• ⚡ Energetic – Fast, agile, and future-focused  
• 👁️ Visionary – Helping clients build next-gen products  
• 🛡️ Reliable – World-class quality with end-to-end support`,
      isService: false,
    };
  }

  if (
    lowerCommand.includes("technologies quasivo works on") ||
    lowerCommand.includes("technologies quasivo uses") ||
    lowerCommand.includes("tech stack") ||
    lowerCommand.includes("technology stack") ||
    lowerCommand.includes("ai and ml") ||
    lowerCommand.includes("ar/vr") ||
    lowerCommand.includes("blockchain") ||
    lowerCommand.includes("iot") ||
    lowerCommand.includes("analytics") ||
    lowerCommand.includes("product development") ||
    lowerCommand.includes("technologies") ||
    command.includes("Works On") ||
    command.includes("Works On") ||
    command.includes("Works") ||
    command.includes("work") ||
    command.includes("works") ||
    command.includes("Technologies Quasivo Works On") ||
    command.includes("Technologies Quasivo Uses") ||
    command.includes("Tech Stack") ||
    command.includes("Technology Stack") ||
    command.includes("AI and ML") ||
    command.includes("AR/VR") ||
    command.includes("Blockchain") ||
    command.includes("IoT") ||
    command.includes("Analytics") ||
    command.includes("Product Development") ||
    command.includes("Technologies")
  ) {
    return {
      text: `🧩 Technologies Quasivo Works On

AI & ML:
• Generative AI
• AI copilots & assistants
• Predictive analytics

AR/VR:
• Product visualization
• AR/VR for training & marketing

Blockchain:
• Smart contracts
• Decentralized apps (dApps)

IoT:
• Device integration
• Real-time automation

Advanced Analytics:
• Business dashboards
• Big data pipelines

Full Product Development:
• MVPs to enterprise platforms
• UI/UX, testing, DevOps`,
      isService: false,
    };
  }

  if (
    lowerCommand.includes("innovation") ||
    lowerCommand.includes("ai") ||
    lowerCommand.includes("AI") ||
    lowerCommand.includes("Innovation") ||
    lowerCommand.includes("Innovation & AI") ||
    lowerCommand.includes("Quasivo's Innovation")
  ) {
    return {
      text: `🚀 Quasivo's Innovation in AI

We pioneer in:
• Building AI copilots and assistants  
• Leveraging Generative AI to automate, personalize, and scale  
• Using AI for predictive intelligence and smart decisions`,
      isService: false,
    };
  }

  if (
    lowerCommand.includes("generative ai") ||
    lowerCommand.includes("Generative AI") ||
    lowerCommand.includes("Generative") ||
    lowerCommand.includes("Generative aI") ||
    lowerCommand.includes("generative AI")
  ) {
    return {
      text: `🧠 Use of Generative AI at Quasivo

Generative AI is central to our solutions:
• Accelerates development  
• Enhances user experience  
• Powers assistants and intelligent outputs  
• Applied in chatbots, automation, content generation, and custom AI agents`,
      isService: false,
    };
  }

  return {
    text: `I'm not quite sure about that. I can help you with information about our AI services, implementation, security, and much more! 

What specific aspect of Quasivo's AI solutions would you like to explore? 🤖`,
    isService: false,
  };
};

export default handleCommand;
