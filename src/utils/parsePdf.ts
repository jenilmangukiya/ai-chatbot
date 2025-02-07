import { PdfReader } from "pdfreader";

export async function parsePdf(file: any) {
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  return new Promise((resolve, reject) => {
    let textContent = "";

    new PdfReader().parseBuffer(fileBuffer, (err, item) => {
      if (err) {
        return reject(
          "Something went wrong while reading the PDF content, Please try again"
        );
      }
      if (!item) {
        // End of file, resolve with the collected text content
        return resolve(textContent);
      }
      if (item.text) {
        textContent += item.text;
      }
    });
  });
}
