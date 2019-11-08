import React, { useEffect, useState } from 'react';
import { Button, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';

function ModalPasswordField(props) {
    const [value, setValue] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        console.log('here', props.value);
        setValue(props.value);
        setVisible(false);
    }, [props.value]);

    const onOk = () => {
        if (props.onChange) {
            props.onChange(value);
        }

        setVisible(false);
    };

    return (
        <React.Fragment>
            <Modal
                title={<Icon icon="key" text="Change Password" />}
                visible={visible}
                width={600}
                closable={false}
                onOk={onOk}
                onCancel={() => setVisible(false)}>
                <Input.Password {...props} value={value} onChange={e => setValue(e.target.value)} />
            </Modal>
            <Button onClick={() => setVisible(true)}>Change Password</Button>
        </React.Fragment>
    );
}

ModalPasswordField.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default ModalPasswordField;