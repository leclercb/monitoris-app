import React from 'react';

export function getConfig(id) {
    switch (id) {
        default: return getAppLayoutConfig();
    }
}

export function getAppLayoutConfig() {
    return {
        continuous: true,
        showProgress: true,
        steps: [
            {
                target: '.joyride-header',
                placement: 'bottom',
                content: 'This is the toolbar of Monitoris. It is were you will find most of the actions you can execute.'
            },
            {
                target: '.joyride-header-selected-view',
                placement: 'bottom',
                content: (
                    <React.Fragment>
                        <p>There are six main views in Monitoris:</p>
                        <ul>
                            <li>The &quot;Alerts&quot; view allows you to display and manage your alerts.</li>
                            <li>The &quot;Instances&quot; view allows you to display and manage your instances.</li>
                            <li>The &quot;Explorer&quot; view allows you to display and manage your keys.</li>
                            <li>The &quot;Tools&quot; view provides multiple tools (info, client list, terminal, ...).</li>
                            <li>The &quot;Graphs&quot; view provides multiple graphs about the state of your Redis instance.</li>
                            <li>The &quot;Dashboards&quot; view provides unified dashboards about the state of multiple Redis instances.</li>
                        </ul>
                    </React.Fragment>
                )
            },
            {
                target: '.joyride-header-settings',
                placement: 'bottom',
                content: 'This button will open the settings of Monitoris.'
            }
        ]
    };
}