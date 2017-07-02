const axios = require('axios');
const conference_data = require('./conference_data.json');
const url = id => `https://np92s2qxj7.execute-api.eu-central-1.amazonaws.com/production/voting/average/${id}`;
const talks_lite = conference_data.agenda
  .filter(({type}) => type === 'talk')
  .map(({authors, id, title}) => ({ authors: authors.map(({name}) => name).join(', '), id, title }));

talks_lite.forEach(({authors, id, title}) => {
  axios.get(url(id))
    .then(({data: {averageVote}}) => {
      console.log(`[${averageVote}] ${authors} - ${title}`)
    })
    .catch(err => console.error(`Could not find votes for talk: [${authors}] - ${title} (id: ${id}).`));
});
