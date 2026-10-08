import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '@/lib/sound';
import { cn } from '@/lib/utils';

/** Mutes or plays the soft background dhak. */
export function SoundToggle({ className }: { className?: string }) {
  const playing = useSound((s) => s.playing);
  const toggle = useSound((s) => s.toggle);
  return (
    <button
      type="button"
      onClick={() => void toggle()}
      aria-pressed={playing}
      aria-label={playing ? 'Mute the background dhak music' : 'Play soft background dhak music'}
      title={playing ? 'Mute festive music' : 'Play festive music'}
      className={cn('icon-btn', playing && 'border-gold/60 text-gold-bright', className)}
    >
      {playing ? <Volume2 className="size-[18px]" /> : <VolumeX className="size-[18px]" />}
    </button>
  );
}
