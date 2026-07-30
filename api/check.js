export default function handler(req, res) {
    // Sitemize bağlanan proxy'nin IP adresini yakalıyoruz
    const ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0] : req.socket.remoteAddress;
    
    // Tarayıcı veya istemci bilgilerini alıyoruz
    const userAgent = req.headers['user-agent'] || "Bilinmiyor";

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        durum: "Basarili",
        proxy_ip: ip,
        istemci: userAgent,
        zaman: new Date().toISOString()
    });
}
