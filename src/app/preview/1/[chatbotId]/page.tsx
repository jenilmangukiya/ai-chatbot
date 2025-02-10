import ProtectedRoute from "@/components/Auth/ProtectedRoute/ProtectedRoute";
import SoftwareLanding from "@/modules/preview/1/SoftwareLanding/SoftwareLanding";

async function SoftwareLandingPage({
  params,
}: {
  params: { chatbotId: string };
}) {
  const { chatbotId } = await params;
  return (
    <ProtectedRoute>
      <SoftwareLanding chatbotId={chatbotId} />
    </ProtectedRoute>
  );
}

export default SoftwareLandingPage;
