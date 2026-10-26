import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ZoomIn, X } from "lucide-react";
import { cn } from "../utils/cn";

export interface ZoomPhoto {
  src: string;
  alt: string;
  title: string;
}

export function ZoomableImage({
  photo,
  onOpen,
  className,
  imageClassName,
}: {
  photo: ZoomPhoto;
  onOpen: (photo: ZoomPhoto) => void;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(photo)}
      aria-label={`View larger image: ${photo.title}`}
      className={cn(
        "group/photo relative block w-full cursor-zoom-in overflow-hidden bg-canvas text-left focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-primary",
        className,
      )}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        className={cn(
          "h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover/photo:scale-[1.045]",
          imageClassName,
        )}
      />
      <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover/photo:bg-black/15" />
      <span className="absolute right-3 bottom-3 grid h-9 w-9 translate-y-1 place-items-center bg-[rgba(19,21,22,0.7)] text-white opacity-0 transition-all duration-300 group-hover/photo:translate-y-0 group-hover/photo:opacity-100 group-focus-visible/photo:translate-y-0 group-focus-visible/photo:opacity-100 sm:right-4 sm:bottom-4">
        <ZoomIn className="h-4 w-4" />
      </span>
    </button>
  );
}

export function PhotoLightbox({
  photo,
  onClose,
}: {
  photo: ZoomPhoto | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!photo) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [photo, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(19,21,22,0.92)] p-4 backdrop-blur-sm sm:p-8"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Image preview: ${photo.title}`}
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-full w-full max-w-6xl flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close image preview"
              className="absolute -top-12 right-0 z-10 grid h-10 w-10 place-items-center border border-hairline text-white transition-colors hover:bg-white hover:text-primary sm:-top-14 sm:h-11 sm:w-11"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={photo.src}
              alt={photo.alt}
              className="max-h-[78vh] max-w-full object-contain shadow-[0_32px_90px_-24px_rgba(0,0,0,0.8)]"
            />
            <p className="mt-4 max-w-2xl text-center font-serif text-lg italic text-white">
              {photo.title}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
