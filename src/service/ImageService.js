
export default class Service {
  getRelativePath = (filePath) => {
    // console.log(filePath);

    const baseURL = import.meta.env.VITE_APP_URL || '';

    const relativePath = filePath?.split("server")[1].replace(/\\/g, "/");
    const imageUrl = baseURL + relativePath;
    return imageUrl;
  };
}