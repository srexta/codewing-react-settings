import { __ } from '@wordpress/i18n';
import {
    Panel,
    PanelBody
} from '@wordpress/components';
import { more } from '@wordpress/icons';
const GeneralSettings = () => {
    return (
        <Panel header={__("General Team Panel")}>
            <PanelBody title={__("General Settings")} icon={more} initialOpen={true} >

            </PanelBody>
        </Panel>
    )
};
export default GeneralSettings