import axios from 'axios';
import { useEffect, useState } from 'react';
import FileTestPresenter from './FileTestPresenter';

function FileTestContainer() {
  const [imageFiles, setImageFiles] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    // FormData 생성 및 변수 선언
    var formData = new FormData();
    let inputCategory = e.target.category.value;
    let inputImageFiles = e.target.imageFiles.files;
    // FormData에 Key:Value 넣기
    for (var i = 0; i < inputImageFiles.length; i++) {
      formData.append('imageFiles', inputImageFiles[i]);
    }
    formData.append('category', inputCategory);

    axios
      .post(process.env.REACT_APP_SPRING_API + '/api/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createImageFiles = (files) => {
    for (var i = 0; i < files.length; i++) {
      setImageFiles((prevImageFiles) => [...prevImageFiles, files[i]]);
    }
  };

  const getImagesSubmit = (e) => {
    e.preventDefault();
    let category = 'community';
    let memberId = 1;
    axios
      .get(
        process.env.REACT_APP_SPRING_API +
          `/api/images/${category}/${memberId}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        createImageFiles(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(imageFiles);
  }, [imageFiles]);

  return (
    <FileTestPresenter
      onSubmit={onSubmit}
      imageFiles={imageFiles}
      getImagesSubmit={getImagesSubmit}
    ></FileTestPresenter>
  );
}

export default FileTestContainer;
