import { Switch, Route, useLocation } from 'react-router-dom';
import Quiz from 'pages/Quiz';
import Editor from 'pages/Editor/Editor';
import NavBar from 'layout/NavBar';
import Attempt from 'pages/Attempt';
import History from 'pages/History';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SetSplash } from 'redux/actions';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname !== '/') dispatch(SetSplash(true));
  }, []);

  return (
    <div className="App h-screen overflow-auto flex flex-col">
      <NavBar />
      <Switch>
        <Route component={Quiz} exact path="/" />
        <Route component={Editor} path="/editor" />
        <Route component={Attempt} path="/quiz/:id" />
        <Route component={History} path="/history" />
      </Switch>
    </div>
  );
}

export default App;
