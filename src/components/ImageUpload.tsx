import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { motion, HTMLMotionProps } from 'framer-motion';

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

  const { ref, ...rootProps } = getRootProps();

  const motionProps: HTMLMotionProps<"div"> = {
    ...rootProps,
    ref,
    className: `border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
      ${isDragActive 
        ? 'border-brand-myrtleGreen bg-brand-aquamarine/20' 
        : 'border-gray-200 hover:border-brand-myrtleGreen hover:bg-brand-platinum/50'}`,
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    animate: isDragActive ? {
      borderColor: ['#297373', '#85FFC7', '#297373'],
      transition: { duration: 2, repeat: Infinity }
    } : undefined
  };

  return (
    <motion.div {...motionProps}>
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
          {isDragActive ? 'Drop your image here' : 'Drag & drop an image, or click to select'}
        </p>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-center space-x-2 text-brand-jet/70">
            <span className="w-2 h-2 rounded-full bg-brand-myrtleGreen"></span>
            <p>Well-lit and clearly visible</p>
          </div>
          <div className="flex items-center justify-center space-x-2 text-brand-jet/70">
            <span className="w-2 h-2 rounded-full bg-brand-myrtleGreen"></span>
            <p>Arranged with minimal overlap</p>
          </div>
          <div className="flex items-center justify-center space-x-2 text-brand-jet/70">
            <span className="w-2 h-2 rounded-full bg-brand-myrtleGreen"></span>
            <p>Labels facing the camera when possible</p>
          </div>
        </div>
        <p className="text-sm text-brand-jet/50 mt-6">
          Supported formats: JPEG, PNG
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ImageUpload;