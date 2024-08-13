
export default class Service {
  getRelativePath = (filePath) => {
    // console.log(filePath);
  
    const relativePath = filePath?.split("server")[1].replace(/\\/g, "/");
    const imageUrl = `http://localhost:3000${relativePath}`;
    return imageUrl;
  };
}