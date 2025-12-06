import { authController } from "@/controller/auth.controller";
import { ApiResponse } from "@/lib/api-response";
import { schemaValidation } from "@/middleware/validation.middleware";
import { sendVerificationSchema, postVerificationSchema, signInSchema, signUpSchema } from "@/types/auth";
import { authRoute } from "@/types/routes/auth.route";
import { Request, Router, Response } from "express";
import { StatusCodes } from "http-status-codes";
import passport from "passport";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth endpoints
 */
const router = Router();

/**
 * @swagger
 * /auth/status:
 *   get:
 *     tags: [Auth]
 *     summary: Check status
 *     responses:
 *       200:
 *         description: Service is working
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get(authRoute.status, (_: Request, res: Response) => {
  res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, {}, "Auth status"));
});

/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     tags: [Auth]
 *     summary: Sign in with email & password
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ReqSignIn"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResSignIn"
 *       400:
 *         description: Invalid payload
 *       401:
 *         description: Wrong credentials
 */
router.post(authRoute.signIn, schemaValidation(signInSchema), authController.signIn);

/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     tags: [Auth]
 *     summary: Sign up
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ReqSignUp"
 *     responses:
 *       201:
 *         description: User registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ApiResponse"
 *       400:
 *         description: Invalid data
 */
router.post(authRoute.signUp, schemaValidation(signUpSchema), authController.signUp);

/**
 * @swagger
 * /auth/send-verification:
 *   post:
 *     tags: [Auth]
 *     summary: Send verification code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Verification fetched
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ApiResponse"
 */
router.post(authRoute.sendVerification, schemaValidation(sendVerificationSchema), authController.sendVerification);

/**
 * @swagger
 * /auth/verify:
 *   post:
 *     tags: [Auth]
 *     summary: Submit verification code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               verificationId:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Verification successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ApiResponse"
 */
router.post(authRoute.verify, schemaValidation(postVerificationSchema), authController.postVerification);

/**
 * @swagger
 * /auth/google:
 *   get:
 *     tags: [Auth]
 *     summary: Redirect to Google OAuth login
 *     responses:
 *       302:
 *         description: Redirect to Google login page
 */
router.get(
  authRoute.google,
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     tags: [Auth]
 *     summary: Google OAuth callback
 *     responses:
 *       200:
 *         description: Google login successful
 *       302:
 *         description: Google login failed (redirect)
 */
router.get(
  `${authRoute.google}/callback`,
  passport.authenticate("google", {
    failureRedirect: "/sign-in",
    session: false,
    failureMessage: "Failed to sign in with Google",
  }),
  authController.googleAuth,
);

export const authRoutes = router;
