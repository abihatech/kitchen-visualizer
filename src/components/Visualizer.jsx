import { useState } from 'react';
import Mainmenu from './Mainmenu';
import Welcome from './Welcome';
import Space from './Space';
import Shape from './Shape';

const Visualizer = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [selectedSpace, setSelectedSpace] = useState('');
  const [selectedShape, setSelectedShape] = useState('');

  const handleShapeSelect = (shape) => {
    setSelectedShape(shape);
    alert(`Your preferences:\nSpace: ${selectedSpace}\nShape: ${shape}`);
  };

  return (
    
    <div className="font-sans">
      {currentStep === 'welcome' && <Welcome setCurrentStep={setCurrentStep} />}
      {currentStep === 'space' && <Space setCurrentStep={setCurrentStep} setSelectedSpace={setSelectedSpace} />}
      {currentStep === 'shape' && <Shape setCurrentStep={setCurrentStep} setSelectedShape={setSelectedShape} />}
      {currentStep === 'configurator' && <Mainmenu setCurrentStep={setCurrentStep} />}
    </div>
  );
};

export default Visualizer;