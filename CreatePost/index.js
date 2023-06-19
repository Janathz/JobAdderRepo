const { insertEntity } = require("../services/tableService");

module.exports = async function (context, req) {
  try {
    if (!req.body) {
      context.res = {
        status: 400,
        body: "Please pass a request body",
      };
      return;
    }

    const { blog, title, content } = req.body;

    if (!blog || !title || !content) {
      context.res = {
        status: 400,
        body: "Please pass blog, title and content",
      };
      return;
    }
    const entity = {
      PartitionKey: { _: blog }, // it is a way to group similar items together
      RowKey: { _: new Date().getTime().toString() }, // this is sort of an ID, these two combined together should be an unique for every single record
      title: { _: title },
      content: { _: content },
    };

    const result = await insertEntity("Posts", entity);

    context.res = {
      body: result,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message,
    };
  }
};
