import Data from "../models/Models.js";
import path from "path";
import fs from "fs"; // file system bawaan node

// Ambil data
export const getData = async (req, res) => {
  try {
    const { category } = req.query;

    let queryOptions = {};

    if (category) {
      queryOptions = {
        where: {
          category: category,
        },
      };
    }

    const response = await Data.findAll(queryOptions);
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

// Ambil data lewat Id

export const getDataById = async (req, res) => {
  try {
    const response = await Data.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

//   Tambah data

export const createData = async (req, res) => {
  // file gambar
  if (req.files === null)
    return res.status(400), json({ msg: "No File Upload" });
  const name = req.body.judul;
  const desc = req.body.desc;
  const category = req.body.category;
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
      await Data.create({
        judul: name,
        img: fileName,
        url: url,
        desc: desc,
        category: category,
      });
      res.status(201).json({ msg: "Berita Berhasil di Simpan" });
    } catch (error) {
      console.log(err.message);
    }
  });
};

//   Edit data

export const updateData = async (req, res) => {
  const data = await Data.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!data) return res.status(404).json({ msg: "Data tidak ada" }); //cek berita ada apa gak

  // update berita
  let fileName = "";
  if (req.files === null) {
    fileName = data.img;
  } //jika files nya kosong brarti cuman ganti title  aja
  else {
    // const desc = req.body.desc;
    // const category = req.body.category;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const allowType = [".png", ".jpg", ".jpeg", ".svg"];
    const fileName = file.md5 + ext;
    if (!allowType.includes(ext.toLocaleLowerCase()))
      return res.status(422).json({ msg: "Invalid images" });
    if (fileSize > 10000000)
      return res.status(422).json({ msg: "Gambar harus kurang dari 10 MB" });

    // hapus file lama
    const filepatch = `./public/images/${data.img}`; //img = field db
    fs.unlinkSync(filepatch); // menghapus file

    // ganti file baru
    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const name = req.body.judul;
  const desc = req.body.desc;
  const category = req.body.category;
  const file = req.files.file;
  const ext = path.extname(file.name);
  const fileNameu = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileNameu}`;

  try {
    await Data.update(
      { judul: name, img: fileNameu, url: url, desc: desc, category: category },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Data berhasil di update" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteData = async (req, res) => {
    const data = await Data.findOne({
      where: {
        id: req.params.id,
      },
    });
  
    if (!data) return res.status(404).json({ msg: "Data tidak ada" });
  
    try {
      const filepatch = `./public/images/${data.img}`; //img = field db
      fs.unlinkSync(filepatch); // menghapus file
      await Data.destroy({
        where: {
          id: req.params.id,
        },
      }); // menghapus di db
      res.status(200).json({ msg: "Berhasil di hapus dek!!" });
    } catch (error) {
      console.log(error.message);
    }
  
  };
