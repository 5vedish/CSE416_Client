const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
};
