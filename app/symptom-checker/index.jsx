
import { analyzeSymptoms } from './ai-model';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function SymptomChecker() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('unspecified');
  const [result, setResult] = useState(null);

  const handleCheck = () => {
    const analysis = analyzeSymptoms(input, parseInt(age), gender);
    setResult(analysis);
    
    if (analysis.emergency) {
      router.push('/emergency-booking');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Symptom Checker</Text>
      
      {/* Age Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter your age"
          value={age}
          onChangeText={setAge}
        />
      </View>

      {/* Gender Selector */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gender:</Text>
        <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={(itemValue) => setGender(itemValue)}>
          <Picker.Item label="Prefer not to say" value="unspecified" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>

      {/* Symptoms Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Symptoms:</Text>
        <TextInput
          style={[styles.input, styles.symptomInput]}
          multiline
          placeholder="Describe your symptoms (e.g., headache, fever...)"
          value={input}
          onChangeText={setInput}
        />
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={handleCheck}
        disabled={!input.trim()}
      >
        <Text style={styles.buttonText}>Analyze Symptoms</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>AI Analysis:</Text>
          <Text style={styles.diagnosis}>{result.diagnosis}</Text>
          <Text style={styles.severity}>Severity: {result.severity}</Text>
          <Text style={styles.recommendation}>{result.recommendation}</Text>
          {result.ageNote && <Text style={styles.note}>Note: {result.ageNote}</Text>}
          {result.genderNote && <Text style={styles.note}>Note: {result.genderNote}</Text>}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#4a5568',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  symptomInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  picker: {
    borderWidth: 1,
    borderColor: '00094B',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#00094B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '00094B',
    borderRadius: 8,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  diagnosis: {
    fontSize: 18,
    color: '#2d3748',
    marginBottom: 10,
  },
  severity: {
    fontSize: 16,
    color: '#e53e3e',
    marginBottom: 8,
  },
  recommendation: {
    fontSize: 16,
    color: '#2f855a',
    marginBottom: 8,
  },
  note: {
    fontSize: 14,
    color: '#718096',
    marginTop: 10,
  },
});