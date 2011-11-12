var people = [
  {
    id: 1,
    name: 'Jake',
    url: 'http://mormon.org/me/2KGK/Jake/',
    img: 'http://mormon.org/image/vanity/mormon-profile-2KGK.jpg',
    tagline: 'I wield technology with utter deftness. I love my family. I\'m a Mormon.'
  },
  {
    id: 2,
    name: 'April',
    url: 'http://mormon.org/me/1RYK/',
    img: 'http://mormon.org/image/vanity/mormon-profile-1RYK.jpg',
    tagline: 'I\'m a wife. I\'m a mother. I\'m a Mormon.'
  }
];

module.exports.all = people;

module.exports.find = function (id) {
  id = parseInt(id, 10);
  var found = null;
  peopleloop: for(person_index in people) {
    var person = people[person_index];
    if (person.id === id) {
      found = person;
      break peopleloop;
    }
  };
  return found;
}