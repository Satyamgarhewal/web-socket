const Responses = require("../../app/common/apiResponses");

exports.handler = async (event) => {
  console.log("event", event);
  return Responses._200({ message: "default" });
};
