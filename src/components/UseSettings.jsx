import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

const UseSettings = () => {
    const [teammemberone, setTeamMemberOne] = useState('');
    const [teammemberonedesc, setTeamMemberOneDesc] = useState('');
    const [EnableDeveloper, setEnableDeveloper] = useState(true);
    const [TeamPosition, setTeamPosition] = useState('intern');
    const { createSuccessNotice } = useDispatch(noticesStore);

    useEffect(() => {
        apiFetch({ path: '/wp/v2/settings' }).then((settings) => {
            setTeamMemberOne(settings.codewing_react_settings.teammemberone);
            setTeamMemberOneDesc(settings.codewing_react_settings.teammemberonedesc);
            setEnableDeveloper(settings.codewing_react_settings.EnableDeveloper);
            setTeamPosition(settings.codewing_react_settings.TeamPosition);
        });
    }, []);

    const saveSettings = () => {
        apiFetch({
            path: '/wp/v2/settings',
            method: 'POST',
            data: {
                codewing_react_settings: {
                    teammemberone,
                    teammemberonedesc,
                    EnableDeveloper,
                    TeamPosition
                },
            },
        }).then((tab) => {
            createSuccessNotice(
                __('Settings saved.', 'codewing-react-settings')
            );
        });
    };

    return {
        teammemberone,
        setTeamMemberOne,
        teammemberonedesc,
        setTeamMemberOneDesc,
        EnableDeveloper,
        setEnableDeveloper,
        TeamPosition,
        setTeamPosition,
        saveSettings
    };
};

export default UseSettings