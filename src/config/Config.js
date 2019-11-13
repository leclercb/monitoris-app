const config = {
    common: {
        alertUpdateDelay: 300,
        cloudItemSku: 'mt-cloud-pro-1y',
        instanceAlertTtl: 7,
        instanceReportTtl: 7
    },
    local: {
        apiUrl: 'http://localhost:2000',
        authUrl: 'http://localhost:2300',
        cloudUrl: 'http://localhost:2100/cloud',
        maintenanceUrl: 'http://localhost:2100/maintenance',
        proxyUrl: 'http://localhost:5000',
        wsUrl: 'ws://localhost:2001',
        auth: {
            region: 'eu-west-1',
            userPoolId: process.env.REACT_APP_AUTH_USERPOOLID,
            userPoolWebClientId: process.env.REACT_APP_AUTH_USERPOOLWEBCLIENTID,
            cookieStorage: {
                domain: 'localhost',
                secure: false
            }
        },
        stripe: {
            publicKey: 'pk_test_9v1ka0StPotw9LDKv7U4klpy00XoUX0SMH',
            productId: 'prod_GAiy4Nm17oHcuA'
        }
    },
    dev: {
        apiUrl: 'https://api-dev.monitoris.app',
        authUrl: 'https://auth-dev.monitoris.app',
        cloudUrl: 'https://www-dev.monitoris.app/cloud',
        maintenanceUrl: 'https://www-dev.monitoris.app/maintenance',
        proxyUrl: 'https://proxy-dev.monitoris.app',
        wsUrl: 'wss://ws-dev.monitoris.app',
        auth: {
            region: 'eu-west-1',
            userPoolId: process.env.REACT_APP_AUTH_USERPOOLID,
            userPoolWebClientId: process.env.REACT_APP_AUTH_USERPOOLWEBCLIENTID,
            cookieStorage: {
                domain: '.monitoris.app',
                secure: true
            }
        },
        stripe: {
            publicKey: 'pk_test_9v1ka0StPotw9LDKv7U4klpy00XoUX0SMH',
            productId: 'prod_GAiy4Nm17oHcuA'
        }
    },
    prod: {
        apiUrl: 'https://api.monitoris.app',
        authUrl: 'https://auth.monitoris.app',
        cloudUrl: 'https://www.monitoris.app/cloud',
        maintenanceUrl: 'https://www.monitoris.app/maintenance',
        proxyUrl: 'https://proxy.monitoris.app',
        wsUrl: 'wss://ws.monitoris.app',
        auth: {
            region: 'eu-west-1',
            userPoolId: process.env.REACT_APP_AUTH_USERPOOLID,
            userPoolWebClientId: process.env.REACT_APP_AUTH_USERPOOLWEBCLIENTID,
            cookieStorage: {
                domain: '.monitoris.app',
                secure: true
            }
        },
        stripe: {
            publicKey: 'pk_live_dDwP9dT6wVZSJ6utoo7mauC700I2IUls6o',
            productId: 'prod_GAj2FA9HdNEUUi'
        }
    }
};

export function getConfig() {
    return {
        ...config.common,
        ...config[process.env.REACT_APP_STAGE]
    };
}