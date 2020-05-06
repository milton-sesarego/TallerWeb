﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Error
    {
        public int codigo { get; set; }
        public string mensaje { get; set; }

        public Error() { }

        public Error(int codigo, string mensaje)
        {
            this.codigo = codigo;
            this.mensaje = mensaje;
        }
    }
}
