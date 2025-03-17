import { Order } from "../../interfaces/orders";
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

interface DataTableProps {
  orders: Order[];
  page: number;
  total_pages: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
}

const DataTable = ({ orders, page, setPage, limit, setLimit, total_pages }: DataTableProps) => {
  

  return (
    <div className="bg-white shadow-md rounded-lg">
      <table className="w-full">
      <thead>
          <tr className="  text-white rounded-t-lg">
            <th className="p-2 text-left bg-opacity-90 bg-primary rounded-tl-xl">ID do Pedido</th>
            <th className="p-2 text-left bg-primary">ID na Loja</th>
            <th className="p-2 text-left bg-opacity-90 bg-primary">Criação</th>
            <th className="p-2 text-left bg-primary">Nome do Cliente</th>
            <th className="p-2 text-left bg-opacity-90 bg-primary">CPF/CNPJ do Cliente</th>
            <th className="p-2 text-left bg-primary">Status do pedido</th>
            <th className="p-2 text-left  bg-opacity-90 bg-primary">Status do pagamento</th>
            <th className="p-2 text-left bg-primary">Método de Pagamento</th>
            <th className="p-2 text-left bg-opacity-90 bg-primary rounded-tr-xl">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-t text-sm text-secondary">
              <td className="p-3">{order._id}</td>
              <td className="p-4">{order.order_seller_id}</td>
              <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="p-4">{order.customer.name}</td>
              <td className="p-4">{order.customer.doc}</td>
              <td className="p-4">{order.status}</td>
              <td className="p-4">{order.payment.status}</td>
              <td className="p-4">{order.payment.method}</td>
              <td className="p-4">R$ {order.payment.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="flex justify-between items-center mt-4 bg-gray-50 text-gray-400 rounded-b-lg p-4">
        <div className="flex gap-5 items-center">
          <button
          className="text-primary hover:bg-primary hover:text-white rounded-full p-2"
          disabled={page === 1}
          onClick={() => setPage(1)}> 
            <FiChevronsLeft size={20} /> 
          </button>
          <button
          className="text-primary hover:bg-primary hover:text-white rounded-full p-2"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}> 
            <FiChevronLeft size={20} /> 
          </button>

          {Array.from({ length: total_pages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              className={` hover:bg-primary hover:text-white rounded-full w-10 h-10 ${page === pageNumber ? 'bg-primary text-white' : 'bg-none text-secondary'}`}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}

          <button 
          className="text-primary hover:bg-primary hover:text-white rounded-full p-2"
          disabled={page === total_pages} 
          onClick={() => setPage(page + 1)}>
            <FiChevronRight size={20}/>
          </button>
          <button
          className="text-primary hover:bg-primary hover:text-white rounded-full p-2"
          disabled={page === 1}
          onClick={() => setPage(1)}> 
            <FiChevronsRight size={20} /> 
          </button>
        </div>

        <span> {page} de {total_pages} páginas</span>

        <div className="flex gap-2  items-center">
          <div>Linhas por página</div>
          <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="roudend-lg p-2 border bg-white">
            <option value="10">10 por página</option>
            <option value="100">100 por página</option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default DataTable;
