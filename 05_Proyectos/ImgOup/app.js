import fse from "fs-extra";
import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminSvgo from "imagemin-svgo";
import imageminPngquant from "imagemin-pngquant";
import imageminWebp from "imagemin-webp";
import imageminGifsicle from "imagemin-gifsicle";
import sharp from "sharp";

let inputFolder = "src",
ouputFolder = "opt",
targetWidth = 1920;


const processImg = async () =>{
    try{
        const files = await fse.readdir(inputFolder);

        for(const file of files){
            let inputPath = `${inputFolder}/${file}`;
            let outputPath = `${ouputFolder}/${file}`;

            await sharp(inputPath).resize(targetWidth).toFile(outputPath);

            await imagemin([outputPath],{
                destination: ouputFolder,
                plugins:[
                    imageminJpegtran({ quality: 80 }), // Comprimir imagen JPG con calidad del 80%
                    imageminPngquant(), // Comprimir imagen PNG
                    imageminSvgo(), // Comprimir imagen SVG
                    imageminWebp({ quality: 80 }), // Comprimir imagen WebP con calidad del 80%
                    imageminGifsicle(), // Comprimir imagen GIF
                ],
            });

            console.log(`Se optimizado la imaga ${file}`);
        }

        console.log(`Se ha terminado todas las imagenes`);
    }catch(err){
        console.log(err);
    }
};

processImg();