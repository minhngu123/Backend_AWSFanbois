import { Publisher, Subjects, TicketUpdatedEvent } from '@lechieuhungticket/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
