import React, { useEffect, useState } from 'react';
import { Guide } from 'bizcharts';
import moment from 'moment';
import PropTypes from 'prop-types';
import ModalInstanceAlert from 'components/instances/alerts/ModalInstanceAlert';
import { getSeverity } from 'data/DataSeverities';
import 'components/graphs/graphs/Graph.css';

function HistoryGuide({ alerts }) {
    const [visibleInstanceAlert, setVisibleInstanceAlert] = useState(null);

    useEffect(() => {
        const handler = event => {
            const alert = alerts.find(alert => alert.id === event.detail.alertId);
            setVisibleInstanceAlert(alert);
        };

        window.addEventListener('graph-alert', handler);

        return () => window.removeEventListener('graph-alert', handler);
    });

    return (
        <React.Fragment>
            <ModalInstanceAlert
                instanceAlert={visibleInstanceAlert}
                visible={!!visibleInstanceAlert}
                onClose={() => setVisibleInstanceAlert(null)} />
            <Guide>
                {alerts.map(alert => {
                    const severity = getSeverity(alert.currSeverity);
                    const html = `<div class="graph-alert" style="border-color: ${severity.color};" onClick="window.dispatchEvent(new CustomEvent('graph-alert', { detail: { alertId: '${alert.id}' } }));" />`;

                    return (
                        <React.Fragment key={alert.id}>
                            <Guide.Line
                                start={[moment(alert.id).unix(), 'min']}
                                end={[moment(alert.id).unix(), 'max']}
                                lineStyle={{
                                    stroke: severity.color,
                                    lineDash: [0, 2, 2],
                                    lineWidth: 2
                                }} />
                            <Guide.Html
                                position={[moment(alert.id).unix(), 'max']}
                                alignX="left"
                                alignY="top"
                                offsetX={-7}
                                offsetY={-5}
                                html={html} />
                        </React.Fragment>
                    );
                })}
            </Guide>
        </React.Fragment>
    );
}

HistoryGuide.propTypes = {
    alerts: PropTypes.array.isRequired
};

export default HistoryGuide;