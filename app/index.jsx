import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  const theme = {
    background: darkMode ? '#0f172a' : '#f8fafc',
    text: darkMode ? '#f8fafc' : '#0f172a',
    cardBg: darkMode ? '#1e293b' : '#ffffff',
    border: darkMode ? '#334155' : '#e2e8f0',
    subText: darkMode ? '#94a3b8' : '#64748b',
  };

  const cards = [
    {
      title: 'Symptom Checker',
      text: 'Quickly assess your symptoms from the comfort of your home',
      image: require('../assets/Min venn.png'),
      route: '/symptom-checker',
    },
    {
      title: 'Health Advice',
      text: 'Receive personalized health guidance tailored to your needs',
      image: require('../assets/health-advice.webp'),
      route: '/nutrition-advice',
    },
    {
      title: 'Emergency Guidance',
      text: 'Know when to seek immediate medical attention',
      image: require('../assets/emergency-guidance.webp'),
      route: '/appointment',
    },
  ];

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header with Logo */}
      <View style={styles.header}>
        <Image 
          source={require('../assets/Min venn.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => setDarkMode(!darkMode)} style={styles.toggleBtn}>
          <Ionicons name={darkMode ? 'moon' : 'sunny'} size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* Subheading */}
      <Text style={styles.badge}>EXPERT MEDICAL GUIDANCE</Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Stay healthy without unnecessary visits
      </Text>

      {/* Horizontally scrollable, centered cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardScrollContainer}
        contentInsetAdjustmentBehavior="automatic"
      >
        {cards.map((card, index) => (
          <View
            key={index}
            style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
          >
            <TouchableOpacity onPress={() => router.push(card.route)}>
              <Image source={card.image} style={styles.cardImage} resizeMode="cover" />
            </TouchableOpacity>

            <View style={styles.cardBody}>
              <Pressable
                onPress={() => router.push(card.route)}
                style={({ pressed }) => [
                  styles.buttonTitleWrapper,
                  pressed && styles.buttonTitlePressed,
                ]}
              >
                <Text style={styles.buttonTitleText}>{card.title}</Text>
              </Pressable>
              <Text style={[styles.cardDescription, { color: theme.subText }]}>{card.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginBottom: 32,
  },
  logo: {
    width: 400,  // Adjust based on your logo dimensions
    height: 100,
    borderRadius: 200,  // Adjust based on your logo dimensions
  },
  toggleBtn: {
    padding: 10,
    borderRadius: 20,
  },
  badge: {
    fontSize: 20,
    fontWeight: '700',
    color: '#22c55e',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 10,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 35,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 36,
    lineHeight: 30,
    paddingHorizontal: 20,
  },
  cardScrollContainer: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  card: {
    width: 350,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardBody: {
    padding: 16,
    alignItems: 'center',
  },
  buttonTitleWrapper: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    alignSelf: 'stretch',
    transform: [{ scale: 1 }],
  },
  buttonTitlePressed: {
    backgroundColor: '#172554',
    transform: [{ scale: 0.97 }],
  },
  buttonTitleText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});