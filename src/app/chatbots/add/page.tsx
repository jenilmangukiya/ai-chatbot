import ProtectedRoute from "@/components/Auth/ProtectedRoute/ProtectedRoute";
import AddChatbot from "@/modules/chatbots/AddChatbot/AddChatbot";

const ChatBotAdminPanel = () => {
  return (
    <ProtectedRoute>
      <AddChatbot />
    </ProtectedRoute>
  );
};

export default ChatBotAdminPanel;
