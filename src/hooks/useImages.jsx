import { useEffect, useState } from "react";

export const useImages = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      const imageFiles = import.meta.glob("/public/*");
      const imagePaths = Object.keys(imageFiles);
      const imagesArray = imagePaths.map((img) => {
        return img;
      });
      setImages(imagesArray);
    };
    getImages();
  }, []);

  return images;
};
