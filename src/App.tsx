import { Switch, Route } from 'react-router-dom';
import Quiz from 'pages/Quiz';
import Editor from 'pages/Editor/Editor';
import NavBar from 'layout/NavBar';
import Attempt from 'pages/Attempt';

function App() {
  return (
    <div className="App h-screen overflow-auto flex flex-col">
      <NavBar />
      <Switch>
        <Route component={Quiz} exact path="/" />
        <Route component={Editor} path="/editor" />
        <Route component={Attempt} path="/quiz/:id" />
      </Switch>
    </div>
  );
}

export default App;
