import { Github, Globe, Cpu, Brain, Network, Database, Layout, Code2 } from "lucide-react";

export const PERSONAL_INFO = {
    name: "Farid Hasfindra",
    title: "AI Engineer",
    tagline: "Bridging the gap between cutting-edge AI and intuitive User Experience.",
    description: "I specialize in building scalable AI solutions and integrating them into modern web applications. From natural language processing to computer vision, I bring data to life.",
    email: "farid06hasfindra@gmail.com",
};

export const SKILLS = [
    { name: "Python", icon: Code2 },
    { name: "TensorFlow", icon: Brain },
    { name: "PyTorch", icon: Network },
    { name: "Next.js", icon: Layout },
    { name: "React", icon: Globe },
    { name: "PostgreSQL", icon: Database },
    { name: "Docker", icon: Cpu },
];

export const PROJECTS = [
    {
        title: "NeuroArt Generator",
        description: "A generative adversarial network (GAN) driven art generator capable of creating unique digital paintings from text descriptions.",
        tags: ["Python", "PyTorch", "React", "FastAPI"],
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
        links: {
            demo: "#",
            github: "#",
        },
    },
    {
        title: "EcoSmart Vision",
        description: "Computer vision system for automated waste sorting and recycling classification using custom CNN architecture.",
        tags: ["TensorFlow", "OpenCV", "IoT", "Dashboard"],
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000&auto=format&fit=crop",
        links: {
            demo: "#",
            github: "#",
        },
    },
    {
        title: "SentimentStream",
        description: "Real-time social media sentiment analysis platform processing millions of tweets to predict market trends.",
        tags: ["NLP", "Transformers", "Kafka", "D3.js"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
        links: {
            demo: "#",
            github: "#",
        },
    },
    {
        title: "HealthBot AI",
        description: "Advanced conversational AI for preliminary medical diagnosis and appointment scheduling using LLMs.",
        tags: ["LLM", "RAG", "LangChain", "Next.js"],
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop",
        links: {
            demo: "#",
            github: "#",
        },
    },
];

export const EXPERIENCE = [
    {
        company: "DeepTech Solutions",
        role: "Senior AI Engineer",
        period: "2023 - Present",
        description: "Leading a team of 5 engineers to deploy large-scale NLP models. Improved inference time by 40%.",
    },
    {
        company: "Innovate AI",
        role: "Machine Learning Engineer",
        period: "2021 - 2023",
        description: "Developed computer vision pipelines for autonomous drone navigation. Implemented CI/CD for ML models.",
    },
    {
        company: "SoftSys Inc.",
        role: "Fullstack Developer",
        period: "2019 - 2021",
        description: "Built responsive web applications using React and Node.js. Integrated AI features into legacy systems.",
    },
];
