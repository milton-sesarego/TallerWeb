using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess;
using Domain;

namespace BusinessLogic
{
    public static class ProductosManager
    {
        public static Mensaje Guardar(Producto pProducto)
        {
            return new Mensaje(ProductosDAL.Guardar(pProducto), "Mensaje de la Base de Datos");
        }
        public static List<Producto> Buscar()
        {
            return ProductosDAL.Buscar();
        }
        public static List<Producto> Buscar(string pNombre)
        {
            return ProductosDAL.Buscar(pNombre);
        }
        public static int Eliminar(int pID)
        {
            return ProductosDAL.Eliminar(pID);
        }
    }
}
