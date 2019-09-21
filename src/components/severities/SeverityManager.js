import React from 'react';
import PropTypes from 'prop-types';
import { Col, Empty, Row } from 'antd';
import SeverityList from 'components/severities/SeverityList';
import SeverityForm from 'components/severities/SeverityForm';
import { useSeverityApi } from 'hooks/UseSeverityApi';

function SeverityManager(props) {
    const severityApi = useSeverityApi();
    const selectedSeverityId = props.severityId;

    const onAddSeverity = async severity => {
        severity = await severityApi.addSeverity(severity);
        props.onSeveritySelection(severity.id);
    };

    const onDuplicateSeverity = async severity => {
        severity = await severityApi.duplicateSeverity(severity);
        props.onSeveritySelection(severity.id);
    };

    const onSeveritySelection = severity => {
        props.onSeveritySelection(severity.id);
    };

    const selectedSeverity = severityApi.severities.find(severity => severity.id === selectedSeverityId);

    return (
        <Row>
            <Col span={6}>
                <SeverityList
                    severities={severityApi.severities}
                    selectedSeverityId={selectedSeverityId}
                    addSeverity={onAddSeverity}
                    duplicateSeverity={onDuplicateSeverity}
                    deleteSeverity={severityApi.deleteSeverity}
                    onSeveritySelection={onSeveritySelection} />
            </Col>
            <Col span={2} />
            <Col span={16}>
                {selectedSeverity ? (
                    <SeverityForm key={selectedSeverityId} severity={selectedSeverity} updateSeverity={severityApi.updateSeverity} />
                ) : <Empty description="Please select a severity" />}
            </Col>
        </Row>
    );
}

SeverityManager.propTypes = {
    severityId: PropTypes.string,
    onSeveritySelection: PropTypes.func.isRequired
};

export default SeverityManager;