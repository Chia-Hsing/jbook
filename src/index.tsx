import ReactDOM from 'react-dom'
import TextEditor from './components/TextEditor'
import { Provider } from 'react-redux'
import 'bulmaswatch/superhero/bulmaswatch.min.css'

import { store } from './state/index'

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <TextEditor />
            </div>
        </Provider>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'))
