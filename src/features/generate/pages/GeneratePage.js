import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToolsGridView from "../../../ui/components/ToolsGridView";

import chatgpt from "../../../assets/openai-chatgpt.png";
import gemini from "../../../assets/gemini-ai.png";
import midjourney from "../../../assets/midjourney.png";
import elevenlabs from "../../../assets/elevenlabs.png";
import runway from "../../../assets/runway.png";
import suno from "../../../assets/suno.png";
import pika from "../../../assets/pika.png";
import claude from "../../../assets/claude.png";
import canva from "../../../assets/Canva.png";

const GENERATE_TOOLS = [
  { name: "Chat GPT", icon: chatgpt },
  { name: "Gemini", icon: gemini },
  { name: "Midjourney", icon: midjourney },
  { name: "Eleven Labs", icon: elevenlabs },
  { name: "Runway", icon: runway },
  { name: "Suno", icon: suno },
  { name: "Pika", icon: pika },
  { name: "Claude", icon: claude },
  { name: "Canva", icon: canva },
];

export default function GeneratePage() {
  const navigate = useNavigate();
  const [activeIframe, setActiveIframe] = useState(null);

  const handleToolClick = (tool) => {
    if (tool.name === "Chat GPT") {
      navigate("/generate/chatgpt");
    } else {
      setActiveIframe(tool.url || null);
    }
  };

  return (
    <ToolsGridView
      title="Let's make something."
      tools={GENERATE_TOOLS}
      onToolClick={handleToolClick}
      activeIframe={activeIframe}
      setActiveIframe={setActiveIframe}
    />
  );
}
