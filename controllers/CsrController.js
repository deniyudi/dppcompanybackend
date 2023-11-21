import CSR from "../models/CsrModel";
import path from "path";
import fs from "fs"; // file system bawaan node

export const getCSR = async (req, res) => {
    try {
      const response = await CSR.findAll();
      res.json(response);
    } catch (error) {
      console.log(error.message);
    }
};

export const getCsrById = async (req, res) => {
    try {
      const response = await CSR.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.json(response);
    } catch (error) {
      console.log(error.message);
    }
  };

export const createCSR = async (req, res) => {
    // file gambar
    if (req.files === null)
      return res.status(400), json({ msg: "No File Upload" });
    const name = req.body.judul;
    const desc = req.body.desc;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowType = [".png", ".jpg", ".jpeg", ".svg"];
  
    if (!allowType.includes(ext.toLocaleLowerCase()))
      return res.status(422).json({ msg: "Invalid images" });
    if (fileSize > 10000000)
      return res.status(422).json({ msg: "Gambar harus kurang dari 10 MB" });

  
    file.mv(`./public/images/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
      try {
        await CSR.create({ judul: name, img: fileName, url: url, desc: desc });
        res.status(201).json({ msg: "CSR Berhasil di Simpan" });
      } catch (error) {
        console.log(err.message);
      }
    });

  };