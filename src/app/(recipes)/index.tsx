import * as AC from "@bacons/apple-colors";
import { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  SectionList,
} from "react-native";
import { recipes } from "@/data/recipes";
import RecipeCard from "@/components/recipe-card";
import { RecipeCategory } from "@/types/recipe";

const categories: RecipeCategory[] = [
  "Pasta",
  "Pizza",
  "Risotto",
  "Desserts",
  "Appetizers",
  "Main Courses",
];

export default function RecipesScreen() {
  const [selectedCategory, setSelectedCategory] = useState<
    RecipeCategory | "All"
  >("All");

  const filteredRecipes =
    selectedCategory === "All"
      ? recipes
      : recipes.filter((r) => r.category === selectedCategory);

  // Group recipes by category
  const sections = categories
    .map((category) => ({
      title: category,
      data: filteredRecipes.filter((r) => r.category === category),
    }))
    .filter((section) => section.data.length > 0);

  return (
    <SectionList
      sections={sections}
      contentInsetAdjustmentBehavior="automatic"
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RecipeCard recipe={item} />}
      ListHeaderComponent={
        <View
          style={{
            paddingTop: 12,
            paddingBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: AC.separator as any,
            backgroundColor: AC.systemGroupedBackground as any,
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20,
              gap: 8,
            }}
          >
            <CategoryChip
              label="All"
              isSelected={selectedCategory === "All"}
              onPress={() => setSelectedCategory("All")}
            />
            {categories.map((category) => (
              <CategoryChip
                key={category}
                label={category}
                isSelected={selectedCategory === category}
                onPress={() => setSelectedCategory(category)}
              />
            ))}
          </ScrollView>
        </View>
      }
      renderSectionHeader={({ section: { title } }) => (
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 24,
            paddingBottom: 8,
            backgroundColor: AC.systemGroupedBackground as any,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              color: AC.label as any,
            }}
          >
            {title}
          </Text>
        </View>
      )}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingBottom: 20,
      }}
      style={{
        flex: 1,
        backgroundColor: AC.systemGroupedBackground as any,
      }}
      stickySectionHeadersEnabled={false}
    />
  );
}

interface CategoryChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

function CategoryChip({ label, isSelected, onPress }: CategoryChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderCurve: "continuous",
        backgroundColor: isSelected
          ? (AC.systemBlue as any)
          : (AC.secondarySystemBackground as any),
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: isSelected ? "600" : "400",
          color: isSelected ? "#FFFFFF" : (AC.label as any),
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
