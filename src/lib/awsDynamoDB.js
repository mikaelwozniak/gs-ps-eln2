const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function saveItem(tableName,item){
    await dynamodb.put({
        TableName: tableName,
        Item: item,
    }).promise();
}

export async function getAllItems(tableName) {
    const result = await dynamodb.scan({
            TableName: tableName
    }).promise();
    return result.Items;
}

export async function getOneItem(tableName,id) {
    const result = await dynamodb.get({
        TableName: tableName,
        Key: { id },
      }).promise();
    return result.Item;
}
