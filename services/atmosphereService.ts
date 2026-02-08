
export class AtmosphereEngine {
    private ctx: AudioContext | null = null;
    private windGain: GainNode | null = null;
    private rainGain: GainNode | null = null;
    private isRunning: boolean = false;

    private createNoiseNode() {
        if (!this.ctx) return null;
        const bufferSize = 2 * this.ctx.sampleRate;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;
        return whiteNoise;
    }

    public async start() {
        if (this.isRunning) return;
        try {
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            
            this.windGain = this.ctx.createGain();
            this.windGain.gain.value = 0;
            const windFilter = this.ctx.createBiquadFilter();
            windFilter.type = 'lowpass';
            windFilter.frequency.value = 400;

            const windNoise = this.createNoiseNode();
            if (windNoise) {
                windNoise.connect(windFilter);
                windFilter.connect(this.windGain);
                this.windGain.connect(this.ctx.destination);
                windNoise.start();
            }

            this.rainGain = this.ctx.createGain();
            this.rainGain.gain.value = 0;
            const rainFilter = this.ctx.createBiquadFilter();
            rainFilter.type = 'highpass';
            rainFilter.frequency.value = 1000;

            const rainNoise = this.createNoiseNode();
            if (rainNoise) {
                rainNoise.connect(rainFilter);
                rainFilter.connect(this.rainGain);
                this.rainGain.connect(this.ctx.destination);
                rainNoise.start();
            }

            this.isRunning = true;
        } catch (e) {
            console.error("Audio Engine failed to start", e);
        }
    }

    public update(weather: 'clear' | 'rain' | 'snow', time: number, enabled: boolean) {
        if (!this.ctx || !enabled) {
            if (this.windGain) this.windGain.gain.setTargetAtTime(0, this.ctx?.currentTime || 0, 0.5);
            if (this.rainGain) this.rainGain.gain.setTargetAtTime(0, this.ctx?.currentTime || 0, 0.5);
            return;
        }

        const now = this.ctx.currentTime;
        const windBase = weather === 'clear' ? 0.05 : weather === 'snow' ? 0.25 : 0.15;
        this.windGain?.gain.setTargetAtTime(windBase, now, 1);

        const rainBase = weather === 'rain' ? 0.3 : 0;
        this.rainGain?.gain.setTargetAtTime(rainBase, now, 1);
    }

    public stop() {
        this.ctx?.close();
        this.isRunning = false;
    }
}

export const atmosphere = new AtmosphereEngine();
