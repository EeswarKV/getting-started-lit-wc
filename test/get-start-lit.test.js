import { html, fixture, expect } from '@open-wc/testing';

import '../src/GetStartLit.js';

describe('GetStartLit', () => {
  it('can override the title via attribute', async () => {
    const el = await fixture(html`
      <get-start-lit title="attribute title"></get-start-lit>
    `);

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`
      <get-start-lit></get-start-lit>
    `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
