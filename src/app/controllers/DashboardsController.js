import Order from "../models/Order"; // Importando o modelo Order

class DashboardsController {
  constructor() {
    this.index = this.index.bind(this);
  }

  /**
   * Obtém os dados do dashboard para o usuário autenticado.
   */
  async index(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    // Captura os filtros de data
    const { start_date, end_date } = req.query;

    // Formata os filtros de data (se existirem)
    let dateFilter = {};
    if (start_date || end_date) {
      dateFilter.createdAt = {};
      if (start_date) dateFilter.createdAt.$gte = new Date(start_date);
      if (end_date) dateFilter.createdAt.$lte = new Date(end_date);
    }

    try {
      const { userId } = req; 

      // Filtra os pedidos do usuário e pelo período
      const matchFilter = { user_id: userId, ...dateFilter };

      // Estatísticas agregadas com filtro de período
      const statistics = await Order.aggregate([
        { $match: matchFilter },
        {
          $group: {
            _id: null,
            orders_total: { $sum: "$payment.amount" },
            orders_count: { $sum: 1 },
            sales_total: { 
              $sum: { $cond: [{ $eq: ["$status", "paid"] }, "$payment.amount", 0] } 
            },
            sales_count: { 
              $sum: { $cond: [{ $eq: ["$status", "paid"] }, 1, 0] }
            },
          },
        },
        {
          $project: {
            _id: 0,
            orders_total: { $round: ["$orders_total", 2] },
            orders_count: 1,
            sales_total: { $round: ["$sales_total", 2] },
            sales_count: 1,
            average_ticket: {
              $cond: [
                { $eq: ["$sales_count", 0] },
                0,
                { $round: [{ $divide: ["$sales_total", "$sales_count"] }, 2] },
              ], 
            },
          },
        },
      ]).allowDiskUse(true);

      // Lista de pedidos com filtro de período e paginação
      const orders = await Order.find(matchFilter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

      const totalOrdersCount = await Order.countDocuments(matchFilter);

      res.json({
        ...statistics[0] || { 
          orders_count: 0, 
          orders_total: 0, 
          sales_count: 0, 
          sales_total: 0, 
          average_ticket: 0,
        },
        orders,
        has_more: page * limit < totalOrdersCount,
          limit,
          total_pages: Math.ceil(totalOrdersCount / limit),
          page,
          total: totalOrdersCount
      });

    } catch (error) {
      console.error("Erro no Dashboard:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export default new DashboardsController();
