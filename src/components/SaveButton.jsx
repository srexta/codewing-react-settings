import { __ } from '@wordpress/i18n';
import {
    Button
} from '@wordpress/components';
const SaveButton = ({ onClick, disabled }) => {
    return (
        <Button variant="primary" onClick={onClick} disabled={disabled}>
            {__('Save', 'codewing-react-settings')}
        </Button>
    );
};
export default SaveButton
