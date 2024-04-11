import { Publisher, Subjects, TicketUpdatedEvent } from '@mnticket/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
