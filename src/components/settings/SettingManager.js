import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, List, Row } from 'antd';
import Icon from 'components/common/Icon';
import PromiseButton from 'components/common/PromiseButton';
import { getInputForType } from 'data/DataFieldComponents';
import { getValuePropNameForType } from 'data/DataFieldTypes';
import { getCategories, getCategorySettings } from 'data/DataSettings';
import { useSettingsApi } from 'hooks/UseSettingsApi';
import { getDefaultFormItemLayout, onCommitForm } from 'utils/FormUtils';

function SettingManager(props) {
    const settingsApi = useSettingsApi();

    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
    }); // eslint-disable-line react-hooks/exhaustive-deps

    const categories = getCategories();
    const category = categories.find(category => category.id === props.category);
    const settings = getCategorySettings(category).filter(setting => setting.visible !== false);

    const onCategorySelection = category => {
        props.onCategorySelection(category.id);
    };

    const formItemLayout = getDefaultFormItemLayout();

    const createElement = item => {
        switch (item.type) {
            case 'button':
                return (
                    <Form.Item label={item.title} style={{ width: '100%' }}>
                        <PromiseButton
                            danger={item.buttonType === 'danger'}
                            type={item.buttonType === 'danger' ? 'default' : item.buttonType}
                            onClick={() => item.value(settingsApi.settings, settingsApi.updateSettings, settingsApi.dispatch)}>
                            {item.title}
                        </PromiseButton>
                    </Form.Item>
                );
            case 'component':
                return (
                    <div style={{ width: '100%', margin: '20px 0px' }}>
                        {item.value(settingsApi.settings, settingsApi.updateSettings, settingsApi.dispatch)}
                    </div>
                );
            case 'label':
                return (
                    <Form.Item label={item.title} style={{ width: '100%' }}>
                        {item.value(settingsApi.settings, settingsApi.updateSettings, settingsApi.dispatch)}
                    </Form.Item>
                );
            default:
                return (
                    <Form.Item
                        label={item.title}
                        style={{ width: '100%' }}>
                        {item.prefix}
                        <Form.Item
                            noStyle
                            name={item.id}
                            valuePropName={getValuePropNameForType(item.type)}>
                            {getInputForType(
                                item.type,
                                item.options,
                                {
                                    disabled: item.editable === false,
                                    onCommit: () => onCommitForm(form, {}, settingsApi.updateSettings)
                                })}
                        </Form.Item>
                        {item.suffix}
                    </Form.Item>
                );
        }
    };

    return (
        <Row>
            <Col span={6}>
                <List
                    size="small"
                    bordered={true}
                    dataSource={categories}
                    renderItem={item => (
                        <List.Item
                            onClick={() => onCategorySelection(item)}
                            className={item.id === props.category ? 'selected-list-item' : null}>
                            <Icon icon={item.icon} text={item.title} />
                        </List.Item>
                    )}
                />
            </Col>
            <Col span={2} />
            <Col span={16}>
                <Form form={form} initialValues={settingsApi.settings} {...formItemLayout}>
                    <List
                        size="small"
                        bordered={false}
                        dataSource={settings}
                        renderItem={item => (
                            <List.Item>
                                {createElement(item)}
                            </List.Item>
                        )} />
                </Form>
            </Col>
        </Row>
    );
}

SettingManager.propTypes = {
    category: PropTypes.string.isRequired,
    onCategorySelection: PropTypes.func.isRequired
};

export default SettingManager;