import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ReactJsonView from 'react-json-view';
import { Icon, Label, TextArea, List } from 'semantic-ui-react';
import Popup from '../../popups/Popup';
import { getStringValue, getTypedValue } from './utils';
import './JsonInput.css';

function ReactJsonViewWrapper({ value, divStyle, onChange }) {
    return (
        <div style={divStyle}>
            <ReactJsonView
                src={value}
                name={null}
                enableClipboard={false}
                defaultValue=""
                onAdd={onChange}
                onEdit={onChange}
                onDelete={onChange}
            />
        </div>
    );
}

ReactJsonViewWrapper.propTypes = {
    /**
     * JSON value
     */
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.object,

    /**
     * React style object passed to ReactJsonView component
     */
    // eslint-disable-next-line react/forbid-prop-types
    divStyle: PropTypes.object,

    /**
     * Function called on value change
     */
    onChange: PropTypes.func
};

ReactJsonViewWrapper.defaultProps = {
    value: {},
    divStyle: {},
    onChange: _.noop
};

/**
 * `JsonInput` is a component providing text or rich editor for JSON-like data
 */
export default class JsonInput extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isRawView: true,
            isParsableToJson: false,
            isMouseOver: false
        };

        this.onChangeJson = this.onChangeJson.bind(this);
        this.onChangeString = this.onChangeString.bind(this);
        this.switchView = this.switchView.bind(this);
    }

    componentDidMount() {
        const isParsableToJson = this.isParsableToJson();
        this.setState({ isParsableToJson, isRawView: !isParsableToJson });
    }

    componentDidUpdate(prevProps) {
        const { value } = this.props;
        const { isRawView } = this.state;

        if (!_.isEqual(value, prevProps.value)) {
            const isParsableToJson = this.isParsableToJson();
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                isParsableToJson,
                isRawView: !isRawView ? !isParsableToJson : isRawView
            });
        }
    }

    onChangeJson({ updated_src: value }) {
        const { name, onChange } = this.props;

        onChange(null, {
            name,
            value: getStringValue(value)
        });
    }

    onChangeString(event, { name, value }) {
        const { onChange } = this.props;
        onChange(event, { name, value });
    }

    switchView() {
        const { isRawView } = this.state;
        this.setState({ isRawView: !isRawView });
    }

    // See: https://stackoverflow.com/questions/9804777/how-to-test-if-a-string-is-json-or-not
    isParsableToJson() {
        const { value } = this.props;
        let isParsableToJson = true;

        if (!_.isString(value)) {
            isParsableToJson = false;
        } else {
            try {
                const result = JSON.parse(value);
                isParsableToJson =
                    Object.prototype.toString.call(result) === '[object Object]' || Array.isArray(result);
            } catch (err) {
                isParsableToJson = false;
            }
        }

        return isParsableToJson;
    }

    render() {
        const { name, value, error } = this.props;
        const { isRawView, isParsableToJson, isMouseOver } = this.state;

        const stringValue = getStringValue(value);
        const jsonValue = getTypedValue(value);

        const style = {
            backgroundColor: error ? '#fff6f6' : '',
            border: `1px solid ${error ? 'rgb(224, 180, 180)' : 'rgba(34,36,38,.15)'}`,
            borderRadius: 4,
            padding: 10
        };

        return (
            <div
                style={{ position: 'relative' }}
                onMouseEnter={() => this.setState({ isMouseOver: true })}
                onMouseLeave={() => this.setState({ isMouseOver: false })}
            >
                {isRawView ? (
                    <TextArea name={name} value={stringValue} onChange={this.onChangeString} style={style} />
                ) : (
                    <ReactJsonViewWrapper value={jsonValue} divStyle={style} onChange={this.onChangeJson} />
                )}
                {isMouseOver && (
                    <Popup>
                        <Popup.Trigger>
                            <Icon
                                name="edit"
                                link={isParsableToJson}
                                disabled={!isParsableToJson}
                                style={{ position: 'absolute', top: 10, right: 30 }}
                                onClick={isParsableToJson ? this.switchView : _.noop}
                            />
                        </Popup.Trigger>
                        <Popup.Content>
                            {isParsableToJson
                                ? `Switch to ${isRawView ? 'Rich View' : 'Text View'}`
                                : 'Cannot switch to Rich View. Text cannot be parsed to JSON.'}
                        </Popup.Content>
                    </Popup>
                )}
                {isMouseOver && !isRawView && (
                    <Popup wide="very">
                        <Popup.Trigger>
                            <Icon name="info" style={{ position: 'absolute', top: 10, right: 50, cursor: 'pointer' }} />
                        </Popup.Trigger>
                        <Popup.Content>
                            <List>
                                <List.Item>
                                    <Label>Ctrl + Click</Label> to enter edit mode
                                </List.Item>
                                <List.Item>
                                    In edit mode <Label>Ctrl + Enter</Label> to submit changes
                                </List.Item>
                                <List.Item>
                                    In edit mode <Label>Escape</Label> to cancel changes
                                </List.Item>
                            </List>
                        </Popup.Content>
                    </Popup>
                )}
            </div>
        );
    }
}

JsonInput.propTypes = {
    /**
     * name of the field
     */
    name: PropTypes.string.isRequired,

    /**
     * value of the field
     */
    value: PropTypes.string,

    /**
     * is field invalid
     */
    error: PropTypes.bool,

    /**
     * function to be called on value change
     */
    onChange: PropTypes.func
};

JsonInput.defaultProps = {
    value: '{}',
    error: false,
    onChange: _.noop
};
