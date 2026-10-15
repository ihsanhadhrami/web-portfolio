import { ExternalLink } from 'lucide-react';
import type {
  AlignedText,
  TranslationLanguage,
  TranslationSample as Sample,
} from '@/types';
import { cn } from '@/lib/utils';

const LANGUAGES: ReadonlyArray<{
  code: TranslationLanguage;
  name: string;
  dir: 'ltr' | 'rtl';
}> = [
  { code: 'ar', name: 'Arabic · Source', dir: 'rtl' },
  { code: 'ms', name: 'Malay', dir: 'ltr' },
  { code: 'en', name: 'English', dir: 'ltr' },
];

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

/**
 * Source text and translations, aligned passage by passage: three columns
 * on wide screens, stacked on phones. Language labels sit on every cell
 * rather than in a header row, so the stacked layout still says which
 * language each block is.
 *
 * Every block carries its own `lang` and `dir`, so screen readers switch
 * voice and the Arabic runs right to left with correct punctuation.
 */
export function TranslationSample({ sample }: { sample: Sample }) {
  const { source } = sample;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold tracking-tight">
          Translation sample
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {/*
            <bdi> isolates the Arabic run from the English sentence around
            it. A plain <span dir="rtl"> does not, and the bidi algorithm
            then pulls the quote marks and the following comma into the
            Arabic run, scrambling the punctuation.
          */}
          Source: “
          <bdi lang="ar" className="text-foreground">
            {source.title}
          </bdi>
          ”, {source.publisher}, {dateFormat.format(new Date(source.date))}.
          Excerpt translated for portfolio purposes.{' '}
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium text-primary underline underline-offset-4"
          >
            Read the original
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        </p>
      </div>

      <div className="flex flex-col">
        <Row text={sample.headline} headline />
        {sample.passages.map((passage, index) => (
          <Row key={index} text={passage} />
        ))}
      </div>
    </div>
  );
}

function Row({
  text,
  headline = false,
}: {
  text: AlignedText;
  headline?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-5 border-t border-border py-6 lg:grid-cols-3 lg:gap-8">
      {LANGUAGES.map(({ code, name, dir }) => (
        <div key={code} className="flex flex-col gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {name}
          </span>
          <p
            lang={code}
            dir={dir}
            className={cn(
              'text-pretty',
              headline
                ? 'font-semibold leading-snug text-foreground'
                : 'leading-relaxed text-muted-foreground',
              code === 'ar'
                ? cn('text-right', headline ? 'text-lg' : 'text-[1.075rem]')
                : headline
                  ? 'text-base'
                  : 'text-sm',
            )}
          >
            {text[code]}
          </p>
        </div>
      ))}
    </div>
  );
}
