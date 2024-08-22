import { generateModels } from "@aws-amplify/graphql-generator";
import fs from "fs";

type GenericModelSchema = {
  transform: () => {
    schema: string;
  };
};

/**
 * Generate model introspection schema for Amplify Data API
 * Output is written to .amplify/generated/model-introspection.json
 *
 * @param schema The schema to transform into the model instrospection output
 */
export async function generateModelIntrospectionSchema<
  T extends GenericModelSchema
>(schema: T) {
  const modelsIntrospectionSchema = await modelIntrospectionSchema(schema);

  fs.mkdirSync(`${process.cwd()}/.amplify/generated/`, { recursive: true });
  fs.writeFileSync(
    `${process.cwd()}/.amplify/generated/model-introspection.json`,
    modelsIntrospectionSchema
  );
}

/**
 * Generate model introspection schema for Amplify Data API
 * Output is written to .amplify/generated/model-introspection.json
 *
 * @param schema The schema to transform into the model instrospection output
 */
export async function modelIntrospectionSchema<T extends GenericModelSchema>(
  schema: T
) {
  const models = await generateModels({
    schema: schema.transform().schema,
    target: "introspection",
  });
  console.log(process.cwd());

  return models["model-introspection.json"];
}
