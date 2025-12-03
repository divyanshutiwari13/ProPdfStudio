# ProPDF Studio

A modern, all-in-one PDF toolkit built with Next.js 14, TypeScript, and Tailwind CSS. Process, merge, split, compress, and convert PDFs directly in your browser.

## Features

- **Merge PDF** - Combine multiple PDF files into one document
- **Split PDF** - Extract pages from a PDF or split into multiple files
- **Compress PDF** - Reduce PDF file size with compression statistics and multiple quality levels
- **PDF to Images** - Convert PDF pages to images and download as a ZIP file
- **Images to PDF** - Combine multiple images into a single PDF document
- **User Dashboard** - Track your processing history and access recent files
- **Secure Authentication** - Email/password authentication with MongoDB and password visibility toggle
- **Upload Progress** - Real-time upload progress with percentage indicators
- **File Size Support** - Upload files up to 100MB
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB (localhost)
- **PDF Processing**: pdf-lib, pdfjs-dist
- **Image Processing**: sharp
- **File Compression**: JSZip (for ZIP file creation)
- **Authentication**: Custom auth with bcryptjs
- **File Upload**: react-dropzone with progress tracking

## Prerequisites

- Node.js 18+ installed
- MongoDB running on localhost:27017
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd propdf-studio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and configure:
```env
MONGODB_URI=mongodb://localhost:27017/propdf-studio
NEXT_PUBLIC_APP_URL=http://localhost:3000
MAX_UPLOAD_SIZE=104857600
ALLOWED_PDF_TYPES=application/pdf
ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/webp
SESSION_SECRET=your-secret-key-here-change-in-production
```

4. Make sure MongoDB is running:
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
# Start MongoDB service from Services panel
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
propdf-studio/
├── app/                    # Next.js App Router pages
│   ├── (public)/          # Public pages
│   ├── dashboard/         # Protected dashboard pages
│   ├── tools/             # PDF tool pages
│   ├── api/               # API routes
│   ├── actions/           # Server actions
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Header.tsx         # Navigation header with auth state
│   ├── Footer.tsx         # Site footer
│   ├── FileUpload.tsx     # File upload with progress tracking
│   └── ToolCard.tsx       # Tool card component
├── lib/                   # Utility libraries
│   ├── mongodb.ts         # MongoDB connection
│   ├── auth.ts            # Authentication logic
│   ├── config.ts          # App configuration
│   ├── utils/             # Utility functions
│   │   └── base64.ts      # Base64 conversion helpers
│   ├── db/                # Database operations
│   └── pdf/               # PDF processing functions
│       ├── merge.ts       # PDF merging
│       ├── split.ts       # PDF splitting
│       ├── compress.ts    # PDF compression
│       ├── pdf-to-images.ts # PDF to images conversion
│       └── images-to-pdf.ts # Images to PDF conversion
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## Main Features Implementation

### PDF Processing

PDF operations are implemented using `pdf-lib` and `pdfjs-dist`:

- **Merge**: Combines multiple PDFs by copying pages from each document
- **Split**: Extracts specific page ranges from a PDF
- **Compress**: Optimizes PDF structure and uses object streams for compression with compression statistics
- **PDF to Images**: Renders PDF pages to canvas, converts to images, and packages them in a ZIP file
- **Images to PDF**: Embeds images into PDF pages using sharp for processing

### Authentication

- User registration and login with email/password
- Password visibility toggle (show/hide password)
- Password hashing using bcryptjs
- Session management with HTTP-only cookies
- Protected routes using server-side authentication checks
- Real-time authentication state synchronization across components

### File Handling

- Drag & drop file upload with react-dropzone
- Real-time upload progress with percentage indicators and progress bars
- File validation (type, size up to 100MB)
- Client-side file processing where possible
- Server-side processing for complex operations
- Base64 serialization for Server Actions compatibility
- Automatic cleanup of temporary files

## Usage Examples

### Merging PDFs

1. Navigate to `/tools/merge-pdf`
2. Drag and drop or select multiple PDF files
3. Reorder files using up/down arrows if needed
4. Click "Merge PDFs"
5. Download the merged result

### Splitting a PDF

1. Navigate to `/tools/split-pdf`
2. Upload a PDF file
3. Enter page ranges (e.g., "1-3, 5, 7-10")
4. Click "Split PDF"
5. Download individual split files

### Compressing a PDF

1. Navigate to `/tools/compress-pdf`
2. Upload a PDF file (watch the upload progress)
3. Select compression level (High Quality, Balanced, Smallest Size)
4. Click "Compress PDF"
5. View compression statistics (original size, compressed size, reduction percentage)
6. Download the compressed file

### Converting PDF to Images

1. Navigate to `/tools/pdf-to-images`
2. Upload a PDF file
3. Click "Convert to Images"
4. Wait for conversion to complete
5. Download all pages as a ZIP file containing JPG images

### Converting Images to PDF

1. Navigate to `/tools/images-to-pdf`
2. Upload one or more image files (JPG, PNG, WebP)
3. Watch upload progress for each file
4. Click "Create PDF"
5. Download the generated PDF

## API Routes

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check` - Check authentication status
- `POST /api/pdf-to-images` - Convert PDF to images (server-side)

## Server Actions

- `processMerge` - Merge multiple PDFs
- `processSplit` - Split PDF by page ranges
- `processCompress` - Compress PDF with selected level
- `processImagesToPdf` - Convert images to PDF

## Database Schema

### Users Collection
```typescript
{
  _id: string;
  email: string;
  password: string; // hashed
  name: string;
  createdAt: Date;
}
```

### Activities Collection
```typescript
{
  _id: string;
  userId: string;
  toolType: "merge" | "split" | "compress" | "pdf-to-images" | "images-to-pdf";
  fileName: string;
  fileSize: number;
  createdAt: Date;
  downloadUrl?: string;
}
```

## Development

### Build for Production

```bash
npm run build
npm start
```

### Running with PM2

For production deployment, use PM2 process manager:

```bash
# Install PM2 globally
npm install -g pm2

# Build the application
npm run build

# Start with PM2
pm2 start ecosystem.config.js --env production

# Save PM2 process list for auto-start on reboot
pm2 save
pm2 startup
```

See [PM2_GUIDE.md](./PM2_GUIDE.md) for detailed PM2 deployment instructions.

### Linting

```bash
npm run lint
```

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `NEXT_PUBLIC_APP_URL` - Application URL
- `MAX_UPLOAD_SIZE` - Maximum file upload size in bytes
- `ALLOWED_PDF_TYPES` - Comma-separated list of allowed PDF MIME types
- `ALLOWED_IMAGE_TYPES` - Comma-separated list of allowed image MIME types
- `SESSION_SECRET` - Secret key for session encryption

## Limitations

- PDF to Images conversion is done client-side (uses pdfjs-dist in browser)
- File size limits are enforced (default 100MB, configurable via `MAX_UPLOAD_SIZE`)
- Processing happens in memory (large files may cause performance issues)
- No persistent file storage (files are processed and discarded after download)
- PDF compression is limited by pdf-lib's capabilities (uses object streams optimization)
- For advanced PDF compression, external tools like qpdf or Ghostscript would be needed

## Recent Updates

- ✅ Increased max upload size to 100MB
- ✅ Added upload progress indicators with percentage
- ✅ Added password visibility toggle in login/register forms
- ✅ Fixed authentication state synchronization
- ✅ PDF to Images now downloads as ZIP file
- ✅ Compression shows statistics (original vs compressed size)
- ✅ Improved error handling and user feedback
- ✅ Better file serialization for Server Actions

## Future Enhancements

- Add more PDF tools (rotate, watermark, add text, etc.)
- Implement file storage for dashboard downloads
- Add batch processing capabilities
- Integrate advanced compression tools (qpdf, Ghostscript)
- Add OCR functionality
- Implement file sharing features
- Add PDF metadata editing
- Support for password-protected PDFs

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Support

For issues, questions, or contributions, please open an issue on the repository or contact support@propdfstudio.com.

