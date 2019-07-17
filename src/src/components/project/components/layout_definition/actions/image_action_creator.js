import { ImagesTypes } from '../types';

export function addImage(image) {
    return { type: ImagesTypes.ADD, image }
}
export function deleteImage(imageIndex) {
    return { type: ImagesTypes.DELETE, imageIndex }
}
export function selectImage(imageIndex) {
    return { type: ImagesTypes.SELECT, imageIndex }
}
export function resetImage() {
    return { type: ImagesTypes.RESET }
}
export default {
    addImage,
    deleteImage,
    selectImage,
    resetImage,
}