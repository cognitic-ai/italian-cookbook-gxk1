import * as AC from "@bacons/apple-colors";
import { useLocalSearchParams, Stack } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { recipes } from "@/data/recipes";
import { useFavorites } from "@/contexts/favorites-context";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const recipe = recipes.find((r) => r.id === id);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!recipe) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: AC.systemGroupedBackground as any,
        }}
      >
        <Text style={{ color: AC.secondaryLabel as any, fontSize: 16 }}>
          Recipe not found
        </Text>
      </View>
    );
  }

  const favorite = isFavorite(recipe.id);

  return (
    <>
      <Stack.Screen
        options={{
          title: recipe.name,
          headerLargeTitle: false,
          headerRight: () => (
            <Pressable
              onPress={() => toggleFavorite(recipe.id)}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                padding: 8,
              })}
            >
              <Text style={{ fontSize: 24 }}>{favorite ? "❤️" : "🤍"}</Text>
            </Pressable>
          ),
        }}
      />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: AC.systemGroupedBackground as any,
        }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={{ padding: 20 }}>
          {/* Header */}
          <View
            style={{
              alignItems: "center",
              paddingVertical: 24,
              backgroundColor: AC.secondarySystemGroupedBackground as any,
              borderRadius: 16,
              borderCurve: "continuous",
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 80, marginBottom: 16 }}>
              {recipe.image}
            </Text>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "700",
                color: AC.label as any,
                textAlign: "center",
                marginBottom: 8,
                paddingHorizontal: 20,
              }}
            >
              {recipe.name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: AC.secondaryLabel as any,
                textAlign: "center",
                paddingHorizontal: 20,
              }}
            >
              {recipe.description}
            </Text>
          </View>

          {/* Info Cards */}
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <InfoCard icon="⏱" label="Prep" value={recipe.prepTime} />
            <InfoCard icon="🔥" label="Cook" value={recipe.cookTime} />
            <InfoCard
              icon="🍽"
              label="Servings"
              value={recipe.servings.toString()}
            />
            <InfoCard icon="👨‍🍳" label="Level" value={recipe.difficulty} />
          </View>

          {/* Ingredients */}
          <Section title="Ingredients">
            {recipe.ingredients.map((ingredient, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 12,
                  borderBottomWidth:
                    index < recipe.ingredients.length - 1 ? 1 : 0,
                  borderBottomColor: AC.separator as any,
                }}
              >
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: AC.systemGreen as any,
                    marginRight: 12,
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: AC.label as any,
                    flex: 1,
                  }}
                  selectable
                >
                  {ingredient}
                </Text>
              </View>
            ))}
          </Section>

          {/* Instructions */}
          <Section title="Instructions">
            {recipe.instructions.map((instruction, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: AC.systemBlue as any,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      color: "#FFFFFF",
                      fontVariant: "tabular-nums",
                    }}
                  >
                    {index + 1}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    color: AC.label as any,
                    flex: 1,
                    lineHeight: 24,
                  }}
                  selectable
                >
                  {instruction}
                </Text>
              </View>
            ))}
          </Section>
        </View>
      </ScrollView>
    </>
  );
}

interface InfoCardProps {
  icon: string;
  label: string;
  value: string;
}

function InfoCard({ icon, label, value }: InfoCardProps) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AC.secondarySystemGroupedBackground as any,
        borderRadius: 12,
        borderCurve: "continuous",
        padding: 12,
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 4 }}>{icon}</Text>
      <Text
        style={{
          fontSize: 11,
          color: AC.secondaryLabel as any,
          marginBottom: 2,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: AC.label as any,
          textAlign: "center",
        }}
      >
        {value}
      </Text>
    </View>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          color: AC.label as any,
          marginBottom: 16,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          backgroundColor: AC.secondarySystemGroupedBackground as any,
          borderRadius: 16,
          borderCurve: "continuous",
          padding: 16,
        }}
      >
        {children}
      </View>
    </View>
  );
}
