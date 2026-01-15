const banned = [
  "взлом",
  "hack",
  "террор",
  "оружие",
  "убийств",
  "наркот"
];

export function moderate(req, res, next) {
  const text = (req.body.prompt || "").toLowerCase();

  if (banned.some(word => text.includes(word))) {
    return res.status(403).json({
      error: "Запрос запрещён"
    });
  }

  next();
}
