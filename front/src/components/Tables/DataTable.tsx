import { useState } from "react";

interface Order {
  _id: string;
  customer: { name: string };
  createdAt: string;
  status: string;
  payment: { amount: number; method: string };
}

interface DataTableProps {
  orders: Order[];
}

const DataTable = ({ orders }: DataTableProps) => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  // Paginação dos pedidos
  const startIndex = (page - 1) * limit;
  const paginatedOrders = orders.slice(startIndex, startIndex + limit);
  const totalPages = Math.ceil(orders.length / limit);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold">Pedidos Recentes</span>
        <select
          className="border rounded p-2"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          <option value="5">5 por página</option>
          <option value="10">10 por página</option>
          <option value="20">20 por página</option>
        </select>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">Cliente</th>
            <th className="p-2 text-left">Data</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Valor</th>
            <th className="p-2 text-left">Pagamento</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map((order, index) => (
            <tr key={order._id} className="border-t">
              <td className="p-2">{startIndex + index + 1}</td>
              <td className="p-2">{order.customer.name}</td>
              <td className="p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="p-2">{order.status}</td>
              <td className="p-2">R$ {order.payment.amount.toFixed(2)}</td>
              <td className="p-2">{order.payment.method}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage(page - 1)}
        >
          Anterior
        </button>
        <span>Página {page} de {totalPages}</span>
        <button
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage(page + 1)}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default DataTable;
