import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TextInput, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions 
} from 'react-native';
import { useState } from 'react';

const { width } = Dimensions.get('window');
const CARD_IMAGE_WIDTH = width * 0.3;

const nutritionData = [
  { 
    id: '1', 
    name: 'Leafy Greens', 
    advice: 'Rich in iron, calcium, and antioxidants. Regular consumption helps improve blood quality and supports bone health. Try adding spinach or kale to your smoothies!',
    image: require('../../assets/images/greens.jpg')
  },
  { 
    id: '2', 
    name: 'Berries', 
    advice: 'Packed with vitamin C, fiber, and antioxidants. Blueberries and strawberries can boost brain function and improve cardiovascular health. Perfect for snacks or yogurt toppings.',
    image: require('../../assets/images/berries.jpg')
  },
];

export default function NutritionAdvice() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    
    const userMessage = { text: inputText, isBot: false, id: Date.now().toString() };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    setIsLoading(true);
    setTimeout(() => {
      const botResponse = generateResponse(inputText);
      const botMessage = { text: botResponse, isBot: true, id: (Date.now() + 1).toString() };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const generateResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    const foodItem = nutritionData.find(item => 
      lowerInput.includes(item.name.toLowerCase())
    );

    return foodItem 
      ? `🍏 ${foodItem.name}:\n${foodItem.advice}`
      : "I'm here to help with nutrition info! Try asking about specific foods like 'Leafy Greens' or 'Berries' 🍓";
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Chat Section */}
      <View style={styles.chatSection}>
        <ScrollView 
          style={styles.chatHistory}
          contentContainerStyle={styles.chatContent}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.isBot ? styles.botBubble : styles.userBubble
              ]}
            >
              <Text style={message.isBot ? styles.botText : styles.userText}>
                {message.text}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask about food nutrition..."
            placeholderTextColor="#999"
            multiline
          />
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={handleSend}
            disabled={isLoading}
          >
            <Text style={styles.sendText}>{isLoading ? '...' : '➤'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Nutrition Cards */}
      <ScrollView style={styles.cardsContainer}>
        <Text style={styles.sectionTitle}>Nutrition Guide</Text>
        {nutritionData.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.imageContainer}>
              <Image 
                source={item.image} 
                style={styles.cardImage} 
                resizeMode="cover"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardAdvice}>{item.advice}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  chatSection: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    maxHeight: '40%',
  },
  chatHistory: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  chatContent: {
    paddingBottom: 15,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 15,
    borderRadius: 20,
    marginVertical: 6,
  },
  userBubble: {
    backgroundColor: '#4a90e2',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#f1f3f5',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  userText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 22,
  },
  botText: {
    color: '#2c3e50',
    fontSize: 16,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f3f5',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 10,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#4a90e2',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendText: {
    color: 'white',
    fontSize: 20,
    marginTop: -2,
  },
  cardsContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2c3e50',
    marginVertical: 20,
    marginLeft: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    width: 300,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
  },
  cardAdvice: {
    fontSize: 15,
    color: '#6c757d',
    lineHeight: 22,
  },
});