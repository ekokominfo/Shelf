import { useMemo } from 'react';
import { LandingPageFrame, type LandingPageProps } from './LandingPageFrame';
import type { PageTypographyProps } from './pageTypography';

// Only the host boundary is adapted. The full document is served as a static file.
export function CompleteShelfLandingPage({ headingFont, bodyFont, headingWeight, bodyWeight, primaryColor, headingSize, bodySize, headingLetterSpacing, ...frame }: LandingPageProps & PageTypographyProps) {
  const customization = useMemo(() => ({ headingFont, bodyFont, headingWeight, bodyWeight, primaryColor, headingSize, bodySize, headingLetterSpacing }), [headingFont, bodyFont, headingWeight, bodyWeight, primaryColor, headingSize, bodySize, headingLetterSpacing]);
  return <LandingPageFrame {...frame} customization={customization} title="Working Volumes — Seven Tools for Making" sourceUrl={`${import.meta.env.BASE_URL}landing-pages/complete-shelf-v2.html`} />;
}
