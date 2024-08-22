import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { generateModelIntrospectionSchema } from "../../lambda-client-utils/build";
import { todoCount } from "../functions/todo-count/resource";
import { todoCount as todoCountAlt } from "../functions/todo-count-alt/resource";
/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
export const schema = a
  .schema({
    Todo: a
      .model({
        content: a.string(),
      })
      .authorization((allow) => [allow.publicApiKey()]),
    todoCount: a
      .query()
      .arguments({})
      .returns(a.integer())
      .handler(a.handler.function(todoCount))
      .authorization((allow) => [allow.publicApiKey()]),
    todoCountAlt: a
      .query()
      .arguments({})
      .returns(a.integer())
      .handler(a.handler.function(todoCountAlt))
      .authorization((allow) => [allow.publicApiKey()]),
  })
  .authorization((allow) => allow.resource(todoCount));

export type Schema = ClientSchema<typeof schema>;

await generateModelIntrospectionSchema(schema);

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
