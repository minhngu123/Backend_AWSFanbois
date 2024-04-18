import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '@lechieuhungticket/common';

import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
    body('username')
      .isAlphanumeric()
      .isLength({ min: 4, max: 20 })
      .withMessage('Username must be between 4 and 20 characters'),
    body('phoneNumber')
      .isNumeric()
      .isLength({ min: 10, max: 10 })
      .withMessage('Phone Number must be 10 numbers'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, username, phoneNumber, password } = req.body;
    const existingUser = await User.findOne({ email });
    const existingPhoneNumber = await User.findOne({ phoneNumber });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }
    if (existingPhoneNumber) {
      throw new BadRequestError('Phone number in use');
    }

    const user = User.build({ email, username, phoneNumber, password });
    await user.save();
    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        username: user.username,
        phoneNumber: user.phoneNumber,
        email: user.email
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
