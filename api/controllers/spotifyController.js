exports.login = (req, res, next) => {
    res.status(200).json({ message: 'Login Route' });
};

exports.status = (req, res, next) => {
    res.status(200).json({ message: 'Status Route' });
};

exports.search = (req, res, next) => {
    res.status(200).json({ message: 'Search Route' });
};
