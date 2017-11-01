# AWS dynamoDb Wrapper

A handful of utility tools for AWS dynamoDb functions

## Usage:

```javascript
const dynamo = require('@headforwards-spd/aws-dynamo');
```

### list()

```javascript
const tableName                 = 'my-table-name';
const keyConditionExpression    = 'my-key-condition-expression';
const expressionAttributeValues = 'my-expression-attribute-values';

function listMyItems() {

    return new Promise((resolve, reject) => {

        try {

            const params = {
                TableName:                 tableName,
                KeyConditionExpression:    keyConditionExpression,
                ExpressionAttributeValues: expressionAttributeValues
            };

            dynamo.list(params, resolve, reject);

        } catch (error) {

            reject(error);
        }
    });
}
```