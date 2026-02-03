import { ThemeProvider } from "@/components/theme-provider";
import { FavoritesProvider } from "@/contexts/favorites-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs as WebTabs } from "expo-router/tabs";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform, useWindowDimensions } from "react-native";

export default function Layout() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <TabsLayout />
      </FavoritesProvider>
    </ThemeProvider>
  );
}

function TabsLayout() {
  if (process.env.EXPO_OS === "web") {
    return <WebTabsLayout />;
  } else {
    return <NativeTabsLayout />;
  }
}

function WebTabsLayout() {
  const { width } = useWindowDimensions();
  const isMd = width >= 768;
  const isLg = width >= 1024;

  return (
    <WebTabs
      screenOptions={{
        headerShown: false,
        ...(isMd
          ? {
              tabBarPosition: "left",
              tabBarVariant: "material",
              tabBarLabelPosition: isLg ? undefined : "below-icon",
            }
          : {
              tabBarPosition: "bottom",
            }),
      }}
    >
      <WebTabs.Screen
        name="(recipes)"
        options={{
          title: "Recipes",
          tabBarIcon: (props) => <MaterialIcons {...props} name="restaurant" />,
        }}
      />
      <WebTabs.Screen
        name="(favorites)"
        options={{
          title: "Favorites",
          tabBarIcon: (props) => <MaterialIcons {...props} name="favorite" />,
        }}
      />
    </WebTabs>
  );
}

function NativeTabsLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="(recipes)">
        <NativeTabs.Trigger.Label>Recipes</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "fork.knife", selected: "fork.knife" } },
            default: {
              src: <NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="restaurant" />,
            },
          })}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(favorites)">
        <NativeTabs.Trigger.Label>Favorites</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "heart", selected: "heart.fill" } },
            default: {
              src: <NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="favorite" />,
            },
          })}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
