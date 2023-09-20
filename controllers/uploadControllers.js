const { StatusCodes } = require("http-status-codes")
const { BadRequestError } = require("../errors")
const cloudinary = require("cloudinary").v2
const fs = require("fs")

// upload sur un cloud
const uploadImage = async (req, res) => {
  // vérifie si le fichier existe
  if (!req.files) {
    throw new BadRequestError("Pas de fichier uploadé")
  }

  // upload l'image
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  )
  // supprimer les fichier temp
  fs.unlinkSync(req.files.image.tempFilePath)

  res.status(StatusCodes.OK).json({ image: { src: result.secure_url } })
}

module.exports = uploadImage
