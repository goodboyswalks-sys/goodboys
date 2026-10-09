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
          <p>Some of my earliest memories are of my dad and our family border collie, Rosie. They had a bond built on trust, loyalty and simply enjoying each other’s company. Watching them together was my first glimpse of how much a dog can mean to someone and how much we can mean to them.</p>
          <p>After we said goodbye to Rosie, Max, a Labrador, became part of our family. He made his own place in our lives, and dogs became a constant in mine: companions who shape your routines, share your home and become part of what makes it feel like home.</p>
          <p>When Max passed away, it was hard to imagine choosing anything other than another Labrador. Along came Duke: playful, always up for a cuddle and an absolute legend. His mix of mischief and affection has given us plenty of reasons to love the breed all over again.</p>
          <p>Growing up with them taught me patience, responsibility and the importance of showing up for someone who depends on you. Those lessons have stayed with me.</p>
          <p>After exploring different career paths, I’ve realised that spending time with dogs is what gives me the most fulfilment. There’s a simple joy in getting to know their personalities, earning their trust and building a bond. That’s what’s behind Goodboys — and I’m looking forward to meeting your dogs and getting to know what makes each of them special.</p>
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
