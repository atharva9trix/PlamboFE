import GeneratePage from "./pages/GeneratePage";
import ChatGptPage from "./pages/ChatGptPage";

const generateRoutes = [
  { path: "/generate", element: <GeneratePage /> },
  { path: "/generate/chatgpt", element: <ChatGptPage /> }, 
];

export default generateRoutes;