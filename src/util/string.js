export default {
  capitalize: function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  },

  pluralize: function(count, singular, plural) {
    if(count == 1) {
      return `1 ${singular}`;
    } else {
      return `${count} ${plural}`
    }
  }
}