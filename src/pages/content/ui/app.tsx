import { registerUrlObserver } from '@root/src/utils/registerUrlObserver';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    console.log('content view loaded');
    registerUrlObserver();
  }, []);

  return <div className="content-view-text">content view</div>;
}
