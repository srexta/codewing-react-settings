import { __ } from '@wordpress/i18n';
import {
    __experimentalHeading as Heading
} from '@wordpress/components';

const SettingsTitle = () => {
    return (
        <Heading level={1}>
            {__('Codewing React Settings Practice', 'codewing-react-settings')}
        </Heading>
    );
};
export default SettingsTitle