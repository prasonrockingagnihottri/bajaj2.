const express = require('express')
const multer = require('multer')
const router = express.Router()

router.post("/bfhl/", (req, res) => {
    const { data, file_b64 } = req.body;
    if (!data) {
        return res.status(400).json({
            is_success: false,
            message: "data is missing"
        })
    }
    const numbers = []
    const alphabets = []
    for (let x of data) {
        if (!isNaN(x)) {
            numbers.push(x);
        }
        else if ((x >= 'a' && x <= 'z') || (x >= 'A' && x <= 'Z')) {
            alphabets.push(x);
        }
    }

    const highestAlphabet = alphabets.length > 0 ? [alphabets.sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()))[0]] : [];

    // Handle file processing from base64 string
    let fileValid = false;
    let fileMimeType = null;
    let fileSizeKb = null;

    if (file_b64) {
        try {
            const base64Data = file_b64.split(';base64,').pop();
            const buffer = Buffer.from(base64Data, 'base64');
            const mimeType = mime.getType(file_b64);
            fileMimeType = mimeType;
            fileSizeKb = (buffer.length / 1024).toFixed(2);
            fileValid = true;
        } catch (error) {
            fileValid = false;
        }
    }
    const response = {
        is_success: true,
        "user_id": "prasun_agnihotri_20102003",
        "email": "pa0998@srmist.edu.in",
        "roll_number": "Ra2111043010093",
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_alphabet": highestAlphabet,
        "file_valid": fileValid,
        "file_mime_type": fileMimeType,
        "file_size_kb": fileSizeKb

    }

    return res.status(200).json(response);
})

router.get("/bfhl/", (req, res) => {
    const response = {
        "operation_code": 1
    }
    return res.status(200).json(response)
})

module.exports = router;