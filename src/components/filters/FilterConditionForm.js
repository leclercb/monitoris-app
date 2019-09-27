import React from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Input, Row } from 'antd';
import SeverityTitle from 'components/severities/SeverityTitle';
import { getInputForType, getSelectForType } from 'data/DataFieldComponents';
import { getConditionsFieldTypeForType, getValuePropNameForType } from 'data/DataFieldTypes';
import { useSeverityApi } from 'hooks/UseSeverityApi';
import { FieldPropType } from 'proptypes/FieldPropTypes';
import { onCommitForm } from 'utils/FormUtils';
import Spacer from 'components/common/Spacer';

function FilterConditionForm(props) {
    const severityApi = useSeverityApi();

    const { getFieldDecorator } = props.form;

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

    const field = props.context.fields.find(field => field.id === props.condition.field);
    const conditionFieldType = getConditionsFieldTypeForType(field.type);

    const onCommit = () => onCommitForm(props.form, props.condition, props.onUpdate, { assign: true });

    return (
        <Form {...formItemLayout}>
            <Row gutter={10}>
                <Col span={6}>
                    <Form.Item>
                        <Input value={field.title} disabled={true} />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item>
                        {getFieldDecorator('type', {
                            initialValue: props.condition.type,
                            rules: [
                                {
                                    required: true,
                                    message: 'The condition is required'
                                }
                            ]
                        })(
                            getSelectForType(field.type, { onBlur: onCommit })
                        )}
                    </Form.Item>
                </Col>
                <Col span={10}>
                    {severityApi.severities.map(severity => (
                        <Form.Item key={severity.id}>
                            {getFieldDecorator(`value_${severity.id}`, {
                                valuePropName: getValuePropNameForType(conditionFieldType),
                                initialValue: props.condition[`value_${severity.id}`]
                            })(
                                getInputForType(
                                    conditionFieldType,
                                    {
                                        ...(field.type === conditionFieldType ? field.options : {}),
                                        extended: true
                                    },
                                    {
                                        onCommit
                                    })
                            )}
                            <Spacer />
                            <SeverityTitle severityId={severity.id} />
                        </Form.Item>
                    ))}
                </Col>
            </Row>
        </Form>
    );
}

FilterConditionForm.propTypes = {
    form: PropTypes.object.isRequired,
    condition: PropTypes.object.isRequired,
    context: PropTypes.shape({
        fields: PropTypes.arrayOf(FieldPropType.isRequired).isRequired
    }).isRequired,
    disabled: PropTypes.bool.isRequired,
    onUpdate: PropTypes.func.isRequired
};

export default Form.create({ name: 'condition' })(FilterConditionForm);