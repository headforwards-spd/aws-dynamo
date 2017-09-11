const documentClient = require('./documentClient');

module.exports = {
    scan:                    scanItems,
    list:                    listItems,
    get:                     getItem,
    getFirst:                getFirst,
    create:                  createItem,
    update:                  updateItem,
    delete:                  deleteItem,
    addUpdateToParams:       addUpdateToParams,
    setProjectionExpression: setProjectionExpression
};

function getFirst(params, resolve, reject) {

    try {
        new Promise((resolve, reject) => listItems(params, resolve, reject))
            .then(
                items => resolve(items.pop()),
                error => reject(new Error(error))
            );
    } catch (error) {

        reject(new Error(error));
    }
}

function scanItems(params, resolve, reject) {

    try {

        documentClient.scan(params).promise().then(
            result => resolve(result.Items),
            error => reject(new Error(error))
        );

    } catch (error) {

        reject(new Error(error));
    }
}

function listItems(params, resolve, reject) {

    try {

        documentClient.query(params).promise().then(
            result => resolve(result.Items),
            error => reject(new Error(error))
        );

    } catch (error) {

        reject(new Error(error));
    }
}

function getItem(params, resolve, reject) {

    try {

        documentClient.get(params).promise().then(
            result => resolve(result.Item),
            error => reject(new Error(error))
        );
    } catch (error) {

        reject(new Error(error));
    }
}

function createItem(params, resolve, reject) {

    try {

        documentClient.put(params).promise().then(
            result => resolve(params.Item),
            error => reject(new Error(error))
        );

    } catch (error) {

        reject(new Error(error));
    }
}

function updateItem(params, resolve, reject) {

    try {

        Object.assign(params, {ReturnValues: 'ALL_NEW'});

        documentClient.update(params).promise().then(
            result => resolve(result.Attributes),
            error => reject(new Error(error))
        );

    } catch (error) {

        reject(new Error(error));
    }
}

function deleteItem(params, resolve, reject) {

    try {

        Object.assign(params, {ReturnValues: 'ALL_OLD'});

        documentClient.delete(params).promise().then(
            result => resolve(result.Attributes),
            error => reject(new Error(error))
        );

    } catch (error) {

        reject(new Error(error));
    }
}

function addUpdateToParams(update, params) {

    let attributeValues = {};

    let updateExpression = 'set ' + Object.keys(update).map(key => {
        return ' ' + key + ' = :' + key;
    }).join(', ');

    for (let key in update) {

        attributeValues[':' + key] = attributeValue(update[key]);
    }

    params.UpdateExpression          = updateExpression;
    params.ExpressionAttributeValues = attributeValues;

    return params;
}

function setProjectionExpression(params, projectionExpression) {

    !params.hasOwnProperty('ExpressionAttributeNames') && (params.ExpressionAttributeNames = {});
    !params.hasOwnProperty('ProjectionExpression') && (params.ProjectionExpression = []);

    projectionExpression.map(value => {

        let name = '#' + value;

        params.ExpressionAttributeNames[name] = value;
        params.ProjectionExpression.push(name);
    });
}

function attributeValue(value) {

    return (!!value || isNumeric(value)) && value || null;
}

function isNumeric(value) {

    return Number(parseFloat(value)) === value;
}