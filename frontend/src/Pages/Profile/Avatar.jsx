import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { Input, Col, Row, Modal } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

const Avatar = () => {
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [display, setDisplay] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const editorRef = useRef();

  const redirectToProfileEdit = () => {
    navigate("/profile/edit");
  };

  const changeHandler = (e) => {
    if (!e.target.files[0]) return;
    setImage(e.target.files[0]);
    setOpenModal(true);
  };

  const handleSubmit = async () => {
    // Convertir la imagen editada a base64
    const url = editorRef.current.getImageScaledToCanvas().toDataURL();

    // Muestra la imagen en la página
    setDisplay(url);

    // Cierra el modal
    setOpenModal(false);

    // Convertir la imagen de base64 a Blob para enviarla al servidor
    const blob = await fetch(url).then(res => res.blob());

    // Crear un FormData para enviar el archivo
    const formData = new FormData();
    formData.append('avatar', blob, 'avatar.png');

    // Enviar la imagen al servidor usando Axios
    try {
      const response = await axios.post('http://localhost:8080/profile/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      console.log('Imagen subida con éxito:', response.data);
    } catch (error) {
      console.error('Error subiendo la imagen:', error);
    }
  };

  return (
    <>
      <div className="container py-5 h-100">
        <div className="card p-4">
          <div className="d-flex justify-content-center align-items-center">
            <div className="round-image">
              <div>
                <Row justify="center">
                  <Col>
                    <label className="btn btn-outline-warning btn-lg px-5 margin-top: 5px" htmlFor="fileInput">Choose File</label>
                    <Input
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      onChange={changeHandler}
                      hidden
                    />
                  </Col>
                </Row>
                <Row justify="center">
                  <Col>
                    {display && <img src={display} onClick={() => setOpenModal(true)} alt="Profile" />}
                  </Col>
                </Row>

                <Modal
                  title="Edit Profile Picture"
                  open={openModal}
                  onOk={handleSubmit}
                  onCancel={() => setOpenModal(false)}
                >
                  <Row justify="center">
                    <Col>
                      <AvatarEditor
                        ref={editorRef}
                        image={image}
                        width={200}
                        height={200}
                        borderRadius={100}
                        border={30}
                        scale={scale}
                        rotate={0}
                        color={[255, 255, 255, 0.6]}
                      />
                    </Col>
                  </Row>
                  <Row justify="center" align="middle">
                    <Col>
                      <PlusOutlined />
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="0.1"
                        value={scale}
                        onChange={(e) => setScale(e.target.value)}
                      />
                      <MinusOutlined />
                    </Col>
                  </Row>
                </Modal>
              </div>
            </div>
          </div>

          <div className="text-center">
            <MDBRow className="pt-0">
              <MDBCol size="6" className="mb-3">
                <button type="button" className="btn btn-warning" onClick={redirectToProfileEdit}> Go Back</button>
              </MDBCol>
              <MDBCol className="mb-3">
                <button type="button" className="btn btn-success" onClick={redirectToProfileEdit}> Save</button>
              </MDBCol>
            </MDBRow>
          </div>
        </div>
      </div>
    </>
  );
};

export default Avatar;
