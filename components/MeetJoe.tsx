// Photos 01–04 correspond to web pic 1–4. Keep this order.
const photos = [
  { src: "/images/joe/joe-01.webp", width: 1050, height: 1400, alt: "Joe spending time with a dog" },
  { src: "/images/joe/joe-02.webp", width: 1050, height: 1400, alt: "Joe spending time with a dog" },
  { src: "/images/joe/joe-03.webp", width: 1050, height: 1400, alt: "Joe spending time with dogs" },
  { src: "/images/joe/joe-04.webp", width: 1050, height: 1400, alt: "Joe spending time with a dog" },
  { src: "/images/joe/joe-05.webp", width: 1051, height: 1400, alt: "Joe spending time with a dog" },
  { src: "/images/joe/joe-06.webp", width: 1050, height: 1400, alt: "Joe spending time with a dog" },
  { src: "/images/joe/joe-07.webp", width: 1400, height: 1400, alt: "Joe spending time with dogs" },
  { src: "/images/joe/joe-08.webp", width: 1400, height: 1050, alt: "Joe spending time with a dog" },
  { src: "/images/joe/joe-09.webp", width: 720, height: 972, alt: "Joe spending time with dogs" },
  { src: "/images/joe/joe-10.webp", width: 1050, height: 1400, alt: "Joe spending time with a dog" },
  { src: "/images/joe/joe-11.webp", width: 1050, height: 1400, alt: "Joe spending time with a dog" },
  { src: "/images/joe/joe-12.webp", width: 1400, height: 1050, alt: "Joe spending time with a dog" },
];

export default function MeetJoe() {
  return (
    <section id="meet-joe" className="section meet-joe" aria-labelledby="meet-joe-title">
      <div className="joe-intro">
        <div>
          <span className="eyebrow">THE PERSON AT THE OTHER END OF THE LEAD</span>
          <h2 id="meet-joe-title">Meet Joe.</h2>
          <p className="joe-subtitle">A few years. A lot of good dogs.</p>
        </div>
        <div className="joe-bio">
          <span className="joe-bio-label">BIO COMING SOON</span>
          {/* Replace this paragraph with Joe's approved bio. */}
          <p>Hi, I’m Joe, the person behind Goodboys. These are a few personal photos of me with dogs over the years. My full story will be here soon—in the meantime, say hello and tell me about your dog.</p>
          <a className="text-link" href="#join">Say hello to Joe ↗</a>
        </div>
      </div>
      <div className="joe-gallery-heading"><span>JOE &amp; FRIENDS / THROUGH THE YEARS</span><span>Scroll to see more →</span></div>
      <div className="joe-gallery" tabIndex={0} role="region" aria-label="Joe with dogs over the years. Scroll horizontally to see all twelve photos.">
        {photos.map((photo, index) => (
          <figure className="joe-photo" key={photo.src}>
            <div className="joe-photo-frame"><img {...photo} loading="lazy" decoding="async" /></div>
            <figcaption><span>{String(index + 1).padStart(2, "0")} / GOOD COMPANY</span><span aria-hidden="true">♡</span></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
