import React, { useState, useRef } from 'react';
import PlusIcon from '@assets/images/service/plus.svg';
import RemoveIcon from '@assets/images/service/remove.svg';
import { Backdrop, Box, Button, Fade, Modal, Typography } from '@mui/material';
import CustomButton from '@components/Button';
import './imageupload.scss';

interface ImageUploadProps {}

const ImageUpload: React.FC<ImageUploadProps> = () => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const openImageModal = (index: number) => {
        setSelectedImageIndex(index);
        setShowImageModal(true);
    };

    const closeImageModal = () => {
        setSelectedImageIndex(null);
        setShowImageModal(false);
    };

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newImages: File[] = Array.from(event.target.files);
            setSelectedImages((prevImages) => [...prevImages, ...newImages]);
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageRemove = (index: number) => {
        setSelectedImages((prevImages) => {
            const newImages = [...prevImages];
            newImages.splice(index, 1);
            return newImages;
        });
    };

    return (
        <Box className="images-upload">
            {/* <Box className="images-upload__button">
                <input type="file" accept="image/*" multiple onChange={handleImageSelect} style={{ display: 'none' }} ref={fileInputRef} />
                <CustomButton text="" icon={PlusIcon} backgroundColor="transparent" backgroundColorHover="transparent" boxShadow="none" onClick={handleButtonClick} className="btn-upload" />


            </Box> */}
            <Box className="images-upload__images">
                <Box className="images-upload__button">
                    <input type="file" accept="image/*" multiple onChange={handleImageSelect} style={{ display: 'none' }} ref={fileInputRef} />
                    <CustomButton text="" icon={PlusIcon} backgroundColor="transparent" backgroundColorHover="transparent" boxShadow="none" onClick={handleButtonClick} className="btn-upload" />

                    {/* <button onClick={handleButtonClick}>Thêm hình ảnh</button> */}
                </Box>
                {selectedImages.map((image, index) => (
                    <Box className="images-upload__image" key={index}>
                        <img src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} onClick={() => openImageModal(index)} />
                        <CustomButton
                            text=""
                            icon={RemoveIcon}
                            backgroundColor="transparent"
                            backgroundColorHover="transparent"
                            boxShadow="none"
                            onClick={() => handleImageRemove(index)}
                            className="btn-remove"
                        />
                    </Box>
                ))}
            </Box>

            {showImageModal && selectedImageIndex !== null && (
                <Modal open={showImageModal} onClose={closeImageModal} className="modal-image-detail ">
                    <Box className="image-modal">
                        <img src={URL.createObjectURL(selectedImages[selectedImageIndex])} alt={`Image ${selectedImageIndex + 1}`} />
                        {/* <Button variant="contained" onClick={closeImageModal}>
                            Đóng
                        </Button> */}
                    </Box>
                </Modal>
            )}
        </Box>
    );
};

export default ImageUpload;
