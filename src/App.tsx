import { useState } from 'react'
import './App.css'
import ZoomController from '../lib/components'
import logo from './assets/logo.png'

function App() {
  const [zoom, setZoom] = useState<number>(50)

  function handleZoomControllerOnChange(value: number) {
    setZoom(value)
  }

  return (
    <div className="App">
      <div className="logoContainer">
        <h1>React Zoom Controller</h1>
        <img src={logo} style={{ transform: `scale(${zoom}%)`, transformOrigin: 'center' }} />
      </div>
      <div className="controllersSection">
        <ZoomController
          value={zoom}
          onChange={handleZoomControllerOnChange}
        />
        <ZoomController
          value={zoom}
          onChange={handleZoomControllerOnChange}
          sliderWidth={100}
          sliderStyle={{
            trackColor: 'lightgreen',
            valueTrackColor: 'darkgreen',
            thumbColor: 'darkgreen',
            tooltipColor: 'green',
            tooltipTextColor: 'white'
          }}
          selectBoxStyle={{
            borderColor: 'darkgreen',
            textColor: 'white',
            backgroundColor: 'green',
            downArrowColor: 'white',
            optionBackgroundColor: 'teal',
            optionTextColor: 'white'
          }}
        />
        <ZoomController
          value={zoom}
          onChange={handleZoomControllerOnChange}
          sliderWidth={200}
          sliderStyle={{
            trackColor: 'magenta',
            valueTrackColor: 'blue',
            thumbColor: 'blue',
            tooltipColor: 'royalblue',
            tooltipTextColor: 'white'
          }}
          selectBoxStyle={{
            borderColor: 'magenta',
            textColor: 'purple',
            optionBackgroundColor: 'magenta',
            optionTextColor: 'white'
          }}
        />
        <ZoomController
          value={zoom}
          onChange={handleZoomControllerOnChange}
          sliderStepSize={10}
          sliderWidth={300}
          sliderStyle={{
            trackColor: 'orange',
            valueTrackColor: 'red',
            thumbColor: 'red',
            tooltipColor: 'orange',
            tooltipTextColor: 'darkred'
          }}
          selectBoxStyle={{
            borderColor: 'red',
            textColor: 'darkred',
            backgroundColor: 'orange',
            downArrowColor: 'darkred',
            optionBackgroundColor: 'red',
            optionTextColor: 'white'
          }}
        />
        <ZoomController
          value={zoom}
          onChange={handleZoomControllerOnChange}
          sliderWidth={250}
          sliderStepSize={25}
          sliderStyle={{
            trackColor: 'lightblue',
            valueTrackColor: 'teal',
            thumbColor: 'teal',
            tooltipColor: 'lightblue',
            tooltipTextColor: 'teal'
          }}
          selectBoxStyle={{
            borderColor: 'teal',
            textColor: 'teal',
            backgroundColor: 'lightblue',
            downArrowColor: 'teal',
            optionBackgroundColor: 'teal',
            optionTextColor: 'white'
          }}
        />
      </div>
    </div>
  );
}

export default App;
