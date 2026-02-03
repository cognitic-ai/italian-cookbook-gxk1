import * as AC from "@bacons/apple-colors";
import { FlatList, Text, View } from "react-native";
import { recipes } from "@/data/recipes";
import RecipeCard from "@/components/recipe-card";
import { useFavorites } from "@/contexts/favorites-context";

export default function FavoritesScreen() {
  const { favorites } = useFavorites();

  const favoriteRecipes = recipes.filter((recipe) =>
    favorites.has(recipe.id)
  );

  if (favoriteRecipes.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: AC.systemGroupedBackground as any,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 40,
        }}
      >
        <Text style={{ fontSize: 60, marginBottom: 16 }}>❤️</Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: AC.label as any,
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          No Favorites Yet
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: AC.secondaryLabel as any,
            textAlign: "center",
          }}
        >
          Start adding recipes to your favorites to see them here
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AC.systemGroupedBackground as any,
      }}
    >
      <FlatList
        data={favoriteRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 8,
          paddingBottom: 20,
        }}
      />
    </View>
  );
}
