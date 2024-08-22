import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { todoCount } from "./functions/todo-count/resource";
import { todoCount as todoCountAlt } from "./functions/todo-count-alt/resource";
defineBackend({
  auth,
  data,
  todoCount,
  todoCountAlt,
});
