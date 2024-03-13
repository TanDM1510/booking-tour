import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import customFetch from "../utils";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [folderName, setFolderName] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFolderNameChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderName", folderName);

    try {
      const response = await customFetch.post("/files", formData);
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const getApi = async () => {
    const resp = await customFetch.get("/files?folderName=Tours");
    console.log(resp.data.data);
  };
  useEffect(() => {
    getApi();
  }, []);
  return (
    <div>
      <Input type="file" onChange={handleFileChange} />
      <Input
        type="text"
        placeholder="Folder Name"
        value={folderName}
        onChange={handleFolderNameChange}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadFile;
