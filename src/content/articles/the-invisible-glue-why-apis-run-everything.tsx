import type { ReactNode } from 'react';

/**
 * Body for `the-invisible-glue-why-apis-run-everything`.
 *
 * Authored prose, kept as semantic markup styled by the `.article-body`
 * rules in globals.css rather than utility classes on every tag.
 *
 * Footnote markers link forward only, matching the pattern in
 * how-machines-learn-to-read-arabic: a source cited more than once would
 * otherwise need duplicate back-link ids.
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

/** HTTP verbs and their effect on a resource, from the REST section. */
const HTTP_VERBS: ReadonlyArray<[verb: string, effect: string]> = [
  ['GET', 'Retrieves data without making any changes.'],
  ['POST', 'Submits or creates new data on the server.'],
  ['PATCH', 'Updates existing data.'],
  ['DELETE', 'Removes specific data from the server.'],
];

const REFERENCES: readonly ReactNode[] = [
  <>
    freeCodeCamp.org &amp; Craig Dennis.{' '}
    <em>APIs for Beginners - How to use an API (Full Course / Tutorial).</em>{' '}
    YouTube video.
  </>,
  <>
    freeCodeCamp.org &amp; Shivani (Hack Club).{' '}
    <em>
      Intro to Backend Web Development – Node.js &amp; Express Tutorial for
      Beginners.
    </em>{' '}
    YouTube video.
  </>,
  <>
    <em>How Can You Install Node on Your Computer?</em> Technical guide.
    <br />
    This guide illustrates how local development environments rely on package
    manager APIs like npm to automatically resolve, fetch, and organize the
    software dependencies and scripts required to run modern backend frameworks.
    It also highlights how tools like NVM (Node Version Manager) allow
    developers to easily isolate and switch between different environment
    runtimes on a single machine.
  </>,
];

export default function TheInvisibleGlueWhyApisRunEverything() {
  return (
    <>
      <h2>1. Introduction: the magic behind the button</h2>
      <p>
        Have you ever paused to wonder how your phone translates a foreign
        street sign in real time, or how that music app streams millions of
        songs in an instant? To most of us, these features feel like pure magic.
        But behind every button press is a silent hero working in the shadows:
        the API.
      </p>
      <p>
        API stands for Application Programming Interface. While the name sounds
        like heavy technical jargon, the concept is beautifully simple. It’s the
        “invisible glue” that allows different software programs to talk to each
        other without needing to know how their neighbors actually work. It’s
        the secret language that keeps our digital world connected, clean, and
        highly efficient.
      </p>

      <hr />

      <h2>2. The “radio” concept: interface vs. implementation</h2>
      <p>
        The “I” in API stands for Interface. To understand this, picture a
        traditional radio. The radio provides a familiar interface: a volume
        knob, a station dial, and an on/off switch. You don’t need to be an
        electrical engineer to hear the news; the interface lets you control the
        system through exposed options while the internal circuitry remains a
        mystery.
      </p>
      <p>
        This is the power of abstraction. An API works exactly like that radio
        dial: it lets a developer control a complex system by exposing only what
        they need to see. As one course puts it, “the magic that is happening is
        completely abstracted away from me. I’m still in control of what has
        been determined that I, a user, can handle.”
        <Ref n={1} />
      </p>
      <p>
        This even applies to your phone’s hardware. Developers use a media
        player API on Android or iOS to play music. They don’t have to
        understand how to send audio data to the physical speakers; they just
        call the “play” method, and the API handles the implementation.
      </p>

      <hr />

      <h2>3. Standing on the shoulders of giants: APIs are everywhere</h2>
      <p>
        It’s a common misconception that APIs only exist on the web. In reality,
        they are everywhere in your software journey. When a programmer writes
        code to make text uppercase, they are using a string API. We are
        constantly standing on the shoulders of giants, using libraries and
        frameworks to solve complex problems, like turning a photo black and
        white, without having to invent the math from scratch. Package manager
        APIs like npm are how a local project actually gets its hands on those
        libraries in the first place.
        <Ref n={3} />
      </p>
      <p>
        One of the most surprising examples is your computer’s file system.
        Windows and macOS manage files in totally different ways, yet your
        programming language provides a single API for working with files.
        Because the interface stays the same, you can write one script that
        works on both Mac and Windows. The API abstracts those operating system
        differences away, so you don’t have to worry about them.
      </p>
      <p>
        Even web browsers like Chrome, Safari, and Edge work similarly because
        they all implement a shared set of Web APIs. This ensures the code you
        write for a website works the same way no matter which browser your user
        prefers.
      </p>

      <hr />

      <h2>4. Remote APIs: infinite power in a small device</h2>
      <p>
        The most impactful shift in modern tech is the move toward remote APIs:
        interfaces that live in the cloud. Remote APIs give your mobile device
        seemingly infinite power by offloading heavy processing to servers you
        never see.
        <Ref n={2} />
      </p>
      <p>
        Think about an app like Shazam, which identifies music, or a translation
        app’s live camera feature. Your phone doesn’t have the storage to hold
        every song ever recorded, nor the raw power to translate languages
        instantaneously. Instead, the phone sends a request to a remote API. The
        heavy lifting happens elsewhere in the cloud, and the answer comes back
        in seconds. This removes the physical limitations of local hardware
        entirely.
      </p>

      <hr />

      <h2>5. The digital contract: understanding REST and HTTP</h2>
      <p>
        For different systems to communicate, they follow a digital contract, or
        protocol. Think of a protocol like a rally chant: “when I say ‘Fu’, you
        say ‘Bar’!” If I yell “Fu” and you yell anything other than “Bar,”
        you’ve broken the protocol.
      </p>
      <p>
        The most popular style for these contracts today is REST
        (Representational State Transfer). REST sits on top of standard web
        technology, HTTP, like a really nice hat. It lets developers interact
        with resources using a predictable set of rules called HTTP verbs. These
        verbs define the intention of every request:
      </p>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Verb</th>
              <th scope="col">What it does to the data</th>
            </tr>
          </thead>
          <tbody>
            {HTTP_VERBS.map(([verb, effect]) => (
              <tr key={verb}>
                <td>
                  <code>{verb}</code>
                </td>
                <td>{effect}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr />

      <h2>6. The “mashup”: building with digital Legos</h2>
      <p>
        The most exciting part of modern development is the mashup. Because
        companies like Spotify (music data) and Twilio (SMS and communication)
        expose their services via APIs, developers can smoosh together different
        services to build something entirely new.
      </p>
      <p>
        Modern development isn’t about building every brick from scratch; it’s
        about orchestrating existing services like digital Legos. You can wire
        up a global app in a few lines of code by connecting to these
        established platforms. As Craig Dennis puts it, “when designed well,
        [APIs] make nearly impossible things happen with just a few lines of
        code.”
        <Ref n={1} />
      </p>

      <hr />

      <h2>7. Conclusion: your new digital perspective</h2>
      <p>
        APIs are far more than a technical acronym; they are the language of
        connection in our digital age. They provide the abstractions that let us
        focus on solving human problems rather than worrying about low-level
        implementation details. Whether you are streaming a song, translating a
        sign, or sending a text, there is an invisible contract making it
        happen.
      </p>
      <p>
        Now that you know the world is built on these invisible contracts, what
        “impossible” service will you choose to connect next?
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
