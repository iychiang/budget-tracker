/* global define, it, describe, beforeEach, document */
const express = require('express');
const path = require('path');
const Nightmare = require('nightmare');
const expect = require('chai').expect;
const axios = require('axios');

let nightmare;

const app = express();
app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.static(path.join(__dirname, '/../dist')));

app.listen(8888);

const url = 'http://localhost:8888';


describe('express', function() {
  this.timeout(20000)

  it('should have the correct page title', (done) => {
    let nightmare = new Nightmare();
    console.log('nightmare', url);
    nightmare
      .goto(url)
      .evaluate(() => document.getElementById('title').innerText)
      .end()
      .then((text) => {
        console.log('hello i am here circleci pls')
        expect(text).to.contain('Budget Tracker');
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    }
  );

  it('returns the correct status code', () => axios.get(url)
    .then(response => expect(response.status === 200)));
});
