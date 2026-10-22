import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const noticiasTecnologia = [
  {
    id: '1',
    categoria: 'TECNOLOGIA',
    titulo: 'Inteligência Artificial',
    descricao: 'Novas ferramentas de IA estão transformando a tecnologia.',
    conteudo:
      'A inteligência artificial está sendo utilizada para automatizar tarefas, analisar informações e auxiliar na criação de novas soluções. Essas ferramentas estão transformando áreas como educação, saúde e comunicação, trazendo oportunidades e novos desafios.',
  },
  {
    id: '2',
    categoria: 'TECNOLOGIA',
    titulo: 'Celulares e inovação',
    descricao: 'Conheça as novidades do mercado de smartphones.',
    conteudo:
      'Os smartphones continuam evoluindo com melhorias nas câmeras, no desempenho, na bateria e nos recursos de inteligência artificial. As fabricantes buscam oferecer aparelhos mais eficientes e experiências cada vez mais personalizadas.',
  },
  {
    id: '3',
    categoria: 'TECNOLOGIA',
    titulo: 'Segurança digital',
    descricao: 'Dicas para proteger seus dados na internet.',
    conteudo:
      'Com o aumento do uso de serviços online, a segurança digital se tornou essencial. Senhas fortes, autenticação em dois fatores e atenção a links suspeitos são medidas simples que ajudam a proteger informações pessoais.',
  },
  
];

const noticiasEsportes = [
  {
    id: '4',
    categoria: 'ESPORTES',
    titulo: 'Futebol',
    descricao: 'Confira as principais notícias do mundo do futebol.',
    conteudo:
      'O futebol reúne torcedores de diferentes lugares e movimenta competições nacionais e internacionais. Durante a temporada, equipes disputam campeonatos, desenvolvem estratégias e buscam melhorar seu desempenho em campo.',
  },
  {
    id: '5',
    categoria: 'ESPORTES',
    titulo: 'Olimpíadas',
    descricao: 'Veja novidades e destaques do esporte mundial.',
    conteudo:
      'Os Jogos Olímpicos reúnem atletas de diversos países em modalidades esportivas variadas. O evento valoriza a dedicação, o respeito, a superação e a integração entre povos por meio do esporte.',
  },
  {
    id: '6',
    categoria: 'ESPORTES',
    titulo: 'Maratonista surpreende',
    descricao: 'Atleta vence prova de rua e estabelece melhor marca pessoal.',
    conteudo:
      'Em uma prova marcada por forte calor, o maratonista superou a concorrência nos quilômetros finais e cravou o melhor tempo de sua carreira, sendo aplaudido pelo público ao longo do percurso.',
  },
];

function CardNoticia({ categoria, titulo, descricao, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      {categoria ? <Text style={styles.categoria}>{categoria}</Text> : null}
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.descricao}>{descricao}</Text>
    </Pressable>
  );
}

function ListaNoticias({ navigation, noticias }) {
  return (
    <ScrollView style={styles.lista}>
      {noticias.map((noticia) => (
        <CardNoticia
          key={noticia.id}
          categoria={noticia.categoria}
          titulo={noticia.titulo}
          descricao={noticia.descricao}
          onPress={() => navigation.navigate('Detalhes', { noticia })}
        />
      ))}
    </ScrollView>
  );
}

function TelaTecnologia({ navigation }) {
  return <ListaNoticias navigation={navigation} noticias={noticiasTecnologia} />;
}

function TelaEsportes({ navigation }) {
  return <ListaNoticias navigation={navigation} noticias={noticiasEsportes} />;
}

function TelaDetalhes({ route, navigation }) {
  const { noticia } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: noticia.titulo });
  }, [navigation, noticia.titulo]);

  return (
    <ScrollView style={styles.detalhes}>
      <Text style={styles.categoria}>{noticia.categoria}</Text>
      <Text style={styles.tituloDetalhe}>{noticia.titulo}</Text>
      <Text style={styles.descricao}>{noticia.descricao}</Text>
      <Text style={styles.conteudo}>{noticia.conteudo}</Text>
    </ScrollView>
  );
}

function TelaSobre({ navigation }) {
  return (
    <SafeAreaView
      style={styles.detalhes}
      edges={['bottom', 'left', 'right']}>
      <Text style={styles.titulo}>Sobre o aplicativo</Text>

      <Text style={styles.descricao}>
        Este aplicativo reúne notícias de tecnologia e esportes em um só lugar,
        permitindo que você explore as principais novidades de cada categoria.
      </Text>

      <Image
        source={{
          uri: 'https://cdn.pixabay.com/photo/2016/02/01/00/56/652234-news-1172463_640.jpg',
        }}
        style={styles.imagemSobre}
        resizeMode="cover"
      />

      <Pressable
        style={styles.botaoVoltar}
        onPress={() => navigation.navigate('Notícias')}>
        <Text style={styles.textoBotao}>Voltar para o início</Text>
      </Pressable>
    </SafeAreaView>
  );
}

function StackTecnologia() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListaTecnologia"
        component={TelaTecnologia}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detalhes"
        component={TelaDetalhes}
        options={({ route }) => ({
          title: route.params?.noticia?.titulo ?? 'Detalhes da notícia',
        })}
      />
    </Stack.Navigator>
  );
}

function StackEsportes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListaEsportes"
        component={TelaEsportes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detalhes"
        component={TelaDetalhes}
        options={({ route }) => ({
          title: route.params?.noticia?.titulo ?? 'Detalhes da notícia',
        })}
      />
    </Stack.Navigator>
  );
}

function TelaNoticias() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Tecnologia"
        component={StackTecnologia}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hardware-chip-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Esportes"
        component={StackEsportes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="football-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen
            name="Notícias"
            component={TelaNoticias}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="newspaper-outline" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Sobre"
            component={TelaSobre}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons
                  name="information-circle-outline"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  lista: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 8,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 3,
  },
  categoria: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 6,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tituloDetalhe: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descricao: {
    fontSize: 14,
    color: '#555555',
  },
  detalhes: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  imagemSobre: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  botaoVoltar: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  conteudo: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    marginTop: 16,
  },
});