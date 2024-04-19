import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  currentUser,
} from '@lechieuhungticket/common';
import { stripe } from '../stripe';
import { Order } from '../models/order';
import { Payment } from '../models/payment';
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher';
import { natsWrapper } from '../nats-wrapper';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError('Cannot pay for an cancelled order');
    }

    const charge = await stripe.charges.create({
      currency: 'usd',
      amount: order.price * 100,
      source: token,
    });
    const payment = Payment.build({
      orderId,
      stripeId: charge.id,
    });
    await payment.save();
    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });
    
    console.log(req.currentUser);

    res.status(201).send({ id: payment.id });
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - ${payment.orderId}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
        }

        h1 {
          color: #333;
          font-size: 24px;
          margin-bottom: 10px;
        }

        p {
          color: #666;
          line-height: 1.5;
        }

        a {
          color: #007bff;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <h1>Thank you for your purchase!</h1>
      <p>Dear ${req.currentUser!.email},</p>
      <p>We are delighted to confirm your recent order, #${payment.orderId.slice(-6).toUpperCase()}. Your order details are as follows:</p>
        <ul>
          <li>Your Username: ${req.currentUser!.username}</li>
          <li>Your Phone Number: ${req.currentUser!.phoneNumber}</li>
          <li>Ticket Title: ${order.title}</li>
          <li>Ticket Price: ${order.price}$</li>
          <li>Order Date: ${new Date().toLocaleDateString()}</li>
        </ul>
      <p>We hope you enjoy your upcoming event! Please feel free to contact us if you have any questions.</p>
      <p>Sincerely,</p>
      <p>AWSfanbois Team</p>
    </body>
    </html>
  `;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "awsfanbois@gmail.com",
        pass: "xjwtpwixthonlxks",
      },
    }); 
    const info = await transporter.sendMail({
      from: '"AWSFanbois Team" <awsfanbois@gmail.com>', // sender address
      to: req.currentUser!.email, // list of receivers
      subject: "Billing information", // Subject line
      html: htmlTemplate, // html body
    });   
  }
);

export { router as createChargeRouter };
