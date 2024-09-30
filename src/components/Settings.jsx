import { __ } from '@wordpress/i18n';
import {
    TabPanel
} from '@wordpress/components';
import SettingsTitle from './SettingsTitle';
import Notices from './Notices';
import SaveButton from './SaveButton';
import UseSettings from './useSettings';
import TeamPanel from './TeamPanel';
import GeneralSettings from './General';

export default function SettingsPage() {

    const onSelectActiveTab = (tab) => {
        console.log('Active tab is ' + tab);
    }

    //get the values of useSettings from the above method
    const {
        team,
        setTeam,
        saveSettings
    } = UseSettings();

    return (
        <div className="wrapperforsettings">
            <SettingsTitle />
            <Notices />
            <TabPanel
                className="my-tab-panel"
                activeClass="active-tab"
                onSelect={onSelectActiveTab}
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
                        return <TeamPanel team ={team} setTeam={setTeam}/>
                    } else {
                        return <GeneralSettings />
                    }
                }
                }

            </TabPanel>
            <SaveButton onClick={saveSettings} />
        </div>
    )
}