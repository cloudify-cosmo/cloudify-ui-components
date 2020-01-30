import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Input } from 'semantic-ui-react';
import Dropdown from 'components/elements/Dropdown';
import ErrorMessage from 'components/elements/ErrorMessage';
import Checkbox from 'components/form/Checkbox';
import FormField from 'components/form/Form/FormField';

/**
 * `GenericField` is a generic component which can be used as different input fields in Form component
 */
export default class GenericField extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = GenericField.isListType(props.type) ? { options: [] } : {};
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.initOptions(this.props);
    }

    componentDidUpdate(prevProps) {
        const { items } = this.props;
        if (items !== prevProps.items) {
            this.initOptions(this.props);
        }
    }

    initOptions(props) {
        if (props.type === GenericField.BOOLEAN_LIST_TYPE) {
            this.setState({
                options: [{ text: 'false', value: false }, { text: 'true', value: true }]
            });
        } else if (GenericField.isListType(props.type) && props.items) {
            let valueAlreadyInOptions = false;
            const options = _.map(props.items, item => {
                let newItem = item;
                if (!_.isObject(item)) {
                    newItem = { name: item, value: item };
                }

                if (newItem.value === props.value) {
                    valueAlreadyInOptions = true;
                }
                return { text: newItem.name, value: newItem.value };
            });

            if (props.type !== GenericField.MULTI_SELECT_LIST_TYPE && !valueAlreadyInOptions) {
                options.push({ text: props.value, value: props.value });
            }

            this.setState({ options: _.uniqBy(options, 'value') });
        }
    }

    handleInputChange(proxy, field) {
        const { onChange, type } = this.props;
        onChange(proxy, { ...field, genericType: type });
    }

    render() {
        const {
            component: Component,
            default: defaultValue,
            description,
            error,
            icon,
            label,
            max,
            min,
            name,
            placeholder,
            required,
            type,
            value
        } = this.props;
        const { options } = this.state;
        let field = null;

        if (
            type === GenericField.STRING_TYPE ||
            type === GenericField.NUMBER_TYPE ||
            type === GenericField.PASSWORD_TYPE
        ) {
            field = (
                <Input
                    icon={icon}
                    name={name}
                    type={type === GenericField.STRING_TYPE ? 'text' : type}
                    placeholder={placeholder}
                    value={value === null ? '' : value}
                    onChange={this.handleInputChange}
                    max={type === GenericField.NUMBER_TYPE ? max : null}
                    min={type === GenericField.NUMBER_TYPE ? min : null}
                />
            );
        } else if (type === GenericField.BOOLEAN_TYPE) {
            field = (
                <Checkbox
                    label=" "
                    name={name}
                    toggle
                    checked={(_.isBoolean(value) && value) || (_.isString(value) && value === 'true')}
                    onChange={this.handleInputChange}
                />
            );
        } else if (GenericField.isListType(type)) {
            field = (
                <Dropdown
                    fluid
                    selection
                    value={value}
                    name={name}
                    multiple={type === GenericField.MULTI_SELECT_LIST_TYPE}
                    allowAdditions={
                        type === GenericField.EDITABLE_LIST_TYPE || type === GenericField.NUMBER_EDITABLE_LIST_TYPE
                    }
                    search={type === GenericField.EDITABLE_LIST_TYPE || type === GenericField.NUMBER_EDITABLE_LIST_TYPE}
                    placeholder={placeholder || 'Please select'}
                    options={options}
                    onChange={this.handleInputChange}
                    clearable={false}
                />
            );
        } else if (type === GenericField.CUSTOM_TYPE) {
            const optionalProps = _.keys(GenericField.defaultProps);
            const requiredProps = ['name', 'label', 'component'];
            const componentProps = _.omit(this.props, [...optionalProps, ...requiredProps]);

            if (Component === null) {
                return <ErrorMessage error={`\`component\` prop have to be provided when \`${type}\` type is set.`} />;
            }
            field = (
                <Component
                    name={name}
                    value={_.isUndefined(value) ? defaultValue : value}
                    onChange={this.handleInputChange}
                    /* eslint-disable-next-line react/jsx-props-no-spreading */
                    {...componentProps}
                />
            );
        }

        return (
            <FormField className={name} help={description} label={label} required={required} error={error}>
                {field}
            </FormField>
        );
    }
}

/**
 * alphanumeric input field
 */
GenericField.STRING_TYPE = 'string';

/**
 * password input field
 */
GenericField.PASSWORD_TYPE = 'password';

/**
 * numeric input field
 */
GenericField.NUMBER_TYPE = 'number';

/**
 * two-state input field
 */
GenericField.BOOLEAN_TYPE = 'boolean';

/**
 * boolean with no default
 */
GenericField.BOOLEAN_LIST_TYPE = 'booleanList';

/**
 * dropdown alphanumeric list field
 */
GenericField.LIST_TYPE = 'list';

/**
 * dropdown numeric list field
 */
GenericField.NUMBER_LIST_TYPE = 'numberList';

/**
 * dropdown multiselection list
 */
GenericField.MULTI_SELECT_LIST_TYPE = 'multiSelectList';

/**
 * dropdown editable list
 */
GenericField.EDITABLE_LIST_TYPE = 'editableList';

/**
 * dropdown editable numeric list
 */
GenericField.NUMBER_EDITABLE_LIST_TYPE = 'numberEditableList';

/**
 * custom input field
 */
GenericField.CUSTOM_TYPE = 'custom';

GenericField.formatValue = (type, value) => {
    let formattedValue = value;

    if (type === GenericField.MULTI_SELECT_LIST_TYPE) {
        formattedValue = _.split(value, ',');
    } else if (type === GenericField.BOOLEAN_TYPE) {
        formattedValue = (_.isBoolean(value) && value) || (_.isString(value) && value === 'true');
    } else if (
        type === GenericField.NUMBER_TYPE ||
        type === GenericField.NUMBER_LIST_TYPE ||
        type === GenericField.NUMBER_EDITABLE_LIST_TYPE
    ) {
        formattedValue = parseInt(value, 10) || 0;
    }

    return formattedValue;
};

GenericField.isListType = type => {
    return (
        type === GenericField.LIST_TYPE ||
        type === GenericField.NUMBER_LIST_TYPE ||
        type === GenericField.MULTI_SELECT_LIST_TYPE ||
        type === GenericField.BOOLEAN_LIST_TYPE ||
        type === GenericField.EDITABLE_LIST_TYPE ||
        type === GenericField.NUMBER_EDITABLE_LIST_TYPE
    );
};

GenericField.propTypes = {
    /**
     * field's label to show above the field
     */
    label: PropTypes.string.isRequired,

    /**
     * name of the input field
     */
    name: PropTypes.string.isRequired,

    /**
     * React element type (ie. MyComponent) to be used as input field,
     * it must provide at least the following props: 'name', 'value', 'onChange',
     * custom props, will be passed through
     * (valid only for CUSTOM_TYPE)
     */
    component: PropTypes.elementType,

    /**
     * default value of the field
     */
    // eslint-disable-next-line react/forbid-prop-types
    default: PropTypes.any,

    /**
     * fields description showed in popup when user hovers field
     */
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

    /**
     * specifies if a field should be marked as field with error
     */
    error: PropTypes.bool,

    /**
     * additional icon in right side of the input field
     * (only valid for STRING\_TYPE, NUMBER\_TYPE, PASSWORD\_TYPE)
     */
    icon: PropTypes.string,

    /**
     * list of items (valid only for list types:
     * GenericField.LIST\_TYPE,
     * NUMBER\_LIST\_TYPE,
     * MULTI\_SELECT\_LIST\_TYPE,
     * BOOLEAN\_LIST\_TYPE,
     * EDITABLE\_LIST\_TYPE,
     * NUMBER\_EDITABLE\_LIST\_TYPE)
     */
    // eslint-disable-next-line react/forbid-prop-types
    items: PropTypes.array,

    /**
     * maximal value (valid only for NUMBER_TYPE)
     */
    max: PropTypes.number,

    /**
     * minimal value (valid only for NUMBER_TYPE)
     */
    min: PropTypes.number,

    /**
     * function called on input value change
     */
    onChange: PropTypes.func,

    /**
     * specifies a short hint that describes the expected value of an input field
     * (not valid for BOOLEAN\_TYPE and CUSTOM\_TYPE)
     */
    placeholder: PropTypes.string,

    /**
     * define if a field is required (if yes, then displaying a red star icon near label)
     */
    required: PropTypes.bool,

    /**
     * specifies type of the field
     */
    type: PropTypes.oneOf([
        GenericField.BOOLEAN_LIST_TYPE,
        GenericField.BOOLEAN_TYPE,
        GenericField.CUSTOM_TYPE,
        GenericField.EDITABLE_LIST_TYPE,
        GenericField.LIST_TYPE,
        GenericField.MULTI_SELECT_LIST_TYPE,
        GenericField.NUMBER_EDITABLE_LIST_TYPE,
        GenericField.NUMBER_LIST_TYPE,
        GenericField.NUMBER_TYPE,
        GenericField.PASSWORD_TYPE,
        GenericField.STRING_TYPE
    ]),

    /**
     * specifies the value of the field
     */
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.any
};

GenericField.defaultProps = {
    component: null,
    default: '',
    description: '',
    error: false,
    icon: null,
    items: [],
    max: null,
    min: null,
    onChange: () => {},
    placeholder: '',
    required: false,
    type: GenericField.STRING_TYPE,
    value: ''
};
