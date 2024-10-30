import {
    Panel,
    PanelBody,
    PanelRow,
    TextControl,
    TextareaControl,
    ToggleControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { more } from '@wordpress/icons';
import SaveButton from './SaveButton';

const TeamPanel = ({ team, setTeam, saveSettings }) => {

    const handleMemberChange = (index, field, value) => {
        const updatedTeam = [...team.teamMembers];
        updatedTeam[index] = { ...updatedTeam[index], [field]: value };
        setTeam({ ...team, teamMembers: updatedTeam });
    }

    return (
        <Panel header={__("Theme Team Panel")}>
            {
                team.teamMembers.map((member, index) => (
                    <div key={index}>
                        <PanelBody title={member.teamName !== '' ? `${member.teamName}'s Settings` : __("Team Member Settings")} icon={more} initialOpen={false} >
                            <PanelRow>
                                <TextControl
                                    __nextHasNoMarginBottom
                                    label={__("Enter Team Member Name")}
                                    value={member.teamName}
                                    onChange={(value) => handleMemberChange(index, 'teamName', value)}
                                />
                            </PanelRow>
                            <PanelRow>
                                <TextareaControl
                                    style={{
                                        background: '#ddd',
                                        height: 100,
                                        width: '100%'
                                    }}
                                    __nextHasNoMarginBottom
                                    label={__("Enter Team Member Desc")}
                                    value={member.teamDesc}
                                    onChange={(value) => handleMemberChange(index, 'teamDesc', value)}
                                    rows='6'
                                />
                            </PanelRow>
                            <PanelRow>
                                <ToggleControl
                                    __nextHasNoMarginBottom
                                    checked={member.enableDeveloper}
                                    label={__("Backend developer")}
                                    onChange={(value) => handleMemberChange(index, 'enableDeveloper', value)}
                                />
                            </PanelRow>
                            <PanelRow>
                                <ToggleGroupControl
                                    __nextHasNoMarginBottom
                                    isBlock
                                    value={member.teamPosition}
                                    label="Designation Post"
                                    onChange={(value) => handleMemberChange(index, 'teamPosition', value)}
                                >
                                    <ToggleGroupControlOption
                                        label="Intern"
                                        value="intern"
                                    />
                                    <ToggleGroupControlOption
                                        label="Junior"
                                        value="junior"
                                    />
                                    <ToggleGroupControlOption
                                        label="Mid"
                                        value="mid"
                                    />
                                    <ToggleGroupControlOption
                                        label="Senior"
                                        value="senior"
                                    />
                                </ToggleGroupControl>
                            </PanelRow>
                            <PanelRow>
                                <SaveButton onClick={saveSettings} />
                            </PanelRow>
                        </PanelBody>
                    </div>
                ))
            }

        </Panel>
    )
};
export default TeamPanel