using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using BusinessLogic;
using Domain;

namespace WebAPI
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PedidosController : ApiController
    {
        // GET api/<controller>/5
        public IEnumerable<Pedido> Get(int idCliente)
        {
            return PedidosManager.BuscarPorCliente(idCliente);
        }

        // POST api/<controller>
        public Mensaje Post([FromBody]Pedido pedido)
        {
            return PedidosManager.Guardar(pedido);
        }
    }
}
