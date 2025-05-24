import { setPrimerColorMode } from '../content/shared/ui/setPrimerColorMode';

setPrimerColorMode();

import { createRoot } from 'react-dom/client';
import Popup from '@pages/popup/Popup/index';

import refreshOnUpdate from 'virtual:reload-on-update-in-view';

refreshOnUpdate('pages/popup');

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);
  root.render(<Popup />);
}

init();
