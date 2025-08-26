import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const StatisticsScreen = ({ navigation }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Dados mock para os gráficos
  const monthlyData = [
    { month: 'Jan', amount: 1200, status: 'good' },
    { month: 'Fev', amount: 1850, status: 'warning' },
    { month: 'Mar', amount: 2500, status: 'danger' },
    { month: 'Abr', amount: 1150, status: 'good' },
    { month: 'Mai', amount: 1650, status: 'warning' },
    { month: 'Jun', amount: 1320, status: 'good' },
  ];

  const categoryData = [
    { name: 'Alimentação', amount: 450, percentage: 35, color: '#ff6384' },
    { name: 'Transporte', amount: 320, percentage: 25, color: '#36a2eb' },
    { name: 'Lazer', amount: 180, percentage: 15, color: '#ffce56' },
    { name: 'Saúde', amount: 150, percentage: 12, color: '#4bc0c0' },
    { name: 'Outros', amount: 150, percentage: 13, color: '#9966ff' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return '#28a745';
      case 'warning': return '#ffc107';
      case 'danger': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const maxAmount = Math.max(...monthlyData.map(item => item.amount));

  const BarChart = () => (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Gastos por Mês</Text>
      <View style={styles.chart}>
        <View style={styles.yAxis}>
          <Text style={styles.axisLabel}>R$ {maxAmount}</Text>
          <Text style={styles.axisLabel}>R$ {(maxAmount * 0.75).toFixed(0)}</Text>
          <Text style={styles.axisLabel}>R$ {(maxAmount * 0.5).toFixed(0)}</Text>
          <Text style={styles.axisLabel}>R$ {(maxAmount * 0.25).toFixed(0)}</Text>
          <Text style={styles.axisLabel}>R$ 0</Text>
        </View>
        <View style={styles.chartArea}>
          <View style={styles.bars}>
            {monthlyData.map((item, index) => {
              const height = (item.amount / maxAmount) * 150;
              return (
                <View key={index} style={styles.barContainer}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height,
                        backgroundColor: getStatusColor(item.status),
                      },
                    ]}
                  />
                  <Text style={styles.barLabel}>{item.month}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#28a745' }]} />
          <Text style={styles.legendText}>Bom Resultado</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#ffc107' }]} />
          <Text style={styles.legendText}>Controlado</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#dc3545' }]} />
          <Text style={styles.legendText}>Gastos Extremos</Text>
        </View>
      </View>
    </View>
  );

  const PieChart = () => (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Gastos por Categoria (Agosto)</Text>
      <View style={styles.pieContainer}>
        <View style={styles.pieChart}>
          {/* Simulação visual de pizza */}
          <View style={styles.pieSlice1} />
          <View style={styles.pieSlice2} />
          <View style={styles.pieSlice3} />
          <View style={styles.pieSlice4} />
          <View style={styles.pieSlice5} />
          <View style={styles.pieCenter}>
            <Text style={styles.pieCenterText}>Total</Text>
            <Text style={styles.pieCenterAmount}>R$ 1.250</Text>
          </View>
        </View>
        <View style={styles.categoryList}>
          {categoryData.map((item, index) => (
            <View key={index} style={styles.categoryItem}>
              <View style={[styles.categoryColor, { backgroundColor: item.color }]} />
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{item.name}</Text>
                <Text style={styles.categoryAmount}>R$ {item.amount} ({item.percentage}%)</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const TrendChart = () => (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Tendência de Gastos</Text>
      <View style={styles.trendContainer}>
        <View style={styles.trendStats}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>-12%</Text>
            <Text style={styles.statLabel}>vs mês anterior</Text>
            <Ionicons name="trending-down" size={24} color="#28a745" />
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>R$ 1.450</Text>
            <Text style={styles.statLabel}>Média mensal</Text>
            <Ionicons name="analytics" size={24} color="#007AFF" />
          </View>
        </View>
        <View style={styles.trendLine}>
          {/* Simulação de linha de tendência */}
          <View style={styles.lineChart}>
            {monthlyData.map((item, index) => (
              <View key={index} style={styles.linePoint}>
                <View
                  style={[
                    styles.point,
                    {
                      backgroundColor: getStatusColor(item.status),
                      bottom: (item.amount / maxAmount) * 80,
                    },
                  ]}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Estatísticas</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Filtros de período */}
      <View style={styles.filters}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedPeriod === 'month' && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedPeriod('month')}
        >
          <Text
            style={[
              styles.filterText,
              selectedPeriod === 'month' && styles.filterTextActive,
            ]}
          >
            Este Mês
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedPeriod === 'quarter' && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedPeriod('quarter')}
        >
          <Text
            style={[
              styles.filterText,
              selectedPeriod === 'quarter' && styles.filterTextActive,
            ]}
          >
            Trimestre
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedPeriod === 'year' && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedPeriod('year')}
        >
          <Text
            style={[
              styles.filterText,
              selectedPeriod === 'year' && styles.filterTextActive,
            ]}
          >
            Ano
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <BarChart />
        <PieChart />
        <TrendChart />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Preto principal
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#1a1a1a', // Preto mais claro
    borderBottomWidth: 2,
    borderBottomColor: '#00C851', // Verde para detalhes
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#333333',
  },
  filterButtonActive: {
    backgroundColor: '#00C851',
    borderColor: '#00C851',
  },
  filterText: {
    fontSize: 14,
    color: '#cccccc',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#000000',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  chartContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#333333',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  chart: {
    flexDirection: 'row',
    height: 180,
  },
  yAxis: {
    width: 50,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  axisLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  chartArea: {
    flex: 1,
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 150,
    justifyContent: 'space-around',
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    borderRadius: 2,
    marginBottom: 5,
  },
  barLabel: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#cccccc',
  },
  pieContainer: {
    alignItems: 'center',
  },
  pieChart: {
    width: 150,
    height: 150,
    borderRadius: 75,
    position: 'relative',
    marginBottom: 20,
    backgroundColor: '#ff6384',
    overflow: 'hidden',
  },
  pieSlice1: {
    position: 'absolute',
    width: 75,
    height: 150,
    backgroundColor: '#36a2eb',
    right: 0,
  },
  pieSlice2: {
    position: 'absolute',
    width: 150,
    height: 75,
    backgroundColor: '#ffce56',
    bottom: 0,
  },
  pieSlice3: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: '#4bc0c0',
    bottom: 0,
    right: 0,
  },
  pieSlice4: {
    position: 'absolute',
    width: 75,
    height: 75,
    backgroundColor: '#9966ff',
    top: 0,
    right: 0,
  },
  pieSlice5: {
    position: 'absolute',
    width: 75,
    height: 75,
    backgroundColor: '#ff6384',
    top: 0,
    left: 0,
  },
  pieCenter: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    top: 45,
    left: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieCenterText: {
    fontSize: 10,
    color: '#000000',
  },
  pieCenterAmount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  categoryList: {
    width: '100%',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryName: {
    fontSize: 14,
    color: '#fff',
  },
  categoryAmount: {
    fontSize: 14,
    color: '#cccccc',
    fontWeight: '500',
  },
  trendContainer: {
    alignItems: 'center',
  },
  trendStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#333333',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00C851',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 8,
  },
  trendLine: {
    width: '100%',
    height: 100,
  },
  lineChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 100,
    position: 'relative',
  },
  linePoint: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  point: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
  },
});

export default StatisticsScreen;
