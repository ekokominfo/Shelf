import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const CompleteShelfLandingPage = lazy(() => import('./effects/complete-shelf-landing-page/CompleteShelfLandingPage').then(module => ({ default: module.CompleteShelfLandingPage })));

createRoot(document.getElementById('root')!).render(
  <main className="shader-frame">
    <Suspense fallback={<p className="loading-host" role="status">Binding the collection</p>}>
      <CompleteShelfLandingPage headingFont="iowan-old-style" bodyFont="inter" headingWeight="400" bodyWeight="400" primaryColor="#c87046" headingSize={60} bodySize={12} headingLetterSpacing={-0.055} />
    </Suspense>
  </main>,
);
