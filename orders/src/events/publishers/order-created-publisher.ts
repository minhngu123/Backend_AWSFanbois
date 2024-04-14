import { Publisher, Subjects } from "@lechieuhungticket/common";

export declare enum OrderStatus {
  Created = "created",
  Cancelled = "cancelled",
  AwaitingPayment = "awaiting:payment",
  Complete = "complete",
}

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    version: number;
    status: OrderStatus;
    userId: string;
    expiresAt: string;
    ticket: {
      id: string;
      title: string;
      price: number;
    };
  };
}

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
