"use client";

import { ChangeEvent, useState } from "react";

interface Filter {
  name: string;
  placeholder: string;
}

interface FiltersProps {
  filters: Filter[];
}

const Filters = ({ filters }: FiltersProps) => {
  const [filter, setFilter] = useState<{ [key: string]: string }>({});

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  return (
    <div>
      {filters.map((filterItem, index) => (
        <input
          key={index}
          type="text"
          name={filterItem.name}
          value={filter[filterItem.name] || ''}
          onChange={handleFilterChange}
          placeholder={filterItem.placeholder}
        />
      ))}
    </div>
  )
}

export default Filters