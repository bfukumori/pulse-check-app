import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface DashboardStatsProps {
  stats: {
    averageMood: number;
    totalCheckins: number;
    last7Days?: {
      date: string;
      averageMood: number;
    }[];
  };
}

const getMoodEmoji = (mood: number) => {
  if (mood >= 4.5) return '😄';
  if (mood >= 3.5) return '🙂';
  if (mood >= 2.5) return '😐';
  if (mood >= 1.5) return '😕';
  return '😢';
};

const getMoodColor = (mood: number) => {
  if (mood >= 4.5) return '#10b981';
  if (mood >= 3.5) return '#84cc16';
  if (mood >= 2.5) return '#f59e0b';
  if (mood >= 1.5) return '#f97316';
  return '#ef4444';
};

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const moodColor = getMoodColor(stats.averageMood);
  const moodEmoji = getMoodEmoji(stats.averageMood);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Estatísticas</Text>

      <View style={styles.mainCard}>
        <Text style={styles.mainCardEmoji}>{moodEmoji}</Text>
        <Text style={styles.mainCardTitle}>Humor Médio</Text>
        <Text style={[styles.mainCardValue, { color: moodColor }]}>
          {stats.averageMood.toFixed(1)}/5
        </Text>
        <Text style={styles.mainCardSubtext}>
          Baseado em {stats.totalCheckins} check-ins
        </Text>
      </View>

      {stats.last7Days && stats.last7Days.length > 0 && (
        <View style={styles.historyCard}>
          <Text style={styles.historyTitle}>Últimos 7 Dias</Text>
          {stats.last7Days.map((day, index) => {
            const dayMoodColor = getMoodColor(day.averageMood);
            const date = new Date(day.date);
            const formattedDate = date.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
            });

            return (
              <View key={index} style={styles.historyItem}>
                <Text style={styles.historyDate}>{formattedDate}</Text>
                <View style={styles.historyBar}>
                  <View
                    style={[
                      styles.historyBarFill,
                      {
                        width: `${(day.averageMood / 5) * 100}%`,
                        backgroundColor: dayMoodColor,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.historyValue}>
                  {day.averageMood.toFixed(1)}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  mainCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  mainCardEmoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  mainCardTitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  mainCardValue: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mainCardSubtext: {
    fontSize: 12,
    color: '#9ca3af',
  },
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyDate: {
    fontSize: 14,
    color: '#6b7280',
    width: 50,
  },
  historyBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  historyBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  historyValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    width: 35,
    textAlign: 'right',
  },
});
