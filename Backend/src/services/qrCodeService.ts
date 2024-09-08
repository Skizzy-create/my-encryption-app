import QRCode from "qrcode";

const generateQRCodeText = async (encryptedMessage: string, algo: string): Promise<string> => {
    const data = encryptedMessage + ' ' + algo;
    console.log('data =', data);
    const qrCode = await QRCode.toDataURL(data, {
        errorCorrectionLevel: 'M'
    });
    return qrCode;
};

// const generateQrCodeImg = async (qrData: string) => {
//     const qrCodeImg: string = await QRCode.toString(qrData, {
//         type: 'svg'
//     });
//     return qrCodeImg;
// };

export {
    generateQRCodeText,
    // generateQrCodeImg
};

