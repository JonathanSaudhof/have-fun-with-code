const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
const { join } = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        join(
            __dirname,
            '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
        ),
        ...createGlobPatternsForDependencies(__dirname),
    ],
    theme: {
        extend: {},
        container: {
            center: true,
            padding: '2rem',
        },
    },
    plugins: [],
}
