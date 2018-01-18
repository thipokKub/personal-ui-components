import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Clean from './Components/Clean';
import './Components/Base/Btn/style.css';
import FA from './Components/Others/FA';
import CBG from './Components/Generators/CheckBoxGenerator';

const colors = ["rgba(255, 0, 0, 1)", "rgba(0, 255, 0, 1)", "rgba(0, 0, 255, 1)"]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: colors.length - 1
    }
  }
  render() {
    const { SelectBox, InputText, TextArea, Card, FileUpload, Btn, SimpleCalendar, BlockMath } = Clean;
    const CB = CBG();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <section className="theme-clean flex center">
          <Card flex center column roundCorner
            style={{
              width: '700px',
              minHeight: '500px'
            }}
          >
            <SelectBox
              options={["T1", "T2"]}
              className="Test"
            />
            <TextArea />
            <InputText />
            <FileUpload
              multiple
            />
            <Btn
              className="o-orange font-size-3 hover-dark hover-orange shadow shadow-hover round-corner size-70 circle"
              isRipple={true}
            >
              <FA name="rocket" />
            </Btn>
            <Btn
              className="o-orange font-size-3 hover-dark hover-orange shadow shadow-hover round-corner height-60 width-90"
              isRipple={true}
              color={colors[this.state.currentIndex]}
              onClick={() => {
                this.setState({ currentIndex: (this.state.currentIndex + 1)%colors.length})
              }}
            >
              <FA name="rocket" />
            </Btn>
            <BlockMath
              style={{
                color: 'red'
              }}
              refFunc={(me) => console.log(me)}
            >\int_0^\infty x^2 dx</BlockMath>
            <CB
              states={[
                "Test",
                "Hello",
                "LOL"
              ]}
              initialState={1}
            />
            <SimpleCalendar />
          </Card>
        </section>
      </div>
    );
  }
}

export default App;
