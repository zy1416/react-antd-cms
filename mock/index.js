const fs = require('fs');

function fromJSONFile(filename) {
    return (req, res) => {
        const data = fs.readFileSync(`mock/${filename}.json`).toString();
        const json = JSON.parse(data);
        return res.json(json);
    };
}
const proxy = {
    'POST /login': fromJSONFile('login'),
    'POST /menu': fromJSONFile('menu'),
    'POST /fakeSubmitForm': fromJSONFile('fakeSubmitForm')
};
module.exports = proxy;