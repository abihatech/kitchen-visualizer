import CabinetVisualizer from './components/CabinetVisualizer';
import { VisualizerProvider } from './context/VisualizerContext';


function App() {

  return (
    <VisualizerProvider>
      <CabinetVisualizer />
    </VisualizerProvider>
  )
}

export default App
