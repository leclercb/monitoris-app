const config = {
    common: {
        alertUpdateDelay: 300,
        cloudItemSku: 'rm-cloud-pro-1y',
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
            productId: 'prod_G2jWzVLWFNIRsz'
        }
    },
    dev: {
        apiUrl: 'https://api-dev.redismon.app',
        authUrl: 'https://auth-dev.redismon.app',
        cloudUrl: 'https://www-dev.redismon.app/cloud',
        maintenanceUrl: 'https://www-dev.redismon.app/maintenance',
        proxyUrl: 'https://proxy-dev.redismon.app',
        wsUrl: 'wss://ws-dev.redismon.app',
        auth: {
            region: 'eu-west-1',
            userPoolId: process.env.REACT_APP_AUTH_USERPOOLID,
            userPoolWebClientId: process.env.REACT_APP_AUTH_USERPOOLWEBCLIENTID,
            cookieStorage: {
                domain: '.redismon.app',
                secure: true
            }
        },
        stripe: {
            publicKey: 'pk_test_9v1ka0StPotw9LDKv7U4klpy00XoUX0SMH',
            productId: 'prod_G2jWzVLWFNIRsz'
        }
    },
    prod: {
        apiUrl: 'https://api.redismon.app',
        authUrl: 'https://auth.redismon.app',
        cloudUrl: 'https://www.redismon.app/cloud',
        maintenanceUrl: 'https://www.redismon.app/maintenance',
        proxyUrl: 'https://proxy.redismon.app',
        wsUrl: 'wss://ws.redismon.app',
        auth: {
            region: 'eu-west-1',
            userPoolId: process.env.REACT_APP_AUTH_USERPOOLID,
            userPoolWebClientId: process.env.REACT_APP_AUTH_USERPOOLWEBCLIENTID,
            cookieStorage: {
                domain: '.redismon.app',
                secure: true
            }
        },
        stripe: {
            publicKey: 'pk_live_dDwP9dT6wVZSJ6utoo7mauC700I2IUls6o',
            productId: ''
        }
    }
};

export function getConfig() {
    return {
        ...config.common,
        ...config[process.env.REACT_APP_STAGE]
    };
}