import React, { useState, Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ExternalLink, Award, Loader2, AlertCircle } from 'lucide-react';

// Use the bundled worker matching react-pdf's internal build
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Local Error Boundary to swallow unhandled PDF.js worker throws
class PDFErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.warn("Caught PDF render error:", error);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function CertificateCard({ cert }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const targetUrl = cert.fileUrl || `/certifications/${encodeURIComponent(cert.file)}`;

  const handleOpenPdf = () => {
    if (!hasError && targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const errorFallback = (
    <div className="flex flex-col items-center justify-center gap-2 p-6 text-center text-zinc-500">
      <AlertCircle className="h-8 w-8 text-amber-500/70" />
      <p className="text-xs font-mono text-zinc-400">Preview Unavailable</p>
      <p className="text-[10px] font-mono text-zinc-600 truncate max-w-[200px]">{cert.title}</p>
    </div>
  );

  return (
    <div
      onClick={handleOpenPdf}
      className="group relative flex-shrink-0 w-[300px] sm:w-[360px] md:w-[400px] cursor-pointer rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-4 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/50 hover:shadow-[0_0_35px_-5px_rgba(168,85,247,0.35)]"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleOpenPdf();
        }
      }}
      aria-label={`View certificate for ${cert.title}`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/10 via-sky-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950 flex items-center justify-center">
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-500 bg-zinc-950/80 z-10">
            <Loader2 className="h-5 w-5 animate-spin text-violet-400" />
            <span className="text-[10px] font-mono tracking-wider uppercase">Loading Doc</span>
          </div>
        )}

        {hasError ? (
          errorFallback
        ) : (
          <PDFErrorBoundary fallback={errorFallback}>
            <Document
              file={targetUrl}
              onLoadSuccess={() => {
                setIsLoaded(true);
                setHasError(false);
              }}
              onLoadError={(err) => {
                console.warn(`PDF failed to load: ${targetUrl}`, err);
                setHasError(true);
                setIsLoaded(false);
              }}
              loading=""
              error=""
              className="flex items-center justify-center h-full w-full pointer-events-none"
            >
              <Page
                pageNumber={1}
                width={380}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="shadow-md rounded-lg overflow-hidden transition-transform duration-500 group-hover:scale-105"
              />
            </Document>
          </PDFErrorBoundary>
        )}

        {!hasError && (
          <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center z-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/50 bg-zinc-900/90 px-4 py-2 text-xs font-mono font-medium text-white shadow-xl">
              <ExternalLink className="h-3.5 w-3.5 text-violet-400" />
              Open Original PDF
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3 relative z-10 px-1">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-violet-400 mb-1">
            <Award className="h-3 w-3" />
            <span>{cert.issuer}</span>
          </div>
          <h4 className="text-sm font-semibold text-white tracking-tight line-clamp-1 group-hover:text-violet-200 transition-colors">
            {cert.title}
          </h4>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">{cert.date}</p>
        </div>

        <div className="rounded-lg border border-white/5 bg-zinc-900/60 p-2 text-zinc-400 group-hover:text-white group-hover:border-white/20 transition-all">
          <ExternalLink className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}