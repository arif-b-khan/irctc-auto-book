import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { loadTickets } from './actions/ticketActions';
import Popup from './popup';

const store = configureStore();
store.dispatch(loadTickets());

render(
    <Provider store={store}>
        <Popup></Popup>
    </Provider>,
    document.getElementById('app')
);

