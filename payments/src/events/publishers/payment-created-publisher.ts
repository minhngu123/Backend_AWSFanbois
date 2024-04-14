import { Subjects, Publisher, PaymentCreatedEvent } from '@lechieuhungticket/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
