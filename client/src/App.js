import React from 'react';
import './App.css';

class FileUpload extends React.Component {
  render = () => {
    return (
      <div>
        This is File Upload.
        <Upload />
        <DisplayUpload />
      </div>
    )
  }
}

const Upload = (props) => (
  <div>
    This is the upload component.
  </div>
)

const DisplayUpload = (props) => (
  <div>
    This is the display area for the upload component.
  </div>
)

function App() {
  return (
    <FileUpload />
  );
}

export default App;
