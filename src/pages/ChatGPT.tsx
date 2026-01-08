import { ChatGPTPlaygroundPage } from "@/components/extensions/chatgpt-polza/ChatGPTPlaygroundPage";

const API_URL = "https://functions.poehali.dev/21ad7c0a-172e-4090-bfe5-f415fc219060";

const ChatGPT = () => {
  return (
    <ChatGPTPlaygroundPage
      apiUrl={API_URL}
      defaultModel="openai/gpt-4o-mini"
    />
  );
};

export default ChatGPT;
