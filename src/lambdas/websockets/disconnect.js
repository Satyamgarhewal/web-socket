const Responses = require("../../app/common/apiResponses");
const Dynamo = require("../../app/common/dynamo");

const tableName = process.env.tableName;

exports.handler = async (event) => {
  console.log("event", event);

  const { connectionId: connectionID } = event.requestContext;

  await Dynamo.delete(connectionID, tableName);
  return Responses._200({ message: "disconnected" });
};
