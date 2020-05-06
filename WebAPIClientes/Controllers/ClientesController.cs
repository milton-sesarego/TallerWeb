using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using BusinessLogic;
using Domain;

namespace WebAPIClientes
{
    [EnableCors(origins: "https://localhost:44386", headers: "*", methods: "*")]
    public class ClientesController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<Cliente> Get()
        {
            return ClientesManager.Buscar();
        }

        // POST api/<controller>
        public Error Post([FromBody]Cliente cliente)
        {
            //Para revertir que ajax transforma "" en null
            if (cliente.Nombre == null) {cliente.Nombre = "";}
            if (cliente.Apellido == null){cliente.Apellido = "";}
            if (cliente.Nro_Doc == null){ cliente.Nro_Doc = "";}
            if (cliente.Fecha_Nac == null){ cliente.Fecha_Nac = "";}
            if (cliente.Direccion == null){ cliente.Direccion = "";}

            return ClientesManager.Guardar(cliente); ;
        }

        // PUT api/<controller>/5
        public Error Put([FromBody]Cliente cliente)
        {
            //Para revertir que ajax transforma "" en null
            if (cliente.Nombre == null) { cliente.Nombre = ""; }
            if (cliente.Apellido == null) { cliente.Apellido = ""; }
            if (cliente.Nro_Doc == null) { cliente.Nro_Doc = ""; }
            if (cliente.Fecha_Nac == null) { cliente.Fecha_Nac = ""; }
            if (cliente.Direccion == null) { cliente.Direccion = ""; }

            return ClientesManager.Guardar(cliente);
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            ClientesManager.Eliminar(id);
        }
    }
}