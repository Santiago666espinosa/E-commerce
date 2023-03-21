const { Bill, User } = require("../../db");

module.exports = putBill = async (req, res, next) => {
  try {
    const { status, paid, idUsario } = req.body;
    if(idUsario && paid) {
      const user = await User.findAll({
        where: { id: idUsario },
        include: Bill ,
      });
      const bill = user[0].bills[user[0].bills.length - 1]
      bill.update({
        status,
        paid })
        /* mailer */
        //////////////////////////////////////////////////////////
        // let billInfo = await Bill.findByPk(id);
        // let userInfo = await User.findByPk(billInfo.userId);
        // req.body.mail = userInfo.mail;
        // req.body.roll = userInfo.roll;
        // req.body.billId = billInfo.billId;
        // req.body.products = billInfo.products;
        // req.body.value = billInfo.value;
        // req.body.discount = billInfo.discount;
        // req.body.mailType = "pay";
        ////////////////////////////////////////////////////////////
        return res.status(200).json({ message: "Updated information" }), next();
    } else {
      return res.status(400).json({ message: "Requires id" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
