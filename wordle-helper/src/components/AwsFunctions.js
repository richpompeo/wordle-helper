import * as AWS from 'aws-sdk'
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:87b80af2-c034-42fd-a926-511ebf78c7a1',
});

const docClient = new AWS.DynamoDB.DocumentClient()
const docClientSet = new AWS.DynamoDB.DocumentClient()

export const addToCurrentPageCount = (currentPageCount) => {
    var params = {
        TableName: 'page_load_count',
        Key: {"page_load_count_key": 'page_load_count'},
        UpdateExpression: "set page_load_count = :num",
        ExpressionAttributeValues:{
            ":num": currentPageCount+1
        },
        ReturnValues: "UPDATED_NEW"
    }
    
    docClientSet.update(params, function (err, data) {
        if (!err) {
            // console.log(data)
        }
        else {
            console.log(err)
        }
    })
}

export const updateCurrentPageCount = () => {
    // fetch current page count then update it in same function b/c I do not know how to make the addToCurrentPageCount
    // wait to run until after a "get" function finishes.

    var params = {
        TableName: 'page_load_count',
        KeyConditionExpression: "page_load_count_key = page_load_count",
    }

    docClient.scan(params, function (err, data) {
        if (!err) {
            // console.log(data.Items[0]['page_load_count'])
            let currentPageCount = data.Items[0]['page_load_count']
            addToCurrentPageCount(currentPageCount)
        }
        else {
            console.log(err)
        }
    })

}

