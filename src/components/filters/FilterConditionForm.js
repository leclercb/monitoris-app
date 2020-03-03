import React from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Input, Row } from 'antd';
import SeverityTitle from 'components/severities/SeverityTitle';
import { getInputForType, getSelectForType } from 'data/DataFieldComponents';
import { getConditionsFieldTypeForType, getConditionsForType, getValuePropNameForType } from 'data/DataFieldTypes';
import { useSeverityApi } from 'hooks/UseSeverityApi';
import { FieldPropType } from 'proptypes/FieldPropTypes';
import { onCommitForm } from 'utils/FormUtils';
import Spacer from 'components/common/Spacer';

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

    const field = context.fields.find(field => field.id === condition.field);
    const conditionFieldType = getConditionsFieldTypeForType(field.type);
    const fieldConditions = getConditionsForType(field.type);
    const fieldCondition = fieldConditions.find(c => c.type === condition.type);

    const onCommit = () => onCommitForm(form, condition, onUpdate, { assign: true });

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
                            onCommit,
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
            <Form.Item
                name="value"
                valuePropName={getValuePropNameForType(conditionFieldType)}>
                {getInputForType(
                    conditionFieldType,
                    {
                        ...(field.type === conditionFieldType ? field.options : {}),
                        extended: true
                    },
                    {
                        onCommit,
                        disabled
                    })}
            </Form.Item>
        );
    }

    return (
        <Form form={form} initialValues={condition} {...formItemLayout}>
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
                            onBlur: onCommit,
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