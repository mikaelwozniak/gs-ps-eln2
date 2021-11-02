// @ts-check
//const mochaPlugin = require('serverless-mocha-plugin');
import chai from 'chai'
var assert = chai.assert;
const AWS = require("aws-sdk");
import { buildNewRecord } from "../../src/handlers/endpoints";

const EXAMPLE_ID = "123";
const EXAMPLE_TEXT = "HELLO";

describe('buildNewRecord', () => {
  it('should build well-formed new records', () => {
      var post = buildNewRecord(EXAMPLE_ID,EXAMPLE_TEXT);
      assert.equal(post.id, EXAMPLE_ID);
      assert.equal(post.text, EXAMPLE_TEXT);
  });
});