// Immersive Cybernetic Web Audio Synthesizer & Sound Manager
class CyberSoundSystem {
  private audioCtx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private ambientAudio: HTMLAudioElement | null = null;
  private isAmbientPlaying: boolean = false;
  private lastScrollTickTime: number = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      // Memory check: defaults to TRUE (Sound ON by default per user requirement)
      const stored = localStorage.getItem('portfolio_sound_enabled');
      this.soundEnabled = stored === null ? true : stored === 'true';
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public init() {
    this.getAudioContext();
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_sound_enabled', enabled ? 'true' : 'false');
    }

    if (!enabled && this.ambientAudio) {
      this.fadeAmbient(0, 400, () => {
        if (this.ambientAudio) {
          this.ambientAudio.pause();
          this.isAmbientPlaying = false;
        }
      });
    } else if (enabled && this.ambientAudio) {
      this.ambientAudio.play().then(() => {
        this.isAmbientPlaying = true;
        this.fadeAmbient(0.28, 800);
      }).catch(() => {});
    }
  }

  public setAmbientAudioElement(audio: HTMLAudioElement) {
    this.ambientAudio = audio;
    this.ambientAudio.volume = 0;
  }

  public startAmbientOnEnter() {
    if (!this.soundEnabled || !this.ambientAudio) return;
    this.ambientAudio.play().then(() => {
      this.isAmbientPlaying = true;
      this.fadeAmbient(0.28, 1200);
    }).catch(() => {});
  }

  private fadeAmbient(targetVolume: number, durationMs: number, onComplete?: () => void) {
    if (!this.ambientAudio) return;
    const startVol = this.ambientAudio.volume;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      if (this.ambientAudio) {
        this.ambientAudio.volume = Math.max(0, Math.min(1, startVol + (targetVolume - startVol) * progress));
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else if (onComplete) {
        onComplete();
      }
    };
    requestAnimationFrame(step);
  }

  // Soft UI hover tick (subtle, acoustic, elegant - not loud or harsh)
  public playHover() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1240, now + 0.025);

      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.025);
    } catch {
      // Ignored
    }
  }

  // Refined button click
  public playClick() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(340, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.045);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Ignored
    }
  }

  // Soft futuristic transition sound for navigation
  public playTransition() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(440, now);
      osc1.frequency.exponentialRampToValueAtTime(660, now + 0.16);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now);
      osc2.frequency.exponentialRampToValueAtTime(1320, now + 0.16);

      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.16);
      osc2.stop(now + 0.16);
    } catch {
      // Ignored
    }
  }

  // Terminal keystroke initialization blip
  public playInitLog() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(2200, now + 0.015);

      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.015);
    } catch {
      // Ignored
    }
  }

  // Cinematic startup sound for boot sequence
  public playBoot() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Bass sweep
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(80, now);
      bassOsc.frequency.exponentialRampToValueAtTime(220, now + 0.4);
      bassGain.gain.setValueAtTime(0.09, now);
      bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
      bassOsc.connect(bassGain);
      bassGain.connect(ctx.destination);
      bassOsc.start(now);
      bassOsc.stop(now + 0.45);

      // Chime sweep
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chimeOsc.type = 'triangle';
      chimeOsc.frequency.setValueAtTime(440, now + 0.08);
      chimeOsc.frequency.exponentialRampToValueAtTime(1760, now + 0.4);
      chimeGain.gain.setValueAtTime(0.04, now + 0.08);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
      chimeOsc.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chimeOsc.start(now + 0.08);
      chimeOsc.stop(now + 0.45);
    } catch {
      // Ignored
    }
  }

  // Warp digital world enter sound
  public playEnter() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(120, now);
      osc1.frequency.exponentialRampToValueAtTime(520, now + 0.35);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(240, now);
      osc2.frequency.exponentialRampToValueAtTime(980, now + 0.35);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.38);
      osc2.stop(now + 0.38);
    } catch {
      // Ignored
    }
  }

  // Subtle scrolling ambient tick (throttled)
  public playScrollTick() {
    if (!this.soundEnabled) return;
    const now = Date.now();
    if (now - this.lastScrollTickTime < 380) return;
    this.lastScrollTickTime = now;

    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(640, t);
      osc.frequency.exponentialRampToValueAtTime(820, t + 0.018);

      gain.gain.setValueAtTime(0.012, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.018);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.018);
    } catch {
      // Ignored
    }
  }
}

export const cyberSound = new CyberSoundSystem();
