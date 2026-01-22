import {
  Loader,
  Paper,
  Group,
  TextInput,
  Select,
  type ComboboxItem,
  Stack,
  Text,
} from "@mantine/core";
import { useCategories } from "../hooks/useCategories";
import type { CategoryDto } from "../dto/Category";
import { IconAdjustments } from "@tabler/icons-react";

type CategoriesSidebarProps = {
  selectedCategory: CategoryDto;
  onSelectCategory: (category: CategoryDto) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  priceFilter: "all" | "high" | "low";                    
  onPriceFilterChange: (value: "all" | "high" | "low") => void; 
};

export default function CategoriesSidebar({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  priceFilter,                  
  onPriceFilterChange,        
}: CategoriesSidebarProps) {
  const { categories, isLoading } = useCategories();
  const ALL_CATEGORY: CategoryDto = {
    name: "all",
  };

  const handleCategoryChange = (
    _value: string | null,
    option: ComboboxItem | null
  ) => {
    if (!option) return;

    if (option.value === "all") {
      onSelectCategory(ALL_CATEGORY);
      return;
    }

    const selectedCategory = categories.find(
      (cat) => cat.name.toString() === option.value
    );

    if (selectedCategory) {
      onSelectCategory(selectedCategory);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Paper withBorder radius="md" p="md" mt="lg">
      <Stack>
        <Group align="center">
          <IconAdjustments size={20} style={{ transform: "rotate(90deg)" }} />
          <Text fw={500}>Search & Filters</Text>
        </Group>

        <Group grow>
          <TextInput
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />

          <Select
            data={[
              { value: "all", label: "All Categories" },
              ...categories.map((c) => ({ value: c.name, label: c.name })),
            ]}
            placeholder="All Categories"
            value={selectedCategory.name}
            onChange={handleCategoryChange}
          />

          <Select
            data={[
              { value: "all", label: "All Prices" },
              { value: "high", label: "Price: Low to High" },
              { value: "low", label: "Price: High to Low" },
            ]}
            placeholder="Price Filter"
            value={priceFilter}
            onChange={(value) => {
              if (value === "all" || value === "high" || value === "low") {
                onPriceFilterChange(value);
              }
            }}
          />
        </Group>
      </Stack>
    </Paper>
  );
}
