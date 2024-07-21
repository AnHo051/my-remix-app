import { PrismaClient } from "@prisma/client";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

import pkg from "bcryptjs";

const prisma = new PrismaClient();

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [process.env.SESSION_SECRET],
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
  },
});

async function createUserSession(userId, redirectPath) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);

  return redirect(redirectPath, {
    headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
  });
}

export async function getUserFromSession(request) {
  const session = await sessionStorage.getSession(
    request?.headers?.get("Cookie")
  );
  const userId = session.get("userId");

  if (!userId) return null;

  return userId;
}

export async function destroyUserSection(request) {
  const session = await sessionStorage.getSession(
    request?.headers?.get("Cookie")
  );

  return redirect("/auth?mode=login", {
    headers: { "Set-Cookie": await sessionStorage.destroySession(session) },
  });
}

export async function requireUserSection(request) {
  const userId = await getUserFromSession(request);

  if (!userId) {
    throw redirect("/auth?mode=login");
  }

  return userId;
}

export async function signup({ email, password, redirectPath }) {
  const existingUser = await prisma.user.findFirst({
    where: { email },
  });
  if (existingUser) {
    const error = new Error("User already exists.");
    error.statusCode = 422;

    throw { email: error.message };
  }

  const passwordHash = await pkg.hash(password, 12);
  const user = await prisma.user.create({
    data: { email, password: passwordHash },
  });

  return createUserSession(user.id, redirectPath);
}

export async function login({ email, password, redirectPath }) {
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    const error = new Error(
      "Could not log you in. Please check your email and password."
    );
    error.statusCode = 401;
    throw {
      password: error.message,
    };
  }

  const passwordCorrect = await pkg.compare(password, user.password);
  if (!passwordCorrect) {
    const error = new Error(
      "Could not log you in. Please check your email and password."
    );
    error.statusCode = 401;
    throw {
      password: error.message,
    };
  }

  return createUserSession(user.id, redirectPath);
}
