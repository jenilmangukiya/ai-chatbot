import ProtectedRoute from "@/components/Auth/ProtectedRoute/ProtectedRoute";
import RecipySharingApp from "@/modules/preview/2/RecipySharingApp/RecipySharingApp";

async function RecipySharingAppPage({
  params,
}: {
  params: Promise<{ chatbotId: string }>;
}) {
  const { chatbotId } = await params;
  return (
    <ProtectedRoute>
      <RecipySharingApp chatbotId={chatbotId} />
    </ProtectedRoute>
  );
}

export default RecipySharingAppPage;
