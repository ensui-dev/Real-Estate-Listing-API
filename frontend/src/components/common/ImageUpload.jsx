import React, { useState, useRef } from 'react';
import { FaUpload, FaTrash, FaImage, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from '../../api/axios';

const ImageUpload = ({ images, onChange, maxImages = 10 }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    // Check total images limit
    if (images.length + files.length > maxImages) {
      toast.error(`Máximo de ${maxImages} imagens permitido`);
      return;
    }

    // Validate file types and sizes
    const validFiles = [];
    for (const file of files) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} não é uma imagem válida`);
        continue;
      }

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} excede o tamanho máximo de 5MB`);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    // Upload files
    await uploadFiles(validFiles);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadFiles = async (files) => {
    setUploading(true);

    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('images', file);
      });

      console.log('Uploading to:', axios.defaults.baseURL || 'default URL');
      console.log('Files to upload:', files.length);

      const response = await axios.post('/upload/property-images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress({ percent: percentCompleted });
        }
      });

      console.log('Upload successful, response:', response);

      // Axios interceptor already unwraps response.data
      // So 'response' is { success, message, data }
      // and 'response.data' is the array of images
      if (response.success) {
        const newImages = response.data.map((img, index) => ({
          url: img.url,
          key: img.key,
          caption: '',
          isPrimary: images.length === 0 && index === 0
        }));

        onChange([...images, ...newImages]);
        toast.success(`${files.length} imagem(ns) carregada(s) com sucesso!`);
      }
    } catch (error) {
      console.error('Upload error - Full error object:', error);
      console.error('Error message:', error.message);
      console.error('Error response:', error.response);
      console.error('Error request:', error.request);
      console.error('Error config:', error.config);

      // Show more detailed error in development
      const errorMessage = error.message || 'Erro ao carregar imagens';
      toast.error(errorMessage);
    } finally {
      setUploading(false);
      setUploadProgress({});
    }
  };

  const handleDelete = async (index) => {
    const imageToDelete = images[index];

    try {
      // If image has a key (uploaded to S3), delete it
      if (imageToDelete.key) {
        await axios.delete('/upload/delete-image', {
          data: { key: imageToDelete.key }
        });
      }

      // Remove from list
      const newImages = images.filter((_, i) => i !== index);

      // If we deleted the primary image and there are other images, make the first one primary
      if (imageToDelete.isPrimary && newImages.length > 0) {
        newImages[0].isPrimary = true;
      }

      onChange(newImages);
      toast.success('Imagem removida');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Erro ao remover imagem');
    }
  };

  const setPrimary = (index) => {
    const newImages = images.map((img, i) => ({
      ...img,
      isPrimary: i === index
    }));
    onChange(newImages);
  };

  const updateCaption = (index, caption) => {
    const newImages = [...images];
    newImages[index].caption = caption;
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
          disabled={uploading || images.length >= maxImages}
        />
        <label
          htmlFor="image-upload"
          className={`btn-secondary inline-flex items-center cursor-pointer ${
            uploading || images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {uploading ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Carregando... {uploadProgress.percent}%
            </>
          ) : (
            <>
              <FaUpload className="mr-2" />
              Selecionar Imagens ({images.length}/{maxImages})
            </>
          )}
        </label>
        <p className="text-sm text-gray-600 mt-2">
          Formatos aceitos: JPG, PNG, WebP, GIF. Tamanho máximo: 5MB por imagem.
        </p>
      </div>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative border rounded-lg overflow-hidden ${
                image.isPrimary ? 'border-primary-600 border-2' : 'border-gray-300'
              }`}
            >
              {/* Image Preview */}
              <div className="aspect-video bg-gray-100 relative">
                {image.url ? (
                  <img
                    src={image.url}
                    alt={image.caption || `Imagem ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <FaImage className="text-gray-400 text-4xl" />
                  </div>
                )}

                {/* Primary Badge */}
                {image.isPrimary && (
                  <div className="absolute top-2 left-2">
                    <span className="badge bg-primary-600 text-white">Principal</span>
                  </div>
                )}

                {/* Actions */}
                <div className="absolute top-2 right-2 flex space-x-2">
                  {!image.isPrimary && (
                    <button
                      type="button"
                      onClick={() => setPrimary(index)}
                      className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors text-xs"
                      title="Definir como principal"
                    >
                      Principal
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-colors"
                    title="Remover"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>

              {/* Caption Input */}
              <div className="p-3 bg-white">
                <input
                  type="text"
                  value={image.caption}
                  onChange={(e) => updateCaption(index, e.target.value)}
                  onKeyDown={(e) => {
                    // Prevent Enter from submitting parent form
                    if (e.key === 'Enter') {
                      e.preventDefault();
                    }
                  }}
                  placeholder="Legenda da imagem (opcional)"
                  className="input-field text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <FaImage className="text-gray-400 text-5xl mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Nenhuma imagem carregada</p>
          <label
            htmlFor="image-upload"
            className="btn-primary inline-flex items-center cursor-pointer"
          >
            <FaUpload className="mr-2" />
            Carregar Primeira Imagem
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
