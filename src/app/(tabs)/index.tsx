import { CheckinModal } from '@/src/components/check-in-modal';
import {
  DashboardStats,
  DashboardStatsProps,
} from '@/src/components/dashboard-stats';
import { useAuth } from '@/src/infra/stores/auth.store';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const mockStats = {
  averageMood: 3,
  totalCheckins: 2,
  last7Days: [
    {
      date: new Date().toISOString(),
      averageMood: 4,
    },
    {
      date: new Date().toISOString(),
      averageMood: 2,
    },
  ],
};

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [stats, setStats] = useState<DashboardStatsProps['stats']>(mockStats);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { logout } = useAuth();

  const handleCheckinSuccess = () => {
    setModalVisible(false);
    Alert.alert('Sucesso', 'Check-in enviado com sucesso! 🎉');
  };

  const handleLogout = async () => {
    Alert.alert('Sair', 'Deseja realmente sair da sua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        onPress: logout,
        style: 'destructive',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, {'Usuário'}! 👋</Text>
          <Text style={styles.subtitle}>Como você está se sentindo hoje?</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => {}} />
        }
      >
        <TouchableOpacity
          style={styles.checkinButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.checkinButtonEmoji}>😊</Text>
          <Text style={styles.checkinButtonText}>Fazer Check-in Diário</Text>
          <Text style={styles.checkinButtonSubtext}>
            Leva menos de 1 minuto
          </Text>
        </TouchableOpacity>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6366f1" />
            <Text style={styles.loadingText}>Carregando estatísticas...</Text>
          </View>
        ) : stats ? (
          <DashboardStats stats={stats} />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateEmoji}>📊</Text>
            <Text style={styles.emptyStateText}>
              Ainda não há dados suficientes para exibir estatísticas.
            </Text>
          </View>
        )}
      </ScrollView>

      <CheckinModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSuccess={handleCheckinSuccess}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 24,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: '#ef4444',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    padding: 24,
  },
  checkinButton: {
    backgroundColor: '#6366f1',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  checkinButtonEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  checkinButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  checkinButtonSubtext: {
    color: '#e0e7ff',
    fontSize: 12,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  loadingText: {
    marginTop: 12,
    color: '#6b7280',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
