import './assets/style.css';
import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import SettingsPage from './components/Settings';

domReady( () => {
    const rootElement = document.getElementById('codewing-react-settings');
    if (rootElement) {
        createRoot(rootElement).render(<SettingsPage />);
    }
});
