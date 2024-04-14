import { Publisher, Subjects, TicketCreatedEvent } from '@lechieuhungticket/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
