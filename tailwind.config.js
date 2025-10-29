/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'spartan': ['"League Spartan"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'crimson': {
          500: '#DC143C',
          600: '#C41230',
          700: '#A01028',
        },
        'accent': {
          teal: '#B91C1C',
          emerald: '#DC2626',
          green: '#EF4444',
        }
      },
      animation: {
        'gradient-flow': 'gradient-flow 20s ease infinite',
        'fade-in': 'fade-in 1s ease-out forwards',
        'fade-up': 'fade-up 1s ease-out forwards',
        'slide-in-left': 'slide-in-left 1s ease-out forwards',
        'slide-out-right': 'slide-out-right 0.6s ease-out forwards',
        'slide-in-from-left': 'slide-in-from-left 0.6s ease-out forwards',
        'animated-gradient': 'animated-gradient 5s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'underline-slide': 'underline-slide 0.4s ease-out forwards',
        'icon-bounce': 'icon-bounce 0.6s ease-in-out',
      },
      keyframes: {
        'gradient-flow': {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-in-left': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'slide-out-right': {
          '0%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateX(30px)',
          },
        },
        'slide-in-from-left': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'animated-gradient': {
          '0%': {
            'background-position': '200% 0',
          },
          '100%': {
            'background-position': '-200% 0',
          },
        },
        'glow-pulse': {
          '0%, 100%': {
            'box-shadow': '0 0 10px rgba(185, 28, 28, 0.3), 0 0 20px rgba(185, 28, 28, 0.2)',
          },
          '50%': {
            'box-shadow': '0 0 20px rgba(185, 28, 28, 0.5), 0 0 30px rgba(185, 28, 28, 0.3), 0 0 40px rgba(185, 28, 28, 0.2)',
          },
        },
        'underline-slide': {
          '0%': {
            width: '0%',
          },
          '100%': {
            width: '100%',
          },
        },
        'icon-bounce': {
          '0%, 100%': {
            transform: 'scale(1) rotate(0deg)',
          },
          '25%': {
            transform: 'scale(1.1) rotate(-5deg)',
          },
          '75%': {
            transform: 'scale(1.15) rotate(5deg)',
          },
        },
      },
    },
  },
  plugins: [],
};
