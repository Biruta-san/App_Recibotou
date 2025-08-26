import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  Platform,
  ScrollView,
  Modal,
  FlatList,
  TextInput,
  Alert,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const RELATORIO = ({ navigation }) => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [monthModalVisible, setMonthModalVisible] = useState(false);
  const [iaModalVisible, setIaModalVisible] = useState(false);
  const [perguntaIA, setPerguntaIA] = useState('');

  // Anos disponíveis
  const anos = [2023, 2024, 2025, 2026];
  
  // Meses com cores
  const meses = [
    { numero: 1, nome: 'Janeiro', cor: '#FF6B6B' },
    { numero: 2, nome: 'Fevereiro', cor: '#4ECDC4' },
    { numero: 3, nome: 'Março', cor: '#45B7D1' },
    { numero: 4, nome: 'Abril', cor: '#96CEB4' },
    { numero: 5, nome: 'Maio', cor: '#FECA57' },
    { numero: 6, nome: 'Junho', cor: '#FF9FF3' },
    { numero: 7, nome: 'Julho', cor: '#54A0FF' },
    { numero: 8, nome: 'Agosto', cor: '#5F27CD' },
    { numero: 9, nome: 'Setembro', cor: '#00C851' },
    { numero: 10, nome: 'Outubro', cor: '#FF6348' },
    { numero: 11, nome: 'Novembro', cor: '#FF9F43' },
    { numero: 12, nome: 'Dezembro', cor: '#C44569' }
  ];

  // Dados de exemplo
  const dadosExemplo = {
    2025: {
      8: [
        { id: 1, categoria: 'Alimentação', valor: 450.00, data: '2025-08-05', descricao: 'Supermercado Extra', icone: 'restaurant' },
        { id: 2, categoria: 'Transporte', valor: 120.00, data: '2025-08-10', descricao: 'Combustível', icone: 'car' },
        { id: 3, categoria: 'Lazer', valor: 200.00, data: '2025-08-15', descricao: 'Cinema e jantar', icone: 'film' },
        { id: 4, categoria: 'Alimentação', valor: 80.00, data: '2025-08-18', descricao: 'Restaurante', icone: 'restaurant' },
        { id: 5, categoria: 'Saúde', valor: 150.00, data: '2025-08-22', descricao: 'Consulta médica', icone: 'medical' },
        { id: 6, categoria: 'Educação', valor: 300.00, data: '2025-08-24', descricao: 'Curso online', icone: 'school' }
      ],
      7: [
        { id: 7, categoria: 'Alimentação', valor: 380.00, data: '2025-07-10', descricao: 'Supermercado', icone: 'restaurant' },
        { id: 8, categoria: 'Transporte', valor: 100.00, data: '2025-07-15', descricao: 'Uber', icone: 'car' }
      ]
    }
  };

  // Funções auxiliares
  const obterDadosMes = (ano, mes) => {
    return dadosExemplo[ano]?.[mes] || [];
  };

  const calcularTotal = (dados) => {
    return dados.reduce((soma, item) => soma + item.valor, 0);
  };

  const abrirMes = (mes) => {
    const dados = obterDadosMes(selectedYear, mes.numero);
    if (dados.length > 0) {
      setSelectedMonth(mes.numero);
      setMonthModalVisible(true);
    } else {
      Alert.alert(
        `${mes.nome} ${selectedYear}`,
        'Nenhuma despesa encontrada para este mês.',
        [{ text: 'OK' }]
      );
    }
  };

  const enviarPerguntaIA = () => {
    if (!perguntaIA.trim()) {
      Alert.alert('Atenção', 'Digite uma pergunta para a IA');
      return;
    }

    Alert.alert(
      '🤖 IA Financeira',
      `Pergunta: "${perguntaIA}"\n\nResposta da IA: Com base em seus gastos, recomendo criar um orçamento mensal de R$ 2.000 e focar em reduzir gastos com alimentação fora de casa. Suas despesas estão 15% acima da média ideal para seu perfil.`,
      [{ text: 'OK' }]
    );
    
    setPerguntaIA('');
    setIaModalVisible(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Relatórios Financeiros</Text>
        <TouchableOpacity>
          <Ionicons name="settings" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo Principal */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Seletor de Ano */}
        <View style={styles.selectorContainer}>
          <Text style={styles.sectionTitle}>📅 Selecione o Ano</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.anoScroll}>
            {anos.map(ano => (
              <TouchableOpacity
                key={ano}
                style={[styles.anoCard, selectedYear === ano && styles.anoCardSelecionado]}
                onPress={() => setSelectedYear(ano)}
              >
                <Text style={[styles.anoTexto, selectedYear === ano && styles.anoTextoSelecionado]}>
                  {ano}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Grid de Meses */}
        <View style={styles.mesContainer}>
          <Text style={styles.sectionTitle}>📊 Selecione o Mês - {selectedYear}</Text>
          <View style={styles.mesGrid}>
            {meses.map((mes) => {
              const dadosMes = obterDadosMes(selectedYear, mes.numero);
              const temDados = dadosMes.length > 0;
              const total = calcularTotal(dadosMes);
              
              return (
                <TouchableOpacity
                  key={mes.numero}
                  style={[
                    styles.mesCard,
                    { backgroundColor: temDados ? mes.cor : '#2a2a2a' }
                  ]}
                  onPress={() => abrirMes(mes)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.mesNome}>{mes.nome}</Text>
                  {temDados ? (
                    <View style={styles.mesDataContainer}>
                      <Ionicons name="checkmark-circle" size={16} color="#fff" />
                      <Text style={styles.mesValor}>R$ {total.toFixed(0)}</Text>
                    </View>
                  ) : (
                    <Ionicons name="add-circle-outline" size={20} color="#666" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Botão IA */}
        <TouchableOpacity 
          style={styles.iaButton}
          onPress={() => setIaModalVisible(true)}
        >
          <Ionicons name="bulb" size={24} color="#fff" />
          <Text style={styles.iaButtonText}>🤖 Consultar IA Financeira</Text>
        </TouchableOpacity>

        {/* Informações */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>💡 Como usar</Text>
          <Text style={styles.infoText}>
            • Escolha um ano acima{'\n'}
            • Toque em um mês para ver despesas{'\n'}
            • Meses coloridos têm dados{'\n'}
            • Use a IA para análises
          </Text>
        </View>
      </ScrollView>

      {/* Modal do Mês */}
      <Modal
        visible={monthModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMonthModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {meses.find(m => m.numero === selectedMonth)?.nome} {selectedYear}
              </Text>
              <TouchableOpacity onPress={() => setMonthModalVisible(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            
            {selectedMonth && (
              <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                {/* Header das despesas */}
                <View style={[
                  styles.despesaHeader, 
                  { backgroundColor: meses.find(m => m.numero === selectedMonth)?.cor }
                ]}>
                  <Text style={styles.despesaTitle}>
                    {meses.find(m => m.numero === selectedMonth)?.nome} {selectedYear}
                  </Text>
                  <Text style={styles.totalAmount}>
                    R$ {calcularTotal(obterDadosMes(selectedYear, selectedMonth)).toFixed(2)}
                  </Text>
                  <Text style={styles.despesaCount}>
                    {obterDadosMes(selectedYear, selectedMonth).length} despesas
                  </Text>
                </View>

                {/* Lista de despesas */}
                <FlatList
                  data={obterDadosMes(selectedYear, selectedMonth)}
                  keyExtractor={(item) => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={[
                        styles.despesaItem, 
                        { backgroundColor: index % 2 === 0 ? '#1a1a1a' : '#2a2a2a' }
                      ]}
                      onPress={() => Alert.alert(
                        item.categoria, 
                        `${item.descricao}\nR$ ${item.valor.toFixed(2)}\n${new Date(item.data).toLocaleDateString('pt-BR')}`
                      )}
                    >
                      <View style={styles.despesaIcon}>
                        <Ionicons name={item.icone} size={24} color="#00C851" />
                      </View>
                      <View style={styles.despesaInfo}>
                        <Text style={styles.despesaCategoria}>{item.categoria}</Text>
                        <Text style={styles.despesaDescricao}>{item.descricao}</Text>
                        <Text style={styles.despesaData}>
                          {new Date(item.data).toLocaleDateString('pt-BR')}
                        </Text>
                      </View>
                      <View style={styles.despesaValorContainer}>
                        <Text style={styles.despesaValorTexto}>R$ {item.valor.toFixed(2)}</Text>
                        <Ionicons name="chevron-forward" size={16} color="#666" />
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal da IA */}
      <Modal
        visible={iaModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIaModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.iaModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>🤖 IA Financeira</Text>
              <TouchableOpacity onPress={() => setIaModalVisible(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.iaDescription}>
                Faça uma pergunta sobre suas finanças e receba uma análise personalizada
              </Text>
              <TextInput
                style={styles.perguntaInput}
                value={perguntaIA}
                onChangeText={setPerguntaIA}
                placeholder="Ex: Como posso economizar mais?"
                placeholderTextColor="#666"
                multiline
                numberOfLines={4}
              />
              <TouchableOpacity 
                style={[styles.enviarButton, !perguntaIA.trim() && styles.enviarButtonDisabled]}
                onPress={enviarPerguntaIA}
                disabled={!perguntaIA.trim()}
              >
                <Ionicons name="send" size={20} color="#fff" />
                <Text style={styles.enviarButtonText}>Enviar Pergunta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#00C851',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
  },
  
  // Seletor de Ano
  selectorContainer: {
    marginBottom: 24,
  },
  anoScroll: {
    flexDirection: 'row',
  },
  anoCard: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#333',
  },
  anoCardSelecionado: {
    backgroundColor: '#00C851',
    borderColor: '#00C851',
  },
  anoTexto: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  anoTextoSelecionado: {
    color: '#000',
  },

  // Grid de Meses
  mesContainer: {
    marginBottom: 24,
  },
  mesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  mesCard: {
    width: (width - 48) / 3,
    height: 80,
    margin: 4,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  mesNome: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mesDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  mesValor: {
    fontSize: 10,
    color: '#fff',
    marginLeft: 4,
    fontWeight: 'bold',
  },

  // Botão IA
  iaButton: {
    backgroundColor: '#7B1FA2',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#7B1FA2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  iaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  // Info Card
  infoCard: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 24,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.8,
    minHeight: height * 0.5,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#666',
    alignSelf: 'center',
    marginTop: 8,
    borderRadius: 2,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalBody: {
    flex: 1,
    padding: 20,
  },

  // Despesas
  despesaHeader: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  despesaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  totalAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  despesaCount: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  despesaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  despesaIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  despesaInfo: {
    flex: 1,
  },
  despesaCategoria: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  despesaDescricao: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 2,
  },
  despesaData: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  despesaValorContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  despesaValorTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00C851',
    marginRight: 8,
  },

  // Modal IA
  iaModalContent: {
    backgroundColor: '#1a1a1a',
    margin: 20,
    borderRadius: 20,
    maxHeight: height * 0.6,
  },
  iaDescription: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  perguntaInput: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#fff',
    textAlignVertical: 'top',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
    minHeight: 100,
  },
  enviarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7B1FA2',
    padding: 15,
    borderRadius: 12,
  },
  enviarButtonDisabled: {
    backgroundColor: '#555',
  },
  enviarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default RELATORIO;
