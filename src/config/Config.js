const config = {
    common: {
        cloudItemSku: 'rm-cloud-pro-1y'
    },
    local: {
        apiUrl: 'https://api-dev.redismon.app',
        authUrl: 'http://localhost:2300',
        cloudUrl: 'http://localhost:2100/cloud',
        maintenanceUrl: 'http://localhost:2100/maintenance',
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
        authUrl: 'https://auth-dev.redismon.app',
        cloudUrl: 'https://www-dev.redismon.app/cloud',
        maintenanceUrl: 'https://www-dev.redismon.app/maintenance',
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
        authUrl: 'https://auth.redismon.app',
        cloudUrl: 'https://www.redismon.app/cloud',
        maintenanceUrl: 'https://www.redismon.app/maintenance',
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