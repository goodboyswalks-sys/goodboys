const dimensions = {
 "hero-stick": [1122,1402], "good-gang": [1408,1117], "check-in": [1024,1536],
 "dog-days-out": [1536,1024], "road-trip": [1536,1024],
} as const;
export default function RefreshImage({name, alt, priority = false, sizes = "(max-width: 800px) 88vw, 30vw"}: {name: keyof typeof dimensions; alt: string; priority?: boolean; sizes?: string}) {
 const [width,height] = dimensions[name];
 const widths = [480,960,1600].filter(w => w <= width);
 return <img src={`/images/refresh/${name}.webp`} srcSet={[...widths.map(w => `/images/refresh/${name}-${w}.webp ${w}w`), `/images/refresh/${name}.webp ${width}w`].join(", ")} sizes={sizes} width={width} height={height} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"}/>;
}
