'use client';

import { useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';

export function VideoModal({
  src,
  open,
  onClose,
}: {
  src: string;
  open: boolean;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
      videoRef.current?.play().catch(() => {});
    } else {
      videoRef.current?.pause();
      dialog.close();
    }
  }, [open]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 m-auto w-[90vw] max-w-5xl bg-transparent backdrop:bg-black/80 p-0 open:flex items-center justify-center"
    >
      <div className="relative w-full rounded-lg overflow-hidden bg-dark">
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute top-3 right-3 z-10 flex items-center justify-center size-10 rounded-full bg-dark/70 text-surface-white hover:bg-brand-red transition-colors min-h-[44px] min-w-[44px]"
        >
          <X size={20} />
        </button>
        <video
          ref={videoRef}
          src={src}
          controls
          playsInline
          className="w-full aspect-video"
        />
      </div>
    </dialog>
  );
}
