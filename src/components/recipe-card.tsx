import * as AC from "@bacons/apple-colors";
import { Link } from "expo-router";
import { Platform, Pressable, Text, View } from "react-native";
import { Recipe } from "@/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${recipe.id}`} asChild>
      <Pressable
        style={({ pressed }) => ({
          backgroundColor: AC.systemBackground as any,
          borderRadius: 16,
          borderCurve: "continuous",
          padding: 16,
          marginBottom: 12,
          opacity: pressed ? 0.7 : 1,
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
            },
            default: {
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            },
          }),
        })}
      >
        <View style={{ flexDirection: "row", gap: 12 }}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 12,
              borderCurve: "continuous",
              backgroundColor: AC.secondarySystemBackground as any,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 32 }}>{recipe.image}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: AC.label as any,
                marginBottom: 4,
              }}
              numberOfLines={1}
            >
              {recipe.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: AC.secondaryLabel as any,
                marginBottom: 8,
              }}
              numberOfLines={2}
            >
              {recipe.description}
            </Text>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <Text style={{ fontSize: 12 }}>⏱</Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: AC.secondaryLabel as any,
                  }}
                >
                  {recipe.prepTime}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <Text style={{ fontSize: 12 }}>👨‍🍳</Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: AC.secondaryLabel as any,
                  }}
                >
                  {recipe.difficulty}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <Text style={{ fontSize: 12 }}>🍽</Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: AC.secondaryLabel as any,
                  }}
                >
                  {recipe.servings} servings
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
