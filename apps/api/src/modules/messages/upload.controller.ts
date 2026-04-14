import type { Request, Response } from "express";
import supabase from "../../configs/supabase.js";
import { v4 as uuid } from "uuid";

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file" });
    }

    const isImage = file.mimetype.startsWith("image/");
    const isPdf = file.mimetype === "application/pdf";

    if (!isImage && !isPdf) {
      return res.status(400).json({ error: "Only image or pdf allowed" });
    }

    const ext = file.originalname.split(".").pop();
    const fileName = `${uuid()}.${ext}`;

    const folder = isImage ? "images" : "pdfs";
    const path = `${folder}/${fileName}`;

    const { error } = await supabase.storage
      .from(process.env.BUCKET_NAME!)
      .upload(path, file.buffer, {
        contentType: file.mimetype
      });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const { data } = supabase.storage
      .from(process.env.BUCKET_NAME!)
      .getPublicUrl(path);

    return res.json({
      url: data.publicUrl,
      type: isImage ? "image" : "pdf"
    });

  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};