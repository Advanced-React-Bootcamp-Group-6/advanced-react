import {
  Loader,
  Paper,
  Group,
  TextInput,
  Select,
  type ComboboxItem,
} from "@mantine/core";
import { useCategories } from "../hooks/useCategories";
import type { CategoryDto } from "../dto/Category";

type CategoriesSidebarProps = {
  selectedCategory: CategoryDto;
  onSelectCategory: (category: CategoryDto) => void;
};

export default function CategoriesSidebar({
  selectedCategory,
  onSelectCategory,
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
    <Paper withBorder radius="md" p="md" mt={"lg"}>
      <Group grow>
        <TextInput placeholder="Search products..." />
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
          data={["Default", "Price: Low to High", "Price: High to Low"]}
          placeholder="Default"
        />
      </Group>
    </Paper>
  );
}
