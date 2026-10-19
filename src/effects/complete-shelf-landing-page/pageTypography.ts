// Local host adapter: the registered bundle omits pageTypography and pageRecipes.
// Customization is applied to the live document, never to its bytes on disk.
const fonts = {
  'iowan-old-style': '"Iowan Old Style", "Baskerville", "Times New Roman", serif',
  'inter': '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  'instrument-serif': '"Instrument Serif", serif',
  'newsreader': '"Newsreader", serif',
  'geist': '"Geist", sans-serif',
};
export type PageTypographyProps = {
  headingFont?: keyof typeof fonts;
  bodyFont?: keyof typeof fonts;
  headingWeight?: '400' | '500' | '600';
  bodyWeight?: '400' | '500' | '600';
  primaryColor?: string;
  headingSize?: number;
  bodySize?: number;
  headingLetterSpacing?: number;
};
export type LandingPageCustomization = PageTypographyProps;

export function applyPageCustomization(frame: HTMLIFrameElement | null, options?: LandingPageCustomization) {
  const doc = frame?.contentDocument;
  if (!doc?.head || !options) return;
  const id = 'complete-shelf-host-typography';
  const style = doc.getElementById(id) ?? doc.head.appendChild(Object.assign(doc.createElement('style'), { id }));
  const variables = [
    options.headingFont && `--serif:${fonts[options.headingFont]}`,
    options.bodyFont && `--mono:${fonts[options.bodyFont]}`,
    options.primaryColor && /^#[\da-f]{6}$/i.test(options.primaryColor) && `--accent:${options.primaryColor}`,
  ].filter(Boolean).join(';');
  const heading = [
    options.headingWeight && `font-weight:${options.headingWeight}`,
    Number.isFinite(options.headingLetterSpacing) && `letter-spacing:${options.headingLetterSpacing}em`,
  ].filter(Boolean).join(';');
  // Keep the authored mobile breakpoints; requested sizes apply to desktop.
  style.textContent = `:root{${variables}} .selection__title,.detail-title{${heading}} ${options.bodyWeight ? `.selection__note,.detail-deck{font-weight:${options.bodyWeight}}` : ''} @media(min-width:821px){${Number.isFinite(options.headingSize) ? `.selection__title{font-size:${options.headingSize}px}` : ''}${Number.isFinite(options.bodySize) ? `.selection__note,.detail-deck{font-size:${options.bodySize}px}` : ''}}`;
}

// The local URL frame is same-origin; no srcDoc messaging bridge is needed.
export function postPageCustomization(_frame: HTMLIFrameElement | null, _options?: LandingPageCustomization) {}
