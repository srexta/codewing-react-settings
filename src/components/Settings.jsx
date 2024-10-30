import {
    Button,
    TabPanel
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import GeneralSettings from './General';
import Notices from './Notices';
import SettingsTitle from './SettingsTitle';
import TeamPanel from './TeamPanel';
import UseSettings from './useSettings';


export default function SettingsPage() {

    const {
        team,
        setTeam,
        saveSettings
    } = UseSettings();

    const addMember = () => {
        setTeam({
            ...team,
            teamMembers: [...team.teamMembers, {
                teamName: '',
                teamDesc: '',
                enableDeveloper: false,
                teamPosition: 'intern'
            }]
        })
    }

    return (
        <div className="wrapperforsettings">
            <SettingsTitle />
            <Notices />
            <TabPanel
                className="my-tab-panel"
                activeClass="active-tab"
                tabs={[
                    {
                        name: 'team',
                        title: 'Team',
                        className: 'tab-team',
                    },
                    {
                        name: 'general',
                        title: 'General',
                        className: 'tab-general',
                    },
                ]}
            >
                {(tab) => {
                    if (tab.name === 'team') {
                        return <TeamPanel team={team} setTeam={setTeam} saveSettings={saveSettings}/>
                    } else {
                        return <GeneralSettings />
                    }
                }
                }

            </TabPanel>
            <Button isPrimary onClick={addMember}>
                {__("Add New Member")}
            </Button>
        </div>
    )
}