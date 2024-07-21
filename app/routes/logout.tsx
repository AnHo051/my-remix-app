import { ActionFunctionArgs, json } from "@remix-run/node";
import { destroyUserSection } from "../data/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ error: "Invalid request method" }, { status: 400 });
  }

  return await destroyUserSection(request);
}
