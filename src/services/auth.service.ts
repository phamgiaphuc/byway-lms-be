import { CREDENTIALS_PROVIDER_ID, GOOGLE_PROVIDER_ID } from "@/constants/account";
import { ACCOUNT_VERIFIER_IDENTIFIER } from "@/constants/verification";
import { BadRequestError } from "@/lib/api-error";
import { env } from "@/lib/env";
import { generateCustomCode } from "@/lib/helper";
import { resend } from "@/lib/mail";
import { userRepository } from "@/repository/user.repository";
import { GoogleProfile, SignInBody, SignUpBody } from "@/types/auth";
import * as bcrypt from "bcrypt";
import { addMinutes } from "date-fns";
import jwt from "jsonwebtoken";
import { Profile } from "passport-google-oauth20";
import { omit } from "lodash";

class AuthService {
  async googleAuth(profile: Profile["_json"]) {
    if (!profile.email) {
      throw new BadRequestError("Email is invalid");
    }

    const googleProfile: GoogleProfile = {
      ...profile,
      email: profile.email,
    };

    let user = await userRepository.findUserByEmail(googleProfile.email);

    if (!user) {
      user = await userRepository.createUserWithGoogleAccount(googleProfile);
    }

    if (!user.accounts.find((acc) => acc.providerId === GOOGLE_PROVIDER_ID)) {
      const account = await userRepository.createGoogleAccount(user, googleProfile);
      user.accounts.push(account);
    }

    const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, { expiresIn: "7d" });

    return { user: omit(user, ["accounts"]), token };
  }

  async postVerification(userId: string, verificationId: string, code: string) {
    const verification = await userRepository.findVerificationById(verificationId);
    if (!verification) {
      throw new BadRequestError("Verification not found");
    }

    if (verification.value !== code) {
      throw new BadRequestError("Code not match");
    }

    await userRepository.updateUserVerifiedById(userId, true);

    return {};
  }

  async getVerification(userId: string) {
    const user = await userRepository.findUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const verification = await userRepository.createVerification({
      identifier: ACCOUNT_VERIFIER_IDENTIFIER,
      value: generateCustomCode(6),
      expiredAt: addMinutes(new Date(), 5),
    });

    await resend.emails.send({
      to: user.email,
      template: {
        id: "welcome-user",
        variables: {
          NAME: user.name,
          CODE: verification.value,
        },
      },
    });

    return {
      user: omit(user, ["accounts"]),
      verification: {
        id: verification.id,
        expiredAt: verification.expiredAt,
      },
    };
  }

  async signUp(body: SignUpBody) {
    const existingUser = await userRepository.findUserByEmail(body.email);
    if (existingUser) {
      throw new BadRequestError("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);

    const user = await userRepository.createUserWithCredentialsAccount(body);

    const verification = await userRepository.createVerification({
      identifier: ACCOUNT_VERIFIER_IDENTIFIER,
      value: generateCustomCode(6),
      expiredAt: addMinutes(new Date(), 5),
    });

    await resend.emails.send({
      to: user.email,
      template: {
        id: "welcome-user",
        variables: {
          NAME: user.name,
          CODE: verification.value,
        },
      },
    });

    return {
      user,
      verification: {
        id: verification.id,
        expiredAt: verification.expiredAt,
      },
    };
  }

  async signIn(body: SignInBody) {
    const user = await userRepository.findUserByEmail(body.email);

    if (!user) {
      throw new Error("User not found");
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

    if (!user.emailVerified) {
      return { user: rest };
    }

    const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, { expiresIn: "7d" });

    return { user: rest, token };
  }
}

export const authService = new AuthService();
