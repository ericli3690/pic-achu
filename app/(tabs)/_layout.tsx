import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme} from '@/hooks/useColorScheme';


import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { LinearGradient } from "expo-linear-gradient";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => <LinearGradient colors={['#E1D9D1', '#E1D9D1']} style={{flex: 1}} />,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({color}) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="battle_screen"
        options={{
          title: 'Battle',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="sword-cross" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="add_card_screen"
        options={{
          title: 'Add Card',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="mirror-rectangle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings_screen"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}
