import * as Sentry from "@sentry/serverless";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import { downloadCommits } from "./etl/github";
import { uploadJSON } from "./etl/s3";
import { response } from "./utils/http";
import { logger } from "./utils/logger";

Sentry.AWSLambda.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

type ETLEvent = APIGatewayProxyEvent & { repo: string | undefined };

export async function endpoint(
  event: ETLEvent,
): Promise<APIGatewayProxyResult> {
  logger.debug("event", event);

  const repo: string | undefined = event.repo;

  if (repo === undefined) {
    throw new Error("repo is undefined");
  }

  const commits = await downloadCommits(repo);
  const s3Data = await uploadJSON(repo, commits);

  return response(200, s3Data);
}

export const handler = Sentry.AWSLambda.wrapHandler(endpoint);
