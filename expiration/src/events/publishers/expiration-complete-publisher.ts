import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@lechieuhungticket/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
