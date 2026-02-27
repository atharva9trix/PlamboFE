import ToolsGridView from "../../../ui/components/ToolsGridView";
import braze from "../../../assets/Braze_logo_white.png";
import semrush from "../../../assets/semrush.png";
import ga from "../../../assets/ga.png";
import mediamix from "../../../assets/MediaMix_logo.png";
import piacer from "../../../assets/piacer.png";
import klaviyo from "../../../assets/klaviyo-logo-white.png";
import meta from "../../../assets/meta.png";
import suzy from "../../../assets/Suz.png";
import linkedIn from "../../../assets/linkedin.png";

const AUDIENCE_TOOLS = [
  {
    name: "Braze",
    icon: braze,
    url: "https://www.braze.com",
  },
  {
    name: "Semrush",
    icon: semrush,
    url: "https://www.semrush.com",
  },
  {
    name: "Google Analytics",
    icon: ga,
    url: "https://analytics.google.com",
  },
  {
    name: "MediaMix",
    icon: mediamix,
    url: "https://www.mediamixmodeling.com",
  },
  {
    name: "Piacer",
    icon: piacer,
    url: "https://www.piacer.ai",
  },
  {
    name: "Klaviyo",
    icon: klaviyo,
    url: "https://www.klaviyo.com",
  },
  {
    name: "Meta Ads Manager",
    icon: meta,
    url: "https://adsmanager.facebook.com",
  },
  {
    name: "Suzy",
    icon: suzy,
    url: "https://www.suzy.com",
  },
  {
    name: "LinkedIn",
    icon: linkedIn,
    url: "https://www.linkedin.com",
  },
];
export default function AudiencePage() {
  const handleToolClick = (tool) => {
    window.open(tool.url, "_blank");
  };
  return (
    <ToolsGridView
      title="Let’s connect better with your audience."
      tools={AUDIENCE_TOOLS}
      onToolClick={handleToolClick}
    />
  );
}
