import { DomSanitizePipe } from './dom-sanitize.pipe';

describe('DomSanitizePipe', () => {
  it('create an instance', () => {
    const pipe = new DomSanitizePipe();
    expect(pipe).toBeTruthy();
  });
});
