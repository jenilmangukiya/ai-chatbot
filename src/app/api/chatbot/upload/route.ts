import { parsePdf } from "@/utils/parsePdf";

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    if (!file) {
      return Response.json({ error: "No files received." }, { status: 400 });
    }

    const textContent = await parsePdf(file);

    return new Response((textContent || "") as string);
  } catch (error: any) {
    return Response.json({ error: error?.message }, { status: 500 });
  }
};
