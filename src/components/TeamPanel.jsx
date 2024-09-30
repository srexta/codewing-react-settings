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

const TeamPanel = ({team, setTeam}) => {

    return (
        <Panel header={__("Theme Team Panel")}>
            <PanelBody title={__("Team Member Settings")} icon={more} initialOpen={true} >
                <PanelRow>
                    <TextControl
                        __nextHasNoMarginBottom
                        label={__("Enter Team Member Name")}
                        value={team.teamName}
                        onChange={(value) => setTeam({ ...team, teamName: value })}
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
                        value={team.teamDesc}
                        onChange={(value) => setTeam({ ...team, teamDesc: value })}
                        rows='6'
                    />
                </PanelRow>
                <PanelRow>
                    <ToggleControl
                        __nextHasNoMarginBottom
                        checked={team.enableDeveloper}
                        label={__("Backend developer")}
                        onChange={(value) => setTeam({ ...team, enableDeveloper: value })}
                    />
                </PanelRow>
                <PanelRow>
                    <ToggleGroupControl
                        __nextHasNoMarginBottom
                        isBlock
                        value={team.teamPosition}
                        label="Designation Post"
                        onChange={(value) => setTeam({ ...team, teamPosition: value })}
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
            </PanelBody>
        </Panel>
    )
};
export default TeamPanel