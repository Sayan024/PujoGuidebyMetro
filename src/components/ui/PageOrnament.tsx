import { Alpana } from './Motifs';

/**
 * Faint alpana line-art hugging the page edges, behind everything. It is purely
 * decorative, fixed in place, and sits at the edges so it never fights the content.
 */
export function PageOrnament() {
  return (
    <div className="page-ornament" aria-hidden="true">
      <Alpana className="absolute -left-[24vw] top-[6vh] aspect-square w-[min(48vw,780px)] rotate-12 opacity-[0.16]" petals={16} />
      <Alpana className="absolute -right-[26vw] top-[46vh] aspect-square w-[min(52vw,840px)] -rotate-6 opacity-[0.13]" petals={12} />
    </div>
  );
}
