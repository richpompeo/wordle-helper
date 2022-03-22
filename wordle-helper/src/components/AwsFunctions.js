import * as AWS from 'aws-sdk'
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:87b80af2-c034-42fd-a926-511ebf78c7a1',
});

const docClient = new AWS.DynamoDB.DocumentClient()
const docClientUpdate = new AWS.DynamoDB.DocumentClient()
const docClientGet = new AWS.DynamoDB.DocumentClient()

export const updateCurrentPageCount = (currentPageCount) => {
    var params = {
        TableName: 'page_load_count',
        Key: {"page_load_count_key": 'page_load_count'},
        UpdateExpression: "set page_load_count = :num",
        ExpressionAttributeValues:{
            ":num": currentPageCount
        },
        ReturnValues: "UPDATED_NEW"
    }
    return new Promise(function(resolve, reject) {
        docClientUpdate.update(params, function (err, data) {
            if (!err) {
                resolve(data)
            }
            else {
                reject(err)
            }
        });
    });
}


export const getCurrentPageCount = async () => {
    // fetch current page count then update it in same function b/c I do not know how to make the addToCurrentPageCount
    // wait to run until after a "get" function finishes.

    var params = {
        TableName: 'page_load_count',
        KeyConditionExpression: "page_load_count_key = page_load_count",
    }

    return new Promise(function(resolve, reject) {
        docClientGet.scan(params, function (err, data) {
            if (!err) {
                let currentPageCount = data.Items[0]['page_load_count']
                resolve(currentPageCount)
            }
            else {
                reject(err)
            }
        });
    });
    
}
