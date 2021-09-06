export default class Ticket {
  title: string;
  ticket_id: string;
  content: string;

  constructor(title: string, ticket_id: string, content: string) {
    this.title = title;
    this.ticket_id = ticket_id;
    this.content = content;
  }
}
