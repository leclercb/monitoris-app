import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Input, Row } from 'antd';
import Spacer from 'components/common/Spacer';
import SeverityTitle from 'components/severities/SeverityTitle';
import { getInputForType, getSelectForType } from 'data/DataFieldComponents';
import { getConditionsFieldTypeForType, getConditionsForType } from 'data/DataFieldFilterTypes';
import { getValuePropNameForType } from 'data/DataFieldTypes';
import { useSeverityApi } from 'hooks/UseSeverityApi';
import { FieldPropType } from 'proptypes/FieldPropTypes';
import { onCommitForm } from 'utils/FormUtils';

function FilterConditionForm({ condition, context, onUpdate, disabled }) {
    const severityApi = useSeverityApi();

    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {
            xs: { span: 0 },
            sm: { span: 0 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 24 }
        }
    };

    useEffect(() => {
        form.resetFields();
    }, [condition]); // eslint-disable-line react-hooks/exhaustive-deps

    const field = context.fields.find(field => field.id === condition.field);
    const conditionFieldType = getConditionsFieldTypeForType(field.type);
    const fieldConditions = getConditionsForType(field.type);
    const fieldCondition = fieldConditions.find(c => c.type === condition.type);

    const setValues = object => {
        if (!fieldCondition.multi) {
            severityApi.writableSeverities.forEach(severity => {
                delete object[`value_${severity.id}`];
            });

            object[`value_${object.severity}`] = object.value;
        }

        delete object.value;
        delete object.severity;

        return object;
    };

    const clearValues = object => {
        severityApi.writableSeverities.forEach(severity => {
            delete object[`value_${severity.id}`];
        });

        delete object.value;
        delete object.severity;

        return object;
    };

    const onCommitSetValues = () => onCommitForm(form, condition, onUpdate, { assign: true, convert: setValues });
    const onCommitClearValues = () => onCommitForm(form, condition, onUpdate, { assign: true, convert: clearValues });

    let valueElement = null;

    if (fieldCondition && fieldCondition.multi) {
        valueElement = severityApi.writableSeverities.map(severity => (
            <Form.Item key={severity.id}>
                <Form.Item
                    noStyle
                    name={`value_${severity.id}`}
                    valuePropName={getValuePropNameForType(conditionFieldType)}>
                    {getInputForType(
                        conditionFieldType,
                        {
                            ...(field.type === conditionFieldType ? field.options : {}),
                            extended: true
                        },
                        {
                            onCommit: onCommitSetValues,
                            disabled
                        })}
                </Form.Item>
                <Spacer />
                <SeverityTitle severityId={severity.id} />
            </Form.Item>
        ));
    }

    if (fieldCondition && !fieldCondition.multi) {
        valueElement = (
            <Form.Item key="value">
                <div style={{ display: 'flex' }}>
                    <Form.Item
                        noStyle
                        name="value"
                        valuePropName={getValuePropNameForType(conditionFieldType)}>
                        {getInputForType(
                            conditionFieldType,
                            {
                                ...(field.type === conditionFieldType ? field.options : {}),
                                extended: true
                            },
                            {
                                onCommit: onCommitSetValues,
                                disabled
                            })}
                    </Form.Item>
                    <Form.Item
                        noStyle
                        name="severity"
                        valuePropName={getValuePropNameForType('severity')}>
                        {getInputForType(
                            'severity',
                            {
                                extended: true
                            },
                            {
                                onCommit: onCommitSetValues,
                                disabled,
                                style: { marginLeft: 10, width: 200 }
                            })}
                    </Form.Item>
                </div>
            </Form.Item>
        );
    }

    const extendedCondition = {
        ...condition,
        value: null,
        severity: 'info'
    };

    for (let i = severityApi.writableSeverities.length - 1; i >= 0; i--) {
        const severity = severityApi.writableSeverities[i];
        if (`value_${severity.id}` in condition) {
            extendedCondition.value = condition[`value_${severity.id}`];
            extendedCondition.severity = severity.id;
        }
    }

    return (
        <Form form={form} initialValues={extendedCondition} {...formItemLayout}>
            <Row gutter={10}>
                <Col span={6}>
                    <Form.Item>
                        <Input value={field.title} disabled={true} />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: 'The condition is required'
                            }
                        ]}>
                        {getSelectForType(field.type, {
                            onChange: onCommitClearValues,
                            disabled
                        })}
                    </Form.Item>
                </Col>
                <Col span={10}>
                    {valueElement}
                </Col>
            </Row>
        </Form>
    );
}

FilterConditionForm.propTypes = {
    condition: PropTypes.object.isRequired,
    context: PropTypes.shape({
        fields: PropTypes.arrayOf(FieldPropType.isRequired).isRequired
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
};

export default FilterConditionForm;