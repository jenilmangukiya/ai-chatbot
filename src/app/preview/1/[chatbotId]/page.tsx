import SoftwareLanding from "@/modules/preview/1/SoftwareLanding/SoftwareLanding";

async function SoftwareLandingPage({
  params,
}: {
  params: { chatbotId: string };
}) {
  const { chatbotId } = await params;
  return <SoftwareLanding chatbotId={chatbotId} />;
}

export default SoftwareLandingPage;
