export const config = {
  maxUploadSize: parseInt(process.env.MAX_UPLOAD_SIZE || "104857600"), // 100MB default
  allowedPdfTypes: (process.env.ALLOWED_PDF_TYPES || "application/pdf").split(","),
  allowedImageTypes: (process.env.ALLOWED_IMAGE_TYPES || "image/jpeg,image/png,image/webp").split(","),
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
};

