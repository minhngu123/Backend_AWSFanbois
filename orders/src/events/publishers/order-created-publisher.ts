import { Publisher, OrderCreatedEvent, Subjects } from "@lechieuhungticket/common";
export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
