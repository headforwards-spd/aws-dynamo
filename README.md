# dynamo
A wrapper around dynamoDB

usage

```javascript

const datastore = require('aws-dynamo');

return new Promise((resolve, reject) => {

        try {

            const params = {
                TableName: 'foo'
                KeyConditionExpression:    'fooId = :fooId',
                ExpressionAttributeValues: {':fooId': fooId}
            };

            datastore.list(params, resolve, reject);

        } catch (error) {

            reject(new Error(error));
        }
    });

```
