import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

const UseSettings = () => {
    const { createSuccessNotice } = useDispatch(noticesStore);

    const [team, setTeam] = useState({
        teamName: '',
        teamDesc: '',
        teamPosition: 'intern',
        enableDeveloper: true
    });

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const retrieveData = async () => {
            try {
                const settings = await apiFetch({
                    path: '/wp/v2/settings',
                    signal, // Attach signal for aborting request
                });

                if (settings && settings.codewing_react_settings) {
                    const { teammemberone, teammemberonedesc, TeamPosition, EnableDeveloper } = settings.codewing_react_settings;
                    console.log(teammemberone, teammemberonedesc, TeamPosition, EnableDeveloper);

                    setTeam({
                        teamName: teammemberone || '',
                        teamDesc: teammemberonedesc || '',
                        teamPosition: TeamPosition || 'intern',
                        enableDeveloper: EnableDeveloper !== undefined ? EnableDeveloper : true,
                    });
                } else {
                    console.error('Invalid settings data:', settings);
                }
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Failed to fetch settings:', error);
                }
            }
        };

        retrieveData();

        return () => {
            // Cleanup function to cancel the API request if the component unmounts
            controller.abort();
        };
    }, []);

    const saveSettings = () => {
        apiFetch({
            path: '/wp/v2/settings',
            method: 'POST',
            data: {
                codewing_react_settings: {
                    teammemberone: team.teamName,
                    teammemberonedesc: team.teamDesc,
                    EnableDeveloper: team.enableDeveloper,
                    TeamPosition: team.teamPosition,
                },
            },
        }).then(() => {
            createSuccessNotice(
                __('Settings saved.', 'codewing-react-settings')
            );
        }).catch((error) => {
            console.error('Failed to save settings:', error);
        });
    };

    return {
        team,
        setTeam,
        saveSettings
    };
};

export default UseSettings;
