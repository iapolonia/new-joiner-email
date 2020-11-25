import React from "react";

import { useStyletron } from "baseui";

import { FileUploader } from "baseui/file-uploader";
import { DeleteAlt } from "baseui/icon";

export default function ImageUploader({ value, onChange, name }) {
  return value ? (
    <UploadedImage
      value={URL.createObjectURL(value)}
      onDelete={() => onChange(null)}
    />
  ) : (
    <FileUploader
      multiple={false}
      name={name}
      accept="image/png, image/jpeg"
      onDrop={(acceptedFiles) => {
        if (acceptedFiles.length !== 1) return;

        onChange(acceptedFiles[0]);
      }}
    />
  );
}

function UploadedImage({ onDelete, value, alt }) {
  const [css, _theme] = useStyletron();

  return (
    <div className={css({ position: "relative" })}>
      <DeleteAlt
        size={36}
        className={css({ position: "absolute", right: 0, cursor: "pointer" })}
        onClick={() => {
          onDelete();
        }}
      />
      <img
        src={value}
        alt={alt}
        className={css({ width: "100%", height: "100%" })}
      />
    </div>
  );
}
