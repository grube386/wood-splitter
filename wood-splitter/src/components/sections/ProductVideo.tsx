import { VideoShowcase } from '@/components/VideoShowcase';

export function ProductVideo() {
  return (
    <section id="product-video" className="bg-dark">
      <VideoShowcase
        src="/videos/product-showcase.mp4"
        poster="/videos/product-showcase-poster.jpg"
        className="w-full max-h-[80vh] object-cover"
      />
    </section>
  );
}
