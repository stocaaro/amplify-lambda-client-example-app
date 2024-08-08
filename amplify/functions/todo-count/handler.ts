import type { Handler } from "aws-lambda";
import { lambdaConfig } from "../../../lambda-client-utils/client";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../data/resource";
import { env } from "$amplify/env/todo-count";
import modelIntrospection from "$amplify/model-introspection.json";

const { resourceConfig, libraryOptions } = lambdaConfig(
  env,
  modelIntrospection
);

Amplify.configure(resourceConfig, libraryOptions);
const client = generateClient<Schema>();

export const handler: Handler = async () => {
  const todos = await client.models.Todo.list();
  return todos.data.length;
};
