export default class Ticket {
  title: string;
  content: string;

  constructor(title: string, ticket_id: string, content: string) {
    this.title = title;
    this.content = content;
  }
}
