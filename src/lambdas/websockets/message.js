const Responses = require("../../app/common/apiResponses");
const Dynamo = require("../../app/common/dynamo");
const WebSocket = require("../../app/common/websocketMessage");

const tableName = process.env.tableName;

exports.handler = async (event) => {
  console.log("event", event);

  const { connectionId: connectionID } = event.requestContext;
  const body = json.parse(event.body);

  try {
    const record = await Dynamo.get(connectionID, TableName);
    const { messages, domainName, stage } = record;
    messages.push(body.messages);
    const data = {
      ...record,
      messages,
    };

    await Dynamo.write(data, tableName);
    await WebSocket.send({
      domainName,
      stage,
      connectionID,
      message: "This is a reply to your message",
    });
    return Responses._200({ message: "got a message" });
  } catch (err) {
    return Responses._400({ message: "" });
  }
};
