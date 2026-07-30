export default function handler(req, res) {
    const ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0] : req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'] || "Bilinmiyor";

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        durum: "Basarili",
        proxy_ip: ip,
        istemci: userAgent,
        zaman: new Date().toISOString()
    });
}
