import { CREDENTIALS_PROVIDER_ID } from "@/constants/account";
import { env } from "@/lib/env";
import { userRepository } from "@/repository/user.repository";
import { SignInBody, SignUpBody } from "@/types/auth";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
  async signUp(body: SignUpBody) {
    const existingUser = await userRepository.findUserByEmail(body.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);

    const user = await userRepository.createUserWithAccount(body);
    return user;
  }

  async signIn(body: SignInBody) {
    const user = await userRepository.findUserByEmail(body.email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const { accounts, ...rest } = user;

    const credentialsAccount = accounts.find((acc) => acc.providerId === CREDENTIALS_PROVIDER_ID);

    if (!credentialsAccount || !credentialsAccount.password) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(body.password, credentialsAccount.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, env.JWT_SECRET, { expiresIn: "7d" });

    return { user: rest, token };
  }
}

export const authService = new AuthService();
