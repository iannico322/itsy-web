/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {

      'lg': {'max': '1220px'},
      // => @media (max-width: 1023px) { ... }

      'slg': {'max': '1100px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
  },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        float: {
          '0%': { transform: 'translateY(0px) rotate(2deg)' },
          '50%': { transform: 'translateY(60px) rotate(7deg)',   },
          '100%': {transform: 'translateY(0px) rotate(2deg)' },
        },
        floatAI: {
          '0%': { transform: 'translate(0px,0px) rotate(0deg)' },
          '50%': { transform: 'translate(190px,-150px) rotate(10deg)',   },
          '100%': {transform: 'translate(0px,0px) rotate(0deg)' },
        },
        floatScan: {
          '0%': { transform: 'translate(0px,0px) rotate(0deg)' },
          '50%': { transform: 'translate(200px,150px) rotate(10deg)',   },
          '100%': {transform: 'translate(0px,0px) rotate(0deg)' },
        },
        
        floatBook: {
          '0%': { transform: 'translate(-10px,200px) rotate(-10deg)' },
          '50%': { transform: 'translate(30px,250px) rotate(0deg)',   },
          '100%': {transform: 'translate(-10px,200px) rotate(-10deg)' },
        },

        floatMess: {
          '0%': { transform: 'translate(-220px,-40px) rotate(0deg)' },
          '50%': { transform: 'translate(-230px,20px) rotate(10deg)',   },
          '100%': {transform: 'translate(-220px,-40px) rotate(0deg)' },
        },
        floatCash2: {
          '0%': { transform: 'translate(20px,-20px) rotate(5deg)' },
          '50%': { transform: 'translate(30px,20px) rotate(-25deg)',   },
         
          '100%': {transform: 'translate(20px,-20px) rotate(5deg)' },
        },

        floatCash3: {
          '0%': { transform: 'translate(110px,-60px) rotate(35deg)' },
          '50%': { transform: 'translate(100px,-30px) rotate(15deg)',   },
          '100%': {transform: 'translate(110px,-60px) rotate(35deg)' },
        },

      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",

        float: 'float 7s ease-in-out infinite',
        floatAI: 'floatAI 7s ease-in-out infinite',
        floatScan: 'floatScan 7s ease-in-out infinite',
        floatBook: 'floatBook 7s ease-in-out infinite',
        floatMess:'floatMess 7s ease-in-out infinite',
        floatCash2:'floatCash2 3s ease-in-out infinite',
        floatCash3:'floatCash3 3s ease-in-out infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}