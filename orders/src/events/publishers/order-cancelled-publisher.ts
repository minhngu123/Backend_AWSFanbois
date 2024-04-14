import { Subjects, Publisher, OrderCancelledEvent } from '@lechieuhungticket/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
