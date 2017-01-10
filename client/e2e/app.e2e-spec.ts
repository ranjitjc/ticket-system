import { TicketSystemPage } from './app.po';

describe('ticket-system App', function() {
  let page: TicketSystemPage;

  beforeEach(() => {
    page = new TicketSystemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
