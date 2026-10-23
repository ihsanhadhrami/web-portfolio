import { useRef } from 'react';
import { ExternalLink, Maximize2, X } from 'lucide-react';
import type { Certificate } from '@/types';
import { formatMonth } from '@/data/background';

/**
 * A certificate thumbnail that opens full size in a native <dialog>.
 * showModal() gives focus trapping, Escape to close, and an inert page
 * behind it without any library; a click on the backdrop also closes.
 */
export function CertificateCard({ certificate }: { certificate: Certificate }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { title, issuer, date, detail, image, credentialId, verifyUrl } =
    certificate;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`View certificate: ${title}`}
        className="group relative block aspect-[7/5] overflow-hidden border-b border-border bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <span
          aria-hidden="true"
          className="absolute right-3 bottom-3 grid size-8 place-items-center rounded-full bg-background/85 text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <Maximize2 className="size-4" />
        </span>
      </button>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-semibold leading-snug tracking-tight text-balance">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {issuer}
          {detail && <> · {detail}</>}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 font-mono text-xs text-muted-foreground">
          <span>{formatMonth(date)}</span>
          {credentialId && <span>ID {credentialId}</span>}
          {verifyUrl && (
            <a
              href={verifyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-sans font-medium text-primary underline underline-offset-4"
            >
              Verify
              <ExternalLink className="size-3" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-label={title}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto max-h-[92svh] w-[min(64rem,94vw)] overflow-visible bg-transparent p-0 backdrop:bg-black/75 backdrop:backdrop-blur-sm"
      >
        <div className="relative">
          <img
            src={image}
            alt={`${title} certificate, issued by ${issuer}`}
            className="max-h-[88svh] w-full rounded-xl object-contain shadow-2xl"
          />
          <form method="dialog">
            <button
              type="submit"
              aria-label="Close"
              className="absolute -top-3 -right-3 grid size-9 place-items-center rounded-full border border-border bg-background text-foreground shadow-lg transition-colors hover:bg-secondary"
            >
              <X className="size-4" />
            </button>
          </form>
        </div>
      </dialog>
    </article>
  );
}
