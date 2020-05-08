using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;

namespace DataAccess
{
    public class PedidosDAL
    {
        public static List<Pedido> BuscarPorCliente(int idCliente)
        {
            List<Pedido> _lista = new List<Pedido>();

            SqlCommand _comando = new SqlCommand("GetPedidosPorCliente", BDComun.ObtenerConexion());
            _comando.CommandType = System.Data.CommandType.StoredProcedure;
            _comando.Parameters.AddWithValue("@IDCliente", idCliente);
            SqlDataReader _reader = _comando.ExecuteReader();
            while (_reader.Read())
            {
                Pedido pPedido = new Pedido();
                pPedido.IDCliente = _reader.GetInt32(0);
                pPedido.IDProducto = _reader.GetInt32(1);
                pPedido.Apellido = _reader.GetString(2);
                pPedido.Nombre = _reader.GetString(3);
                pPedido.NombreProducto = _reader.GetString(4);
                pPedido.Descripcion = _reader.GetString(5);
                pPedido.Cantidad = _reader.GetInt32(6);
                pPedido.PrecioTotal = _reader.GetDecimal(7);
                
                _lista.Add(pPedido);
            }
            return _lista;
        }
        public static int Agregar(Pedido pPedido)
        {
            int retorno = 0;
            SqlConnection conexion = BDComun.ObtenerConexion();

            SqlCommand _comando = new SqlCommand("InsertPedidos", conexion);
            _comando.CommandType = System.Data.CommandType.StoredProcedure;

            _comando.Parameters.AddWithValue("@IDCliente", pPedido.IDCliente);
            _comando.Parameters.AddWithValue("@IDProducto", pPedido.IDProducto);
            _comando.Parameters.AddWithValue("@Cantidad", pPedido.Cantidad);
            _comando.Parameters.AddWithValue("@PrecioTotal", pPedido.PrecioTotal);

            retorno = _comando.ExecuteNonQuery();
            conexion.Close();
            return retorno;
        }
    }
}
