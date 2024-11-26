

const findAll = async (req, res) => {
    try {
        res.render('connexion');
        // res.status(200).send(result);
    } catch (error) {
        console.log("erreur lors de la récupération des données : ", error);
    }
};

module.exports = {findAll}