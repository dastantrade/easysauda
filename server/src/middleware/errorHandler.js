const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.code === 'P2002') {
    return res.status(409).json({ error: 'Запись уже существует' });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'Запись не найдена' });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Внутренняя ошибка сервера',
  });
};

module.exports = errorHandler;
