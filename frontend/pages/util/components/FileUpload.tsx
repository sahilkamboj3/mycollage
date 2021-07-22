import { Box, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import axios from "axios";
import { getUserUUID, prerenderAuthorizationCheck } from "../logic";
import { useRouter } from "next/router";

const FileUpload = ({ collageUUID }) => {
  let errorText = "File type not valid";
  const [isFileError, setIsFileError] = useState<boolean>(false);
  const [file, setFile] = useState(null);

  const imageTypes = ["png", "jpg", "jpeg"];

  const handleImageChange = (e) => {
    const fileName = e.target.files[0].name;
    const periodIdx = fileName.lastIndexOf(".");

    if (!imageTypes.includes(fileName.slice(periodIdx + 1).toLowerCase())) {
      setIsFileError(true);
      setFile(null);
      return;
    }
    setIsFileError(false);
    setFile(e.target.files[0]);
  };

  const submitImage = async () => {
    const formData = new FormData();
    formData.append("file", file, file.name);

    const userUUID: string = await getUserUUID();

    await axios
      .post(
        `http://localhost:8080/images/create/${userUUID}/${collageUUID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((data) => console.log(data));
    setFile(null);
  };

  return (
    <Box>
      <Button variant="contained" component="label">
        <input id="file-upload" type="file" onChange={handleImageChange} />
      </Button>
      {isFileError && (
        <Alert key={errorText} severity="error">
          {errorText}
        </Alert>
      )}
      {!isFileError && file !== null && (
        <Button onClick={submitImage} variant="contained" color="primary">
          Upload
        </Button>
      )}
      <br />
    </Box>
  );
};

export default FileUpload;
