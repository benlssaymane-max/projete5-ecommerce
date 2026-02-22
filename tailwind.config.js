/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#050816',
        cyanedge: '#22D3EE',
        electric: '#00D4FF',
        violetcore: '#7C3AED',
        steel: '#a6b8c6'
      },
      fontFamily: {
        sans: ['Sora', 'ui-sans-serif', 'system-ui'],
        display: ['Space Grotesk', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        glow: '0 0 40px rgba(34, 211, 238, 0.32)'
      },
      backgroundImage: {
        'noise-grid': 'radial-gradient(circle at center, rgba(255,255,255,0.05) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};
