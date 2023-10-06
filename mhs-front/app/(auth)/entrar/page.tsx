import { cookies } from "next/headers";

import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

import LoginForm from "@/components/loginPage/LoginForm";

export default async function LoginPage() {
  const token = cookies().get("auth")?.value;
  if (token) {
    const jwtVerify = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET);

    if (jwtVerify) {
      //@ts-ignore
      if (jwtVerify.role === "admin") {
        //@ts-ignore
        redirect(`/${jwtVerify.userId}/admin`);
      } else {
        //@ts-ignore
        redirect(`/${jwtVerify.userId}/reservar`);
      }
    }
  }

  return <LoginForm />;
}
