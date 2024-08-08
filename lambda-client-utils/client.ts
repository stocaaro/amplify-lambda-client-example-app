import {
  CredentialsAndIdentityIdProvider,
  CredentialsAndIdentityId,
} from "aws-amplify/auth";

class CustomCredentialsProvider implements CredentialsAndIdentityIdProvider {
  env: Env;
  constructor(env: Env) {
    this.env = env;
  }

  async getCredentialsAndIdentityId(): Promise<
    CredentialsAndIdentityId | undefined
  > {
    const credentials: CredentialsAndIdentityId = {
      credentials: {
        accessKeyId: this.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: this.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: this.env.AWS_SESSION_TOKEN,
      },
    };
    return credentials;
  }
  clearCredentialsAndIdentityId(): void {}
}

type Env = {
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_SESSION_TOKEN: string;
  AMPLIFY_DATA_GRAPHQL_ENDPOINT?: string;
  AWS_REGION: string;
};

/**
 * Configures the amplify library for lambda execution with data-schema client configuration
 *
 * @param env The env vars provided for lambda execution
 * @param modelIntrospection The MIS generated for the schema
 * @returns the two named inputs to use with `Amplify.configure(resourceConfig, libraryOptions)`
 */
export function lambdaConfig(env: Env, modelIntrospection: object) {
  const customCredentialsProvider = new CustomCredentialsProvider(env);

  return {
    resourceConfig: {
      API: {
        GraphQL: {
          endpoint: env.AMPLIFY_DATA_GRAPHQL_ENDPOINT ?? "",
          region: env.AWS_REGION,
          defaultAuthMode: "iam" as const,
          modelIntrospection: modelIntrospection as any,
        },
      },
    },
    libraryOptions: {
      Auth: {
        credentialsProvider: customCredentialsProvider,
      },
    },
  };
}
