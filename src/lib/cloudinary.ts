import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export function getPublicIdFromUrl(url: string): string | null {
  try {
    const urlParts = url.split("/");
    const uploadIndex = urlParts.indexOf("upload");

    if (uploadIndex === -1) return null;

    // Get everything after 'upload' excluding the version and file extension
    const relevantParts = urlParts.slice(uploadIndex + 2);
    const publicId = relevantParts.join("/").split(".")[0];

    return publicId;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return null;
  }
}
