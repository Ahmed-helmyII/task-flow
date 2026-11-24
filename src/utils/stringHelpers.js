// Simple string helpers
function capitalize(text) {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function reverse(text) {
  return text.split('').reverse().join('');
}

module.exports = { capitalize, reverse };
