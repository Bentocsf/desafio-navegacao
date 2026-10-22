
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Notícias de tecnologia
const noticiasTecnologia = [
  {
    id: '1',
    categoria: 'TECNOLOGIA',
    titulo: 'Inteligência Artificial',
    descricao: 'Novas ferramentas de IA estão transformando a tecnologia.',
    conteudo:
      'A inteligência artificial está sendo utilizada para automatizar tarefas, analisar informações e auxiliar na criação de novas soluções.',
  },
  {
    id: '2',
    categoria: 'TECNOLOGIA',
    titulo: 'Celulares e inovação',
    descricao: 'Conheça as novidades do mercado de smartphones.',
    conteudo:
      'Os smartphones continuam evoluindo com melhorias nas câmeras, no desempenho e na bateria.',
  },
  {
    id: '3',
    categoria: 'TECNOLOGIA',
    titulo: 'Segurança digital',
    descricao: 'Dicas para proteger seus dados na internet.',
    conteudo:
      'Senhas fortes, autenticação em dois fatores e atenção a links suspeitos ajudam a proteger informações pessoais.',
  },
];

// Notícias de esportes
const noticiasEsportes = [
  {
    id: '4',
    categoria: 'ESPORTES',
    titulo: 'Futebol',
    descricao: 'Confira as principais notícias do mundo do futebol.',
    conteudo:
      'Equipes disputam campeonatos, desenvolvem estratégias e buscam melhorar seu desempenho em campo.',
  },
  {
    id: '5',
    categoria: 'ESPORTES',
    titulo: 'Olimpíadas',
    descricao: 'Veja novidades e destaques do esporte mundial.',
    conteudo:
      'Os Jogos Olímpicos reúnem atletas de diversos países em modalidades esportivas variadas.',
  },
  {
    id: '6',
    categoria: 'ESPORTES',
    titulo: 'Maratonista surpreende',
    descricao:
      'Atleta vence prova de rua e estabelece melhor marca pessoal.',
    conteudo:
      'Em uma prova marcada por forte calor, o maratonista alcançou o melhor tempo de sua carreira.',
  },
];

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Card reutilizável para cada notícia
function CardNoticia({ noticia, aoPressionar }) {
  return (
    <Pressable style={styles.card} onPress={aoPressionar}>
      <Text style={styles.categoria}>{noticia.categoria}</Text>
      <Text style={styles.titulo}>{noticia.titulo}</Text>
      <Text style={styles.descricao}>{noticia.descricao}</Text>
    </Pressable>
  );
}

// Tela com a lista de notícias
function ListaNoticias({ noticias, navigation }) {
  return (
    <ScrollView style={styles.tela}>
      {noticias.map((noticia) => (
        <CardNoticia
          key={noticia.id}
          noticia={noticia}
          aoPressionar={() =>
            navigation.navigate('Detalhes', { noticia })
          }
        />
      ))}
    </ScrollView>
  );
}

// Tela com os detalhes completos da notícia
function DetalhesNoticia({ route }) {
  const { noticia } = route.params;

  return (
    <ScrollView style={styles.telaDetalhes}>
      <Text style={styles.categoria}>{noticia.categoria}</Text>
      <Text style={styles.tituloDetalhes}>{noticia.titulo}</Text>
      <Text style={styles.descricaoDetalhes}>{noticia.descricao}</Text>

      <View style={styles.linha} />

      <Text style={styles.conteudo}>{noticia.conteudo}</Text>
    </ScrollView>
  );
}

// Stack de Tecnologia
function StackTecnologia() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lista"
        options={{ title: 'Tecnologia' }}
      >
        {(props) => (
          <ListaNoticias
            {...props}
            noticias={noticiasTecnologia}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Detalhes"
        component={DetalhesNoticia}
        options={{ title: 'Detalhes da notícia' }}
      />
    </Stack.Navigator>
  );
}

// Stack de Esportes
function StackEsportes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lista"
        options={{ title: 'Esportes' }}
      >
        {(props) => (
          <ListaNoticias
            {...props}
            noticias={noticiasEsportes}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Detalhes"
        component={DetalhesNoticia}
        options={{ title: 'Detalhes da notícia' }}
      />
    </Stack.Navigator>
  );
}

// Abas inferiores
function AbasNoticias() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Tecnologia"
        component={StackTecnologia}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Esportes"
        component={StackEsportes}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

// Tela Sobre
function TelaSobre() {
  return (
    <View style={styles.telaSobre}>
      <Text style={styles.tituloSobre}>Sobre o aplicativo</Text>

      <Text style={styles.textoSobre}>
        Este é um Mini App de Notícias desenvolvido como atividade
        de Desenvolvimento Mobile.
      </Text>

      <Text style={styles.textoSobre}>
        O aplicativo apresenta notícias de Tecnologia e Esportes e
        utiliza navegação Drawer, Bottom Tabs e Stack.
      </Text>
    </View>
  );
}

// Menu lateral principal
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Notícias">
        <Drawer.Screen
          name="Notícias"
          component={AbasNoticias}
        />

        <Drawer.Screen
          name="Sobre"
          component={TelaSobre}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#f2f2f2',
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
    color: '#1769aa',
    marginBottom: 6,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222222',
  },
  descricao: {
    fontSize: 14,
    color: '#555555',
  },
  telaDetalhes: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  tituloDetalhes: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 12,
  },
  descricaoDetalhes: {
    fontSize: 16,
    color: '#555555',
    lineHeight: 24,
  },
  linha: {
    height: 1,
    backgroundColor: '#dddddd',
    marginVertical: 20,
  },
  conteudo: {
    fontSize: 17,
    lineHeight: 27,
    color: '#333333',
  },
  telaSobre: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f2f2f2',
  },
  tituloSobre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222222',
  },
  textoSobre: {
    fontSize: 16,
    lineHeight: 25,
    color: '#444444',
    marginBottom: 16,
  },
});
