﻿using System;
using System.Collections.Generic;
using System.Text;

namespace MovieRating.Data.Entities
{
    public class ShowActor
    {
        public int ShowId { get; set; }
        public Show Show { get; set; }
        public int ActorId { get; set; }
        public Actor Actor { get; set; }
    }
}
