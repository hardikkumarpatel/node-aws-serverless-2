const uuid = require('uuid');
const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const prepareAccountInfo = (sk_id, role, permissions) => {
    const timestamp = new Date().getTime();
    return {
        id: uuid.v4(),
        sk_id,
        role,
        permissions,
        submittedAt: timestamp,
        updatedAt: timestamp,
    };
};

const createAccountService = async (params) => {
    return await dynamoDB.put(params).promise();
};

const getAccountsListsService = async (params) => {
    return await dynamoDB.scan(params).promise();
};

const successResponseBuilder = (body) => {
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: body
    };
};

const failureResponseBuilder = (statusCode, body) => {
    return {
        statusCode: statusCode,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: body
    };
};


export {
    prepareAccountInfo,
    createAccountService,
    getAccountsListsService,
    successResponseBuilder,
    failureResponseBuilder
}