using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Mensaje
    {
        public int codigo { get; set; }
        public string mensaje { get; set; }

        public Mensaje() { }

        public Mensaje(int codigo, string mensaje)
        {
            this.codigo = codigo;
            this.mensaje = mensaje;
        }
    }
}
