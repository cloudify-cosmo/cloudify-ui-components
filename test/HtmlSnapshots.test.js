import initStoryshots from '@storybook/addon-storyshots';
import ReactDOM from 'react-dom';
import _ from 'lodash';

ReactDOM.createPortal = _.identity;
ReactDOM.findDOMNode = () => ({ addEventListener: _.noop });
initStoryshots();
