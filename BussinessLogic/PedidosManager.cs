using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess;
using Domain;

namespace BusinessLogic
{
    public static class PedidosManager
    {
        public static Mensaje Guardar(Pedido pPedido)
        {
            return new Mensaje(PedidosDAL.Agregar(pPedido), "Mensaje de la Base de Datos");
        }
        public static List<Pedido> BuscarPorCliente(int idCliente)
        {
            return PedidosDAL.BuscarPorCliente(idCliente);
        }
    }
}
