﻿using System.Collections.Generic;

namespace MovieRating.Data.Entities
{
    public class Actor
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public ICollection<MovieActor> MovieActors { get; set; }
    }
}
