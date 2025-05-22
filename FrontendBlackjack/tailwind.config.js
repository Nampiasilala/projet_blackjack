/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'card-slide-in': 'cardSlideIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'dealer-card-slide-in': 'dealerCardSlideIn 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'card-flip': 'cardFlip 0.5s ease-in-out',
      },
      keyframes: {
        cardSlideIn: {
          '0%': { 
            transform: 'translateY(-120px) rotateX(180deg) scale(0.3)', 
            opacity: '0' 
          },
          '50%': { 
            transform: 'translateY(-10px) rotateX(90deg) scale(0.8)', 
            opacity: '0.5' 
          },
          '100%': { 
            transform: 'translateY(0) rotateX(0deg) scale(1)', 
            opacity: '1' 
          },
        },
        dealerCardSlideIn: {
          '0%': { 
            transform: 'translateY(-150px) rotateX(180deg) scale(0.2)', 
            opacity: '0' 
          },
          '40%': { 
            transform: 'translateY(-30px) rotateX(120deg) scale(0.6)', 
            opacity: '0.3' 
          },
          '70%': { 
            transform: 'translateY(5px) rotateX(60deg) scale(0.9)', 
            opacity: '0.7' 
          },
          '100%': { 
            transform: 'translateY(0) rotateX(0deg) scale(1)', 
            opacity: '1' 
          },
        },
        cardFlip: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(90deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        }
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      },
      perspective: {
        '1000': '1000px',
      },
    },
  },
  plugins: [],
}