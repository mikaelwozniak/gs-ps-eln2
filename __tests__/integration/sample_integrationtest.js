
//get the url of the deployed service 
const stackOutput = require('../../.build/stack.json');
const url = stackOutput.ServiceEndpoint;
const request = require('supertest')(url);

const EXAMPLE_TEXT = "HELLO";

test('POST /messages returns an object', () => {
    expect(1+2).toBe(3);

    console.log(url);
    const postObj = {
      text: EXAMPLE_TEXT
    };

    return request
      .post('/messages')
      .send(postObj)
      .expect(201)
      .then((res) => {
        expect(res).toBeDefined();
        expect(res.body.text).toEqual(EXAMPLE_TEXT);
      });    
});

