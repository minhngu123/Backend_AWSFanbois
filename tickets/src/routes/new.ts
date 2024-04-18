import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@lechieuhungticket/common";
import { Ticket } from "../models/ticket";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
    body("description")
      .isLength({ min: 4, max: 200 })
      .withMessage("Description must be between 4 and 200 characters"),
    body("image"),
    body("location")
      .isLength({ min: 4, max: 200 })
      .withMessage("Location must be between 4 and 200 characters"),
    body("date").isAfter().withMessage("Date must be after current date"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price, description, image, location, date } = req.body;
    const ticket = Ticket.build({
      title,
      price,
      description,
      image,
      location,
      date,
      userId: req.currentUser!.id,
    });
    await ticket.save();
    console.log(ticket);
    new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      image: ticket.image,
      location: ticket.location,
      date: ticket.date,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
