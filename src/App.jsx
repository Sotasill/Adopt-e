import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* Ваши компоненты */}
      </BrowserRouter>
    </Provider>
  );
}

export default App; 