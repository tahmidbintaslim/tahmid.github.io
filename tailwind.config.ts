import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        cursive: ['var(--font-cursive)', 'cursive'],
      },
      colors: {
        space: {
          950: '#030014',
          940: '#0a0118',
          930: '#1a0b2e',
          900: '#0a0a1a',
          850: '#0d0d20',
          825: '#1a0a2e',
          800: '#1a1a2e',
          700: '#2A0E61',
        },
        brand: {
          500: '#7042f8',
          400: '#8052f8',
          300: '#b49bff',
        },
      },
      fontSize: {
        'xs': 'clamp(0.75rem, 0.7vw + 0.6rem, 0.875rem)', // ~12px - 14px
        'sm': 'clamp(0.875rem, 0.8vw + 0.7rem, 1rem)', // ~14px - 16px
        'base': 'clamp(1rem, 0.9vw + 0.8rem, 1.125rem)', // ~16px - 18px
        'lg': 'clamp(1.125rem, 1vw + 0.9rem, 1.25rem)', // ~18px - 20px
        'xl': 'clamp(1.25rem, 1.2vw + 1rem, 1.5rem)', // ~20px - 24px
        '2xl': 'clamp(1.5rem, 1.5vw + 1.2rem, 2rem)', // ~24px - 32px
        '3xl': 'clamp(1.875rem, 2vw + 1.4rem, 2.5rem)', // ~30px - 40px
        '4xl': 'clamp(2.25rem, 2.5vw + 1.6rem, 3rem)', // ~36px - 48px
        '5xl': 'clamp(3rem, 3vw + 2rem, 4rem)', // ~48px - 64px
        '6xl': 'clamp(3.75rem, 4vw + 2.5rem, 5rem)', // ~60px - 80px
        '7xl': 'clamp(4.5rem, 5vw + 3rem, 6rem)', // ~72px - 96px
        '8xl': 'clamp(6rem, 6vw + 4rem, 8rem)', // ~96px - 128px
        '9xl': 'clamp(8rem, 8vw + 5rem, 10rem)', // ~128px - 160px
        // Legacy sizes for backward compatibility
        '2.5': 'clamp(0.75rem, 0.7vw + 0.6rem, 0.875rem)', // ~12px - 14px
        '3': 'clamp(0.875rem, 0.8vw + 0.7rem, 1rem)', // ~14px - 16px
        '3.25': 'clamp(0.9375rem, 0.85vw + 0.75rem, 1.0625rem)', // ~15px - 17px
        '5': 'clamp(1.25rem, 1.2vw + 1rem, 1.5rem)', // ~20px - 24px
        '6-5': 'clamp(1.625rem, 1.6vw + 1.3rem, 2rem)', // ~26px - 32px
        '7': 'clamp(1.75rem, 1.7vw + 1.4rem, 2.25rem)', // ~28px - 36px
        '7.5': 'clamp(1.875rem, 1.8vw + 1.5rem, 2.5rem)', // ~30px - 40px
        '8': 'clamp(2rem, 2vw + 1.6rem, 2.75rem)', // ~32px - 44px
        '9': 'clamp(2.25rem, 2.2vw + 1.8rem, 3rem)', // ~36px - 48px
        '10': 'clamp(2.5rem, 2.5vw + 2rem, 3.5rem)', // ~40px - 56px
        '12.5': 'clamp(3.125rem, 3vw + 2.5rem, 4.5rem)', // ~50px - 72px
      },
      height: {
        '120p': '120%',
      },
      minHeight: {
        'half-screen': '50vh',
        'half-dvh': '50dvh',
      },
      spacing: {
        screen: '100vh',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
