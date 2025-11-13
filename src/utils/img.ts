export function img(url: string) {
    return import.meta.env.VITE_IMAGE_ENDPOINT + url
}