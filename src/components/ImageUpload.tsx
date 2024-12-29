import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Sun, Layout, Tag, X } from 'lucide-react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ImageUploadProps {
  onImageUpload: (files: File[]) => void;
  uploadedImages: string[];
  onRemoveImage: (index: number) => void;
}

const ImageUpload = ({ onImageUpload, uploadedImages, onRemoveImage }: ImageUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: true
  });

  const dropzoneProps = getRootProps();

  return (
    <div className="space-y-4">
      {uploadedImages.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {uploadedImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Uploaded ${index + 1}`}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <button
                onClick={() => onRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      <motion.div
        {...dropzoneProps}
        initial={false}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
          ${isDragActive 
            ? 'border-brand-myrtleGreen bg-brand-aquamarine/20' 
            : 'border-gray-200 hover:border-brand-myrtleGreen hover:bg-brand-platinum/50'}`}
      >
        <input {...getInputProps()} />
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <Upload className="mx-auto h-12 w-12 text-brand-myrtleGreen" />
          <p className="mt-4 text-lg font-medium text-brand-jet">
            {isDragActive ? 'Drop your images here' : 'Drag & drop images, or click to select'}
          </p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-center space-x-3 text-brand-jet/70">
              <Sun className="w-5 h-5 text-brand-myrtleGreen" />
              <p>Well-lit and clearly visible</p>
            </div>
            <div className="flex items-center justify-center space-x-3 text-brand-jet/70">
              <Layout className="w-5 h-5 text-brand-myrtleGreen" />
              <p>Arranged with minimal overlap</p>
            </div>
            <div className="flex items-center justify-center space-x-3 text-brand-jet/70">
              <Tag className="w-5 h-5 text-brand-myrtleGreen" />
              <p>Labels facing the camera when possible</p>
            </div>
          </div>
          <p className="text-sm text-brand-jet/50 mt-6">
            Supported formats: JPEG, PNG
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ImageUpload;