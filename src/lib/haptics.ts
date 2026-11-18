export function haptic(ms = 15): void {
  if (typeof navigator === 'undefined' || !('vibrate' in navigator)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  navigator.vibrate(ms);
}
