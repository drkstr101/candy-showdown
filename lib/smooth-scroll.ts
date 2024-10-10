import smoothscroll from 'smoothscroll-polyfill';

let installed = false;

export default function scroll(opts: ScrollToOptions) {
  if (!installed) {
    try {
      smoothscroll.polyfill();
    } catch (err) {
      console.error('smoothscroll polyfill failed', err);
      return;
    }
    installed = true;
  }

  try {
    window.scroll({ behavior: 'smooth', ...opts });
  } catch (err) {
    console.error('smoothscroll polyfill failed', err);
  }
}

export const scrollTo = (el: HTMLElement, offset = 0) => {
  scroll({
    top: el.offsetTop + offset,
  });
};
