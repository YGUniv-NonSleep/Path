import styled from 'styled-components';

const FileCon = styled.div`
  width: 390px;
  height: 100%;
  margin-left: 130px;
`;

function ImageDiv({ image }) {
  const storeFilePath =
    process.env.REACT_APP_SPRING_API + '/api/images/' + image.storeFileName;
  const uploadFilePath =
    process.env.REACT_APP_SPRING_API + '/api/attach/' + image.id;
  const uploadFileName = image.uploadFileName;
  return (
    <div>
      <img src={storeFilePath} width="300" height="300" />
      <br />
      첨부파일
      <a href={uploadFilePath}>{uploadFileName}</a>
    </div>
  );
}

function FileTestPresenter(props) {
  return (
    <FileCon>
      <div>
        <form onSubmit={props.onSubmit}>
          <ul>
            <li>
              카테고리 <input type="text" name="category" />
            </li>
            <li>
              이미지 파일들
              <input type="file" multiple="multiple" name="imageFiles" />
            </li>
          </ul>
          <input type="submit" />
        </form>
        <button onClick={props.getImagesSubmit}>이미지 불러오기</button>
        <div>
          {props.imageFiles.map((image, index) => (
            <ImageDiv image={image} key={index} />
          ))}
        </div>
      </div>
    </FileCon>
  );
}

export default FileTestPresenter;
