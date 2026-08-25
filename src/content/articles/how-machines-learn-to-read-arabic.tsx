import type { ReactNode } from 'react';

/**
 * Body for `how-machines-learn-to-read-arabic`.
 *
 * Authored prose, kept as semantic markup styled by the `.article-body`
 * rules in globals.css rather than utility classes on every tag, so the
 * text stays legible in source and edits stay cheap.
 *
 * Footnote markers link forward only. Several sources are cited more than
 * once, and giving every marker a back-link id would put duplicate ids in
 * the document.
 */

/** Forward reference to an entry in the reference list. */
function Ref({ n }: { n: number }) {
  return (
    <sup>
      <a href={`#fn-${n}`} aria-label={`Reference ${n}`}>
        [{n}]
      </a>
    </sup>
  );
}

/** Root-and-pattern derivations shown in the morphology section. */
const KTB_FORMS: ReadonlyArray<[form: string, meaning: string]> = [
  ['kataba', 'he wrote'],
  ['yaktubu', 'he writes'],
  ['kātib', 'writer'],
  ['kitāb', 'book'],
  ['maktab', 'office, desk'],
  ['maktūb', 'written; letter'],
];

const REFERENCES: readonly ReactNode[] = [
  <>
    Habash, N. et al.{' '}
    <em>
      A Panoramic Survey of Natural Language Processing in the Arab World.
    </em>{' '}
    arXiv:2011.12631.{' '}
    <a href="https://arxiv.org/abs/2011.12631" target="_blank" rel="noreferrer">
      arxiv.org/abs/2011.12631
    </a>
  </>,
  <>
    Habash, N. &amp; Rambow, O., and subsequent work; figure originates with the
    Standard Arabic Morphological Analyzer (Graff et al., 2009) and is widely
    cited via Pasha et al., <em>MADAMIRA</em> (LREC 2014) and Habash, N.,{' '}
    <em>Introduction to Arabic Natural Language Processing</em> (2010).
  </>,
  <>
    CAMeL Lab, NYU Abu Dhabi — Arabic Natural Language Processing overview.{' '}
    <a
      href="https://nyuad.nyu.edu/en/research/faculty-labs-and-projects/computational-approaches-to-modeling-language-lab/research/arabic-natural-language-processing.html"
      target="_blank"
      rel="noreferrer"
    >
      nyuad.nyu.edu
    </a>
  </>,
  <>
    <em>A Statistical Investigation of Diacritical Ambiguity in Arabic.</em>{' '}
    Springer, 2025. doi:10.1007/978-3-032-18857-1_55
  </>,
  <>
    Boudchiche, M. &amp; Mazroui, A.{' '}
    <em>Spline functions for Arabic morphological disambiguation.</em> Applied
    Computing and Informatics, Vol. 20 No. 3/4 (2024), pp. 198–216. Originally
    published 29 February 2020. doi:10.1016/j.aci.2020.02.002
  </>,
  <>
    Obeid, O., Zalmout, N., Khalifa, S., Taji, D., Oudah, M., Alhafni, B.,
    Inoue, G., Eryani, F., Erdmann, A. &amp; Habash, N.{' '}
    <em>
      CAMeL Tools: An Open Source Python Toolkit for Arabic Natural Language
      Processing.
    </em>{' '}
    LREC 2020, pp. 7022–7032.{' '}
    <a
      href="https://aclanthology.org/2020.lrec-1.868"
      target="_blank"
      rel="noreferrer"
    >
      aclanthology.org/2020.lrec-1.868
    </a>{' '}
    — dialect ID system based on Salameh, Bouamor &amp; Habash (2018).
  </>,
  <>
    Antoun, W., Baly, F. &amp; Hajj, H.{' '}
    <em>AraBERT: Transformer-based Model for Arabic Language Understanding.</em>{' '}
    2020.
  </>,
  <>
    <em>Interpreting Arabic Transformer Models.</em> arXiv:2201.07434.{' '}
    <a href="https://arxiv.org/abs/2201.07434" target="_blank" rel="noreferrer">
      arxiv.org/abs/2201.07434
    </a>
  </>,
  <>
    <em>
      A Computational Approach to Language Contact — A Case Study of Persian.
    </em>{' '}
    arXiv:2601.20592 (probing results include Arabic CASE).
  </>,
];

export default function HowMachinesLearnToReadArabic() {
  return (
    <>
      <h2>The problem in one sentence</h2>
      <p>
        Arabic packs into a single written word what English spreads across a
        clause. Conjunctions, prepositions, and pronouns attach directly to a
        stem, so <code>wa+sa+ya-drus-uuna+ha</code> is one Arabic token and five
        English words: “and they will study it.”
        <Ref n={1} />
      </p>
      <p>
        That density is only half the difficulty. The other half is that Arabic
        is written without most of its vowels, which means a single string of
        consonants can correspond to many different words. A system that wants
        to read Arabic has to first decide <em>which</em> word it is looking at
        before it can do anything else with it.
      </p>
      <p>
        Below are five specific consequences, with the numbers the research
        actually reports.
      </p>

      <hr />

      <h2>1. Undiacritized text is massively ambiguous</h2>
      <p>
        Arabic diacritics — the marks representing short vowels and gemination —
        are almost never written outside religious texts and children’s books.
        Fluent readers reconstruct them from context without effort. Machines
        cannot.
      </p>
      <p>
        The scale of the resulting ambiguity is well quantified. The Standard
        Arabic Morphological Analyzer produces an average of roughly{' '}
        <strong>12 morphological analyses per MSA word</strong>, out of context.
        <Ref n={2} /> English, by comparison, averages about 1.25 part-of-speech
        tags per word.
        <Ref n={3} /> MSA’s full POS tag set runs to over 300,000 tags;
        English’s is around 50.
        <Ref n={3} />
      </p>
      <p>
        A more recent statistical study puts the diacritization side of this in
        sharper terms: measured against a lexicon of 1.19 million unique
        diacritized tokens,{' '}
        <strong>
          more than 97% of words in running text accept more than one
          diacritization
        </strong>
        , with the average number of available diacritization choices reaching
        19.63.
        <Ref n={4} />
      </p>
      <p>
        So before a system does anything useful — search, translate, classify —
        it has to run a disambiguation step just to establish what part of
        speech it is dealing with.
      </p>

      <hr />

      <h2>2. Arabic morphology is templatic, not just concatenative</h2>
      <p>
        Most European languages build words concatenatively: a stem plus
        prefixes and suffixes, added at the edges. Arabic does that too — the
        clitics in the example above are concatenative. But it <em>also</em>{' '}
        uses a root-and-pattern system, where a set of consonants carrying the
        core meaning is interwoven with a vowel pattern carrying the grammatical
        function.
      </p>
      <p>
        The root <strong>k-t-b</strong> (
        <span className="lang-ar" lang="ar" dir="rtl">
          ك-ت-ب
        </span>
        ) encodes the idea of writing. Different patterns woven through it
        produce:
      </p>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Form</th>
              <th scope="col">Meaning</th>
            </tr>
          </thead>
          <tbody>
            {KTB_FORMS.map(([form, meaning]) => (
              <tr key={form}>
                <td>
                  <em>{form}</em>
                </td>
                <td>{meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        These two systems operate simultaneously, which is why Arabic is often
        described as both agglutinative and non-concatenative without
        contradiction. The practical upshot is that a stemmer designed to strip
        affixes off the ends of words handles the first system and fails
        completely on the second. To recover <em>k-t-b</em> from <em>maktūb</em>
        , a system has to reach inside the word, not trim its edges.
      </p>

      <hr />

      <h2>
        3. Statistical disambiguation has been attacked from unusual directions
      </h2>
      <p>
        Disambiguation — picking the correct analysis out of the twelve — has
        historically been handled with probabilistic sequence models, which
        suffer when they meet structures absent from their training data.
      </p>
      <p>
        One line of work has approached it as a geometry problem instead.
        Boudchiche and Mazroui model candidate analysis paths through a sentence
        as continuous quadratic splines, then treat disambiguation as surface
        optimization over those splines: the path with the smallest surface
        wins.
        <Ref n={5} /> Running on top of the AlKhalil Morpho Sys analyzer, their
        spline model exceeds <strong>94% accuracy</strong>, against 92.35% for a
        Hidden Markov Model and 88.43% for an SVM on the same task.
        <Ref n={5} />
      </p>
      <p>
        It is worth being precise about what this is and isn’t. The comparison
        is against HMM and SVM baselines, not against neural models, and the
        paper dates from 2020. It is a well-executed contribution to a specific
        sub-problem — not a break in the field’s trajectory, which by then had
        already moved to transformers. It’s included here because the framing is
        genuinely unusual, not because it displaced anything.
      </p>

      <hr />

      <h2>4. Dialect is where performance collapses</h2>
      <p>
        The gap between Modern Standard Arabic and the varieties people actually
        speak — diglossia — is the single biggest practical obstacle in Arabic
        NLP.
      </p>
      <p>
        Tools trained on MSA degrade sharply on dialectal input. Applying a
        state-of-the-art MSA morphological disambiguator to Gulf Arabic drops
        POS tagging accuracy to about <strong>72%</strong> and lemma accuracy to
        about <strong>64%</strong>, against roughly 96% for both on MSA.
        <Ref n={1} />
      </p>
      <p>
        Some of this is straightforwardly grammatical. Egyptian and Levantine
        both use a <em>b-</em> prefix on the imperfect verb, which MSA does not
        use in this aspectual role. But the two dialects do not use it the same
        way: in Egyptian, <em>bi-</em> covers both habitual and progressive
        readings, while in Levantine it marks the present indicative/habitual
        only — Levantine forms the progressive with{' '}
        <span className="lang-ar" lang="ar" dir="rtl">
          عم
        </span>{' '}
        <em>3am</em> instead. Treating <em>b-</em> as a single cross-dialectal
        “progressive marker” gets Levantine wrong.
      </p>
      <p>
        Tooling has moved toward handling dialect explicitly. CAMeL Tools ships
        a dialect identification component covering 25 Arabic city dialects plus
        MSA, alongside separate morphological databases and other utilities.
        <Ref n={6} /> But two caveats matter. First, dialect ID is not a solved
        problem: CAMeL’s classifier reaches <strong>67.9% accuracy</strong> on
        sentences averaging seven words.
        <Ref n={6} /> Second, coverage is uneven — the toolkit ships MSA and
        Egyptian morphological databases, so “dialect-aware morphology” does not
        yet mean equal support across Levantine, Gulf, and Maghrebi.
        <Ref n={6} />
      </p>

      <hr />

      <h2>
        5. Neural models learn some Arabic structure on their own — but not the
        part you’d hope
      </h2>
      <p>
        Models like AraBERT
        <Ref n={7} /> are trained on raw text with no grammatical supervision.
        Probing studies — training small classifiers on a model’s internal
        activations to test what information those activations encode — show
        that morphological structure emerges anyway, concentrated in the{' '}
        <strong>lower and middle layers</strong>, while dialect-identification
        knowledge sits in the higher layers.
        <Ref n={8} />
      </p>
      <p>Two findings deserve more attention than they usually get.</p>
      <p>
        First, the encoding is uneven by feature. For grammatical case in
        Arabic, one probing study found the recoverable information rising only
        from roughly 0.02 in the lowest layer to about 0.2 in the final layers —
        weak, for a language with a rich case system.
        <Ref n={9} /> “The model learns morphology” is true in aggregate and
        misleading in detail.
      </p>
      <p>
        Second — and this is the finding that most contradicts the usual
        narrative — models pre-trained on MSA alone <strong>do not</strong>{' '}
        implicitly acquire dialectal nuance.
        <Ref n={8} /> The intuition that a large enough model trained on enough
        Arabic will absorb regional variation for free is not what the probing
        results show. Dialect competence has to be built in deliberately,
        through dialectal pre-training data and dialect-specific resources.
      </p>

      <hr />

      <h2>Where this leaves things</h2>
      <p>
        The strongest current systems are hybrids: rule-based morphological
        analyzers built on centuries of Arabic grammatical description, paired
        with neural models that handle context and ambiguity. Neither half is
        sufficient alone. The analyzers give you coverage and linguistic
        precision; the neural models give you disambiguation that generalizes.
      </p>
      <p>
        The open problem is not really MSA. It is that most Arabic speech and
        most Arabic social media are not MSA, dialect resources remain thin
        relative to MSA resources, and the evidence suggests that scale alone
        will not close that gap. That’s a resource-and-annotation problem more
        than an architecture problem — which makes it slower and less glamorous
        to fix, and considerably more important.
      </p>

      <hr />

      <h2 id="references">References</h2>
      <ol className="footnotes">
        {REFERENCES.map((reference, i) => (
          <li key={i} id={`fn-${i + 1}`}>
            {reference}
          </li>
        ))}
      </ol>
    </>
  );
}
