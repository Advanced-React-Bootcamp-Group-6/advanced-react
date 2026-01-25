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

type ProductsFiltersProps = {
  selectedCategory: CategoryDto;
  onSelectCategory: (category: CategoryDto) => void;

  searchQuery: string;
  onSearchChange: (value: string) => void;

  priceSort?: "price-asc" | "price-desc";
  onPriceSortChange: (value: "price-asc" | "price-desc" | undefined) => void;
};

export default function ProductsFilters({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  priceSort,
  onPriceSortChange,
}: ProductsFiltersProps) {
  const { categories, isLoading } = useCategories();

  const ALL_CATEGORY: CategoryDto = {
    name: "all",
    slug: undefined,
  };

  const handleCategoryChange = (
    _value: string | null,
    option: ComboboxItem | null,
  ) => {
    if (!option) return;

    if (option.value === "all") {
      onSelectCategory(ALL_CATEGORY);
      return;
    }

    const found = categories.find(
      (cat) => cat.name.toString() === option.value,
    );

    if (found) {
      onSelectCategory(found);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Paper
      withBorder
      radius="md"
      mt="lg"
      p="md"
      w="100%"
      maw={1200}
      miw={{ base: "100%", lg: 1200 }}
    >
      <Stack>
        <Group align="center">
          <IconAdjustments size={20} style={{ transform: "rotate(90deg)" }} />
          <Text fw={500}>Search & Filters</Text>
        </Group>

        <Group grow>
          <TextInput
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.currentTarget.value)}
          />
          <Select
            data={[
              { value: "all", label: "All Categories" },
              ...categories.map((c) => ({
                value: c.name,
                label: c.name,
              })),
            ]}
            placeholder="All Categories"
            value={selectedCategory.name}
            onChange={handleCategoryChange}
          />
          <Select
            data={[
              { value: "default", label: "Default" },
              { value: "price-asc", label: "Price: Low to High" },
              { value: "price-desc", label: "Price: High to Low" },
            ]}
            placeholder="Sort by"
            value={priceSort ?? "default"}
            onChange={(value) => {
              if (value === "price-asc" || value === "price-desc") {
                onPriceSortChange(value);
              } else {
                onPriceSortChange(undefined);
              }
            }}
          />
        </Group>
      </Stack>
    </Paper>
  );
}
