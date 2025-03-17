import { useState } from "react";
import { Order } from "../../interfaces/orders";


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
          <tr className="  text-white rounded-t-lg">
            <th className="p-2 text-left bg-opacity-90 bg-primary rounded-tl-xl">ID do Pedido</th>
            <th className="p-2 text-left bg-primary">ID na Loja</th>
            <th className="p-2 text-left bg-opacity-90 bg-primary">Criação</th>
            <th className="p-2 text-left bg-primary">Nome do Cliente</th>
            <th className="p-2 text-lef bg-opacity-90 bg-primary">CPF/CNPJ do Cliente</th>
            <th className="p-2 text-left bg-primary">Status do pedido</th>
            <th className="p-2 text-left  bg-opacity-90 bg-primary">Status do pagamento</th>
            <th className="p-2 text-left bg-primary">Método de Pagamento</th>
            <th className="p-2 text-left bg-opacity-90 bg-primary rounded-tr-xl">Total</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map((order) => (
            <tr key={order._id} className="border-t">
              <td className="p-2">{order._id}</td>
              <td className="p-2">{order.order_seller_id}</td> {/* Corrected field */}
              <td className="p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="p-2">{order.customer.name}</td>
              <td className="p-2">{order.customer.doc}</td> {/* Added customer doc */}
              <td className="p-2">{order.status}</td>
              <td className="p-2">{order.payment.status}</td> {/* Corrected field */}
              <td className="p-2">{order.payment.method}</td>
              <td className="p-2">R$ {order.payment.amount.toFixed(2)}</td>
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

    