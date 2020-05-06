using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess;
using Domain;

namespace BusinessLogic
{
    public static class ClientesManager
    {
        public static Error Guardar(Cliente pCliente)
        {
            // Valida que el nro de documento no se repita
            List<Cliente> lista = new List<Cliente>();
            lista = ClientesDAL.Buscar(pCliente.Nro_Doc);
            if (lista.Count > 0)
            {
                // Si el cliente es nuevo y hay Nros de Documento repetidos
                if (pCliente.ID == 0)
                {
                    return new Error(0,"Nro de documento repetido");
                }
                else
                {
                    // Si el cliente existía y hay nros de documento repetidos 
                    // y el nro de documento repetido es diferente del cliente a modificar
                    if (lista[0].ID != pCliente.ID)
                    {
                        return new Error(0, "Nro de documento repetido");
                    }
                }
            }
            return new Error(ClientesDAL.Guardar(pCliente), "Mensaje de la Base de Datos");
        }
        public static List<Cliente> Buscar()
        {
            return ClientesDAL.Buscar();
        }
        public static List<Cliente> Buscar(string pNombre, string pApellido)
        {
            return ClientesDAL.Buscar(pNombre, pApellido);
        }
        public static int Eliminar(int pID)
        {
            return ClientesDAL.Eliminar(pID);
        }
    }
}
