import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PERSONAL_INFO = {
    name: "Farid Hasfindra",
    title: "AI Engineer",
    tagline: "Building production-ready AI systems that transform complex data into seamless, high-impact user experiences.",
    description: "I am a dedicated AI Engineer with a passion for building intelligent systems that solve real-world problems. With expertise in machine learning, natural language processing, and full-stack development, I focus on creating scalable and efficient solutions that deliver value to users and businesses alike.",
    email: "farid06hasfindra@gmail.com",
    githubUrl: "https://github.com/farid-hasfindra",
    linkedinUrl: "https://linkedin.com/in/farid-hasfindra",
    instagramUrl: "https://instagram.com/farid-hasfindra",
};

const SKILLS = [
    { name: "Python", icon: "Code2" },
    { name: "TensorFlow", icon: "Brain" },
    { name: "PyTorch", icon: "Network" },
    { name: "Next.js", icon: "Layout" },
    { name: "React", icon: "Globe" },
    { name: "PostgreSQL", icon: "Database" },
    { name: "Docker", icon: "Cpu" },
];

const PROJECTS = [
    {
        title: "NeuroArt Generator",
        description: "A generative adversarial network (GAN) driven art generator capable of creating unique digital paintings from text descriptions.",
        tags: ["Python", "PyTorch", "React", "FastAPI"],
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
        demoUrl: "#",
        githubUrl: "#",
    },
    {
        title: "EcoSmart Vision",
        description: "Computer vision system for automated waste sorting and recycling classification using custom CNN architecture.",
        tags: ["TensorFlow", "OpenCV", "IoT", "Dashboard"],
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000&auto=format&fit=crop",
        demoUrl: "#",
        githubUrl: "#",
    },
    {
        title: "SentimentStream",
        description: "Real-time social media sentiment analysis platform processing millions of tweets to predict market trends.",
        tags: ["NLP", "Transformers", "Kafka", "D3.js"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
        demoUrl: "#",
        githubUrl: "#",
    },
    {
        title: "HealthBot AI",
        description: "Advanced conversational AI for preliminary medical diagnosis and appointment scheduling using LLMs.",
        tags: ["LLM", "RAG", "LangChain", "Next.js"],
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop",
        demoUrl: "#",
        githubUrl: "#",
    },
];

const EXPERIENCE = [
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

async function main() {
    console.log("Seeding Personal Info...");
    await prisma.personalInfo.upsert({
        where: { id: 1 },
        update: PERSONAL_INFO,
        create: { id: 1, ...PERSONAL_INFO }
    });

    console.log("Seeding Skills...");
    for (const [index, skill] of SKILLS.entries()) {
        await prisma.skill.create({ data: { ...skill, order: index } });
    }

    console.log("Seeding Projects...");
    for (const [index, proj] of PROJECTS.entries()) {
        await prisma.project.create({ data: { ...proj, order: index } });
    }

    console.log("Seeding Experience...");
    for (const [index, exp] of EXPERIENCE.entries()) {
        await prisma.experience.create({ data: { ...exp, order: index } });
    }

    console.log("Seeding Complete!");
}

main()
  .catch(e => {
      console.error(e);
      process.exit(1);
  })
  .finally(async () => {
      await prisma.$disconnect();
  });
