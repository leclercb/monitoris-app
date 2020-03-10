import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Tooltip } from 'antd';
import { getAlertFields } from 'data/DataAlertFields';
import { getInputForType } from 'data/DataFieldComponents';
import { getValuePropNameForType } from 'data/DataFieldTypes';
import { AlertPropType } from 'proptypes/AlertPropTypes';
import { getDefaultFormItemLayout, onCommitForm } from 'utils/FormUtils';

const QUEUE_DELAY = 60;

function AlertForm({ alert, updateAlert }) {
    const fields = getAlertFields();
    const [form] = Form.useForm();

    const formItemLayout = getDefaultFormItemLayout();

    useEffect(() => {
        form.resetFields();
    }, [alert.id]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Form form={form} initialValues={alert} {...formItemLayout}>
            {fields.filter(field => field.visible !== false).map(field => (
                <Form.Item
                    key={field.id}
                    label={field.title}>
                    <Form.Item
                        noStyle
                        name={field.id}
                        valuePropName={getValuePropNameForType(field.type)}>
                        {getInputForType(
                            field.type,
                            field.options,
                            {
                                disabled: !field.editable,
                                onCommit: () => onCommitForm(form, alert, updateAlert)
                            })}
                    </Form.Item>
                    {field.id === 'historySize' && (
                        <Tooltip title={(
                            <React.Fragment>
                                <span>In order to avoid flapping, the severity is only decreased when the last X severities are all lower than the current one.</span>
                                <br />
                                <span>As the Redis instance is checked every {QUEUE_DELAY} seconds, it also means that the severity can decrease minimum (X * {QUEUE_DELAY}) seconds after an increase.</span>
                            </React.Fragment>
                        )}>
                            <Icon type="info-circle" theme="twoTone" style={{ marginLeft: 10, fontSize: 16 }} />
                        </Tooltip>
                    )}
                </Form.Item>
            ))}
        </Form>
    );
}

AlertForm.propTypes = {
    alert: AlertPropType.isRequired,
    updateAlert: PropTypes.func.isRequired
};

export default AlertForm;