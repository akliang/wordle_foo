module.exports = {
  content: [
    '../data/*.js',
    '../js/*.js',
    '../index.html'
  ],
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
  darkMode: 'class',
}
  