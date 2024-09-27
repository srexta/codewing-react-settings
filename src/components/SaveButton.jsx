import { __ } from '@wordpress/i18n';
import {
    Button
} from '@wordpress/components';
const SaveButton = ({ onClick }) => {
    return (
        <Button variant="primary" onClick={onClick} __next40pxDefaultSize>
            {__('Save', 'codewing-react-settings')}
        </Button>
    );
};
export default SaveButton
