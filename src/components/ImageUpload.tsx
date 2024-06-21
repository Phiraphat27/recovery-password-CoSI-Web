import React, { useState, useCallback, use, useEffect } from 'react';
import { Accept, useDropzone } from 'react-dropzone';

interface ImageUploadProps {
    onImageUpload: (imageFile: File | null, imageSrc: string | null) => void;
    image?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, image }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (image) {
            setImageSrc(image);
        }
    }, [imageSrc, imageFile, onImageUpload]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const result = reader.result as string;
            setImageSrc(result);
            onImageUpload(file, result);
        };

        if (file) {
            reader.readAsDataURL(file);
            setImageFile(file);
        } else {
            onImageUpload(null, null);
        }
    }, [onImageUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*' as unknown as Accept,
        maxFiles: 1,
    });

    return (
        <div className="flex flex-col items-center">
            <div {...getRootProps()} className="w-[220px] h-[340px] mobile-lg:w-[264px] mobile-lg:h-[510px] lg:w-[380px] lg:h-[680px] my-10 lg:my-0 border-2 border-dashed border-gray-400 rounded-[10px] flex justify-center items-center cursor-pointer">
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the image here ...</p>
                ) : imageSrc ? (
                    <img className="pointer-events-none object-cover object-center w-full h-full rounded-[10px]" src={imageSrc} alt="profile" />
                ) : (
                    <div className='flex flex-col'>
                        <p>Drag & drop an image here, or click to select one</p>
                        <div className="leading-4 flex flex-col items-center">
                            <h1 className="mt-1 text-sm">size recommended 438x680px</h1>
                            <h1 className="mt-[-1px] text-xs">(jpg,png,webp only and Maximum size 2 MB)</h1>
                        </div>
                    </div>
                )}
            </div>
            {/* {imageFile && (
                <div className="mt-4">
                    <p>Selected file: {imageFile.name}</p>
                </div>
            )} */}
        </div>
    );
};

export default ImageUpload;
