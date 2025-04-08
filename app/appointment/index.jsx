import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function EmergencyBooking() {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Emergency Appointment Date</Text>
      
      <Calendar
        onDayPress={day => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: '#dc3545',
          }
        }}
        theme={{
          calendarBackground: 'white',
          todayTextColor: '#dc3545',
          arrowColor: '#dc3545',
          monthTextColor: '#2c3e50',
          textDayFontWeight: '500',
        }}
      />

      {selectedDate && (
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmText}>
            Confirm Emergency Appointment for {selectedDate}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  confirmButton: {
    marginTop: 30,
    backgroundColor: '#dc3545',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});