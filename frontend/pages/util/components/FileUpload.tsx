import { Box, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useState } from "react";

const FileUpload = () => {
  let errorText = "File type not valid";
  const [isFileError, setIsFileError] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const imageTypes = ["png", "jpg", "jpeg"];

  const handleImageChange = (e) => {
    const fileName = e.target.files[0].name;
    const periodIdx = fileName.lastIndexOf(".");
    if (!imageTypes.includes(fileName.slice(periodIdx + 1))) {
      setIsFileError(true);
      setUploadedFile(null);
      return;
    }
    setIsFileError(false);
    setUploadedFile(e.target.files[0]);
  };
  return (
    <Box>
      {/* Possible turn file upload logic into another component */}
      <Button variant="contained" component="label">
        <input id="file-upload" type="file" onChange={handleImageChange} />
      </Button>
      {isFileError && (
        <Alert key={errorText} severity="error">
          {errorText}
        </Alert>
      )}
      {!isFileError && uploadedFile !== null && (
        <Button variant="contained" color="primary">
          Upload
        </Button>
      )}
      <br />
    </Box>
  );
};

export default FileUpload;
