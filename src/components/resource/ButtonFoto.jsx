import React from "react";
import html2canvas from "html2canvas";
const ButtonFoto = ({ sectionRef, nombre, apellido, id, quincena }) => {
  const handleCapturePhoto = () => {
    if (sectionRef) {
      html2canvas(sectionRef).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = imgData;
        downloadLink.download = `${nombre}-${apellido}-${quincena}.png`;
        downloadLink.click();
      });
    }
  };
  return (
    <div className="">
      <button className="btns" onClick={handleCapturePhoto}>
        Descargar Foto
      </button>
    </div>
  );
};

export default ButtonFoto;
