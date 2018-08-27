#!/usr/bin/env node
const fs = require('fs');
const pathNode = require('path');
const Marked = require('marked');
const fetch = require('node-fetch');

const mdLinks = require('./lib/md-links');

mdLinks.linksLineValidate = (path) => {
 
}

module.exports = mdLinks.linksLineValidate;

