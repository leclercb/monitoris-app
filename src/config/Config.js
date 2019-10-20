const config = {
    common: {
        cloudItemSku: 'rm-cloud-pro-1y'
    },
    local: {
        apiUrl: 'http://localhost:2000',
        proxyUrl: 'http://localhost:5000',
        wsUrl: 'ws://localhost:2001',
        authUrl: 'http://localhost:2300',
        cloudUrl: 'http://localhost:2100/cloud',
        maintenanceUrl: 'http://localhost:2100/maintenance',
        stripePublicKey: 'pk_test_2s6bAR33dvEhfo6HPxUFp3aC00Oeu6YaC3',
        auth: {
            region: 'eu-west-1',
            userPoolId: process.env.REACT_APP_AUTH_USERPOOLID,
            userPoolWebClientId: process.env.REACT_APP_AUTH_USERPOOLWEBCLIENTID,
            cookieStorage: {
                domain: 'localhost',
                secure: false
            }
        }
    },
    dev: {
        apiUrl: 'https://api-dev.redismon.app',
        proxyUrl: 'https://proxy-dev.redismon.app',
        wsUrl: 'wss://ws-dev.redismon.app',
        authUrl: 'https://auth-dev.redismon.app',
        cloudUrl: 'https://www-dev.redismon.app/cloud',
        maintenanceUrl: 'https://www-dev.redismon.app/maintenance',
        stripePublicKey: 'pk_test_2s6bAR33dvEhfo6HPxUFp3aC00Oeu6YaC3',
        auth: {
            region: 'eu-west-1',
            userPoolId: process.env.REACT_APP_AUTH_USERPOOLID,
            userPoolWebClientId: process.env.REACT_APP_AUTH_USERPOOLWEBCLIENTID,
            cookieStorage: {
                domain: '.redismon.app',
                secure: true
            }
        }
    },
    prod: {
        apiUrl: 'https://api.redismon.app',
        proxyUrl: 'https://proxy.redismon.app',
        wsUrl: 'wss://ws.redismon.app',
        authUrl: 'https://auth.redismon.app',
        cloudUrl: 'https://www.redismon.app/cloud',
        maintenanceUrl: 'https://www.redismon.app/maintenance',
        stripePublicKey: 'pk_test_2s6bAR33dvEhfo6HPxUFp3aC00Oeu6YaC3',
        auth: {
            region: 'eu-west-1',
            userPoolId: process.env.REACT_APP_AUTH_USERPOOLID,
            userPoolWebClientId: process.env.REACT_APP_AUTH_USERPOOLWEBCLIENTID,
            cookieStorage: {
                domain: '.redismon.app',
                secure: true
            }
        }
    }
};

export function getConfig() {
    return {
        ...config.common,
        ...config[process.env.REACT_APP_STAGE]
    };
}