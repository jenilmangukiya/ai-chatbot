import RecipySharingApp from "@/modules/preview/2/RecipySharingApp/RecipySharingApp";

async function RecipySharingAppPage({
  params,
}: {
  params: { chatbotId: string };
}) {
  const { chatbotId } = await params;
  return <RecipySharingApp chatbotId={chatbotId} />;
}

export default RecipySharingAppPage;
