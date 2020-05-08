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
    public class ProductosController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<Producto> Get()
        {
            return ProductosManager.Buscar();
        }

        // POST api/<controller>
        public Mensaje Post([FromBody]Producto producto)
        {
            //Para revertir que ajax transforma "" en null
            if(producto.Nombre == null){ producto.Nombre = "";}
            if(producto.Descripcion == null) { producto.Descripcion = "";}

            return ProductosManager.Guardar(producto);
        }

        // PUT api/<controller>/5
        public Mensaje Put([FromBody]Producto producto)
        {
            if (producto.Nombre == null){ producto.Nombre = "";}
            if (producto.Descripcion == null) { producto.Descripcion = "";}

            return ProductosManager.Guardar(producto);
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            ProductosManager.Eliminar(id);
        }
    }
}