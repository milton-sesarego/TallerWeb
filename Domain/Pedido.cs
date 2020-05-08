using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Pedido
    {
        public int IDCliente { get; set; }
        public int IDProducto { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string NombreProducto { get; set; }
        public string Descripcion { get; set; }
        public int Cantidad { get; set; }
        public decimal PrecioTotal { get; set; }
        public Pedido() { }
        public Pedido(int pIDCliente,int pIDProducto, string pNombre, string pApellido,
            string pNombreProducto, string pDescripcion, int pCantidad, decimal pPrecioTotal)
        {
            this.IDCliente = pIDCliente;
            this.IDProducto = pIDProducto;
            this.Nombre = pNombre;
            this.Apellido = pApellido;
            this.NombreProducto = pNombreProducto;
            this.Descripcion = pDescripcion;
            this.Cantidad = pCantidad;
            this.PrecioTotal = pPrecioTotal;
            
        }
    }
}
