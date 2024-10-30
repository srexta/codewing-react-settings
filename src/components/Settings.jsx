import {
    Button,
    TabPanel,
    Flex,
    FlexItem
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import GeneralSettings from './General';
import Notices from './Notices';
import SettingsTitle from './SettingsTitle';
import TeamPanel from './TeamPanel';
import UseSettings from './useSettings';
import { useEffect, useState } from '@wordpress/element';
import SaveButton from './SaveButton';

export default function SettingsPage() {

    const [isDisabled, setIsDisabled] = useState(true);

    const {
        team,
        setTeam,
        saveTeam,
        removeMember
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

    const handleSaveTeam = () => {
        saveTeam();
        setIsDisabled(true);
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
                        return <TeamPanel team={team} setTeam={setTeam} saveTeam={saveTeam} removeMember={removeMember} setIsDisabled={setIsDisabled}/>
                    } else {
                        return <GeneralSettings />
                    }
                }
                }

            </TabPanel>
            <Flex>
                <FlexItem>
                    <Button isPrimary onClick={addMember}>
                        {__("Add New Member")}
                    </Button>
                </FlexItem>
                <FlexItem>
                    <SaveButton onClick={handleSaveTeam} disabled={isDisabled} />
                </FlexItem>
            </Flex>
        </div>
    )
}