import apiFetch from '@wordpress/api-fetch';
import { useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';

const UseSettings = () => {
    const { createSuccessNotice } = useDispatch(noticesStore);

    const [team, setTeam] = useState({
        teamMembers: [
            {
                teamName: '',
                teamDesc: '',
                teamPosition: 'intern',
                enableDeveloper: false,
            },
        ],
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
                    const { teamMembers } = settings.codewing_react_settings;

                    setTeam({
                        teamMembers: teamMembers && Array.isArray(teamMembers)
                            ? teamMembers
                            : [],
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

    const saveTeam = () => {
        apiFetch({
            path: '/wp/v2/settings',
            method: 'POST',
            data: {
                codewing_react_settings: {
                    teamMembers: team.teamMembers,
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
        saveTeam,
    };
};

export default UseSettings;
