import React, { useState, useEffect, useContext } from "react";
// import CommonContext from '../../product/context/common/commonContext'
import { useDropzone } from "react-dropzone";

const Uploader = (props) => {
  const [reload, setReload] = useState(false);

  // const commonContext = useContext(CommonContext)
  // const { uploadImage, uploadedFiles, resetDropZone } = commonContext
  const formik = props.formik;

  const auctionAvatar = useDropzone({
    accept: props.accept,
    multiple: props.multiple,
    onDrop: (acceptedFiles) => {
      let arr = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      var formData = new FormData();
      formData.append("folder", props.folder);
      arr.forEach((value, key) => {
        formData.append("file_upload", value);
      });
      // uploadImage(formData, props.name)
    },
  });

  // useEffect(() => {
  //     if (props.name === uploadedFiles.from && uploadedFiles.files.length) {
  //         console.log('uploadedFiles', uploadedFiles)
  //         if (props.multiple) {
  //             let uploadedImage = []
  //             uploadedFiles.files &&
  //                 uploadedFiles.files.map((uploaded) => {
  //                     uploadedImage.push(uploaded.file_name)
  //                 })
  //             formik.setFieldValue(props.name, [...formik.values[props.name], ...uploadedImage])
  //         } else {
  //             uploadedFiles.files &&
  //                 uploadedFiles.files.map((uploaded) =>
  //                     formik.setFieldValue(props.name, [uploaded.file_name]),
  //                 )
  //         }
  //         setReload(!reload)
  //         resetDropZone(uploadedFiles.from)
  //     }
  // }, [uploadedFiles])

  const getFileExtension = (file) => {
    let fileExtent = /[.]/.exec(file) ? /[^.]+$/.exec(file) : undefined;
    return fileExtent[0];
  };

  const removeFile = (file, from) => {
    if (props.name === from) {
      let allFiles = formik.values[props.name].filter(
        (fileUploaded) => fileUploaded !== file
      );
      formik.setFieldValue(props.name, allFiles);
      setReload(!reload);
    }
  };

  const viewFile = (file, from) => {
    if (props.name === from) {
      const newWindow = window.open(
        `${global.site_url}/uploads/${props.folder}/${file}`,
        "_blank",
        "noopener,noreferrer"
      );
      if (newWindow) newWindow.opener = null;
    }
  };

  return (
    <>
      <div>
        <section>
          <div {...auctionAvatar.getRootProps({ className: "dropzone" })}>
            <input {...auctionAvatar.getInputProps()} />
            <span className="material-icons">{props.icon}</span>
            <h4>{props.titleText}</h4>
            <h6>{props.innerText}</h6>
          </div>
          <p className="validationError text-left">
            {formik.touched[props.name] &&
              formik.errors[props.name] &&
              formik.errors[props.name]}
          </p>
          <aside className="thumbsContainer">
            <>
              {formik.values[props.name] && formik.values[props.name].length ? (
                <>
                  {formik.values[props.name].map((file, index) => (
                    <div className="thumb" key={index}>
                      <div className="thumbInner">
                        {getFileExtension(file) === "png" ||
                        getFileExtension(file) === "jpg" ||
                        getFileExtension(file) === "jpeg" ? (
                          <div className="thumbCnt">
                            <img
                              src={`${global.site_url}/uploads/${props.folder}/${file}`}
                              className="img"
                            />
                            <div className="fileActions">
                              <span
                                onClick={() => removeFile(file, props.name)}
                                className="cancelBtn material-icons"
                              >
                                delete
                              </span>
                              <span
                                onClick={() => viewFile(file, props.name)}
                                className="viewBtn material-icons"
                              >
                                visibility
                              </span>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="thumbCnt">
                              <div className="defaultThumb">
                                <span className="material-icons">
                                  {getFileExtension(file) === "pdf"
                                    ? "picture_as_pdf"
                                    : getFileExtension(file) === "doc" ||
                                      getFileExtension(file) === "docx"
                                    ? "description"
                                    : getFileExtension(file) === "mp4" ||
                                      getFileExtension(file) === "mpeg"
                                    ? "movie"
                                    : "description"}
                                </span>
                              </div>
                              <div className="fileActions">
                                <span
                                  onClick={() => removeFile(file, props.name)}
                                  className="cancelBtn material-icons"
                                >
                                  delete
                                </span>
                                <span
                                  onClick={() => viewFile(file, props.name)}
                                  className="viewBtn material-icons"
                                >
                                  visibility
                                </span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              ) : null}
            </>
          </aside>
        </section>
      </div>
    </>
  );
};

export default Uploader;
