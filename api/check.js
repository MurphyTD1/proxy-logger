export default function handler(req, res) {
    const proxyIp = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0] : req.socket.remoteAddress;
    const country = req.headers['x-vercel-ip-country'] || "Bilinmiyor";
    
    const hasVia = req.headers['via'] ? true : false;
    const hasProxyConnection = req.headers['proxy-connection'] ? true : false;
    const xffCount = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',').length : 1;

    let anonymity = "Elite";
    if (xffCount > 1 || req.headers['client-ip']) {
        anonymity = "Transparent";
    } else if (hasVia || hasProxyConnection) {
        anonymity = "Anonymous";
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        durum: "Basarili",
        proxy_ip: proxyIp,
        ulke: country,
        anonimlik: anonymity,
        zaman: new Date().toISOString()
    });
}
