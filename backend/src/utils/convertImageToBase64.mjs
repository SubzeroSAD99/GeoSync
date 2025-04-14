import fs from "fs";
import path from "path";

const convertImageToBase64 = (imageName) => {
  const pathImage = path.join(
    import.meta.dirname,
    `../assets/images/${imageName}`
  ); // Altere o nome do arquivo se necessário

  fs.readFile(pathImage, (err, data) => {
    if (err) {
      console.error("Erro ao ler a imagem:", err);
      return;
    }

    const ext = path.extname(pathImage).replace(".", ""); // pega extensão ex: png, jpg
    const base64 = `data:image/${ext};base64,${data.toString("base64")}`;

    fs.writeFileSync(`${imageName}-base64.txt`, base64);

    console.log(`\nBase64 salva em ${imageName}-base64.txt`);
  });
};

convertImageToBase64("logo.jpg");
