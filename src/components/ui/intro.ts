function shouldPlay() {
  try {
    return (
      !sessionStorage.getItem('pbm-intro') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  } catch {
    return false;
  }
}

/** Whether the opening title card is still covering the page (read by the hero to time its entrance). */
export const intro = { pending: shouldPlay() };
