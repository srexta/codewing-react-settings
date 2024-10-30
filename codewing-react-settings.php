<?php

/**
 * Plugin Name:     Codewing React Settings
 * Plugin URI:      PLUGIN SITE HERE
 * Description:     PLUGIN DESCRIPTION HERE
 * Author:          YOUR NAME HERE
 * Author URI:      YOUR SITE HERE
 * Text Domain:     codewing-react-settings
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         Codewing_React_Settings
 */

// Your code starts here.


add_action('admin_menu', 'codewing_react_settings_menu');
function codewing_react_settings_menu()
{
    add_menu_page(
        'React Settings',
        'React Settings',
        'manage_options',
        'codewing-react-settings',
        'codewing_react_settings_page'
    );
}
function codewing_react_settings_page()
{
    echo '<div id="codewing-react-settings"></div>';
}

//enqueuing a javascript file for react settings

function codewing_react_setting_enqueue($admin_page)
{

    if ('toplevel_page_codewing-react-settings' !== $admin_page) {
        return;
    }

    $asset_file = plugin_dir_path(__FILE__) . 'build/index.asset.php';

    if (! file_exists($asset_file)) {
        return;
    }

    $asset = include $asset_file;

    wp_enqueue_script(
        'codewing-react-settings-script',
        plugins_url('build/index.js', __FILE__),
        $asset['dependencies'],
        $asset['version'],
        array(
            'in_footer' => true,
        )
    );

    //styling the components 
    wp_enqueue_style('wp-components');

    wp_enqueue_style(
        'codewing-react-settings',
        plugins_url('build/style-index.css', __FILE__),
        array_filter(
            $asset['dependencies'],
            function ($style) {
                return wp_style_is($style, 'registered');
            }
        ),
        $asset['version'],
    );
}

add_action('admin_enqueue_scripts', 'codewing_react_setting_enqueue');

function codewing_react_setting_schema_markup()
{
    $default = array(
        'teamMembers' => array(
            array(
                'teamName' => '',
                'teamDesc' => '',
                'enableDeveloper' => true,
                'teamPosition' => 'intern', // Set a default position
            ),
        ),
    );

    $schema = array(
        'type'       => 'object',
        'properties' => array(
            'teamMembers' => array(
                'type'  => 'array',
                'items' => array(
                    'type'       => 'object',
                    'properties' => array(
                        'teamName' => array(
                            'type'    => 'string',
                            'default' => '',
                        ),
                        'teamDesc' => array(
                            'type'    => 'string',
                            'default' => '',
                        ),
                        'enableDeveloper' => array(
                            'type'    => 'boolean',
                            'default' => true,
                        ),
                        'teamPosition' => array(
                            'type'    => 'string',
                            'enum'    => array('intern', 'junior', 'mid', 'senior'),
                            'default' => 'intern',
                        ),
                    ),
                ),
            ),
        ),
    );

    register_setting(
        'options',
        'codewing_react_settings',
        array(
            'type'           => 'object',
            'default'        => $default,
            'show_in_rest'   => array(
                'schema' => $schema,
            ),
        )
    );
}


add_action('init', 'codewing_react_setting_schema_markup');

add_action('wp_body_open', function () {
    echo "<pre>";
    print_r(get_option('codewing_react_settings'));
    echo "</pre>";
});
