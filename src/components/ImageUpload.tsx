import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

const ImageUpload = ({ onImageUpload }: ImageUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
        ${isDragActive 
          ? 'border-recipe-sage bg-recipe-sage/5' 
          : 'border-gray-200 hover:border-recipe-sage hover:bg-gray-50'}`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-10 w-10 text-gray-400" />
      <p className="mt-4 text-base text-gray-600">
        {isDragActive ? 'Drop your image here' : 'Drag & drop an image, or click to select'}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Supported formats: JPEG, PNG
      </p>
    </div>
  );
};

export default ImageUpload;