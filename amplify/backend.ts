import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { todoCount } from "./functions/todo-count/resource";
defineBackend({
  auth,
  data,
  todoCount,
});
