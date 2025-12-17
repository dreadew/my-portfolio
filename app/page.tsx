import PageContainer from "./components/page-container";
import HeroSection from "./components/sections/hero";
import SkillsSection from "./components/sections/skills";
import ProjectsSection from "./components/sections/projects";
import RepositoriesSection from "./components/sections/repositories";
import AchievementsSection from "./components/sections/achievements";
import ContactSection from "./components/sections/contact";

export default function Home() {
  return (
    <PageContainer>
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <RepositoriesSection />
      <AchievementsSection />
      <ContactSection />
    </PageContainer>
  );
}
