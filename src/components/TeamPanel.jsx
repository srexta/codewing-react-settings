import { __ } from '@wordpress/i18n';
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
import { more } from '@wordpress/icons';
import UseSettings from './useSettings';

const TeamPanel = () => {

    //get the values of useSettings from the above method
    const {
        teammemberone,
        setTeamMemberOne,
        teammemberonedesc,
        setTeamMemberOneDesc,
        EnableDeveloper,
        setEnableDeveloper,
        TeamPosition,
        setTeamPosition,
        saveSettings
    } = UseSettings();

    return (
        <Panel header={__("Theme Team Panel")}>
            <PanelBody title={__("Team Member Settings")} icon={more} initialOpen={true} >
                <PanelRow>
                    <TextControl
                        __nextHasNoMarginBottom
                        label={__("Enter Team Member Name")}
                        value={teammemberone}
                        onChange={(value) => setTeamMemberOne(value)}
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
                        value={teammemberonedesc}
                        onChange={(value) => setTeamMemberOneDesc(value)}
                        rows='6'
                    />
                </PanelRow>
                <PanelRow>
                    <ToggleControl
                        __nextHasNoMarginBottom
                        checked={EnableDeveloper}
                        label={__("Backend developer")}
                        onChange={setEnableDeveloper}
                    />
                </PanelRow>
                <PanelRow>
                    <ToggleGroupControl
                        __nextHasNoMarginBottom
                        isBlock
                        value={TeamPosition}
                        label="Designation Post"
                        onChange={setTeamPosition}
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