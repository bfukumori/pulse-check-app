import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getSuggestionsService } from '../infra/services/suggestions/get-suggestions.service';

interface CheckinModalProps {
  visible: boolean;
  closeModal: () => void;
}

export const SuggestionModal: React.FC<CheckinModalProps> = ({
  visible,
  closeModal,
}) => {
  const { data: suggestions, isPending } = useQuery({
    queryKey: ['suggestions'],
    queryFn: getSuggestionsService,
    enabled: visible,
    staleTime: 1000 * 60 * 60 * 24,
    select: (data) => {
      if (!data || data.length === 0) {
        return null;
      }

      const randomIndex = Math.floor(Math.random() * data.length);
      const { description, title } = data[randomIndex];

      return {
        title,
        description,
      };
    },
  });
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Sugestão do dia</Text>

        {isPending ? (
          <View style={styles.pendingContainer}>
            <Text style={styles.pendingText}>Carregando sugestão...</Text>
          </View>
        ) : suggestions ? (
          <>
            <Text style={styles.modalSubtitle}>{suggestions.title}</Text>
            <Text style={styles.modalText}>{suggestions.description}</Text>
          </>
        ) : (
          <View style={styles.pendingContainer}>
            <Text style={styles.pendingText}>
              Nenhuma sugestão disponível no momento 🙁
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
          <Text style={styles.modalButtonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1f2937',
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: 'semibold',
    marginBottom: 12,
    color: '#1f2937',
  },
  modalText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  pendingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  pendingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6b7280',
  },
});
